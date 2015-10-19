<?php
/* get-cal.php

2006-11-11 (re)created (version 2.0) by Brian Suda brian@suda.co.uk
2009-10-20 and later, edits for H2VX by Tantek Çelik tantek@cs.stanford.edu

NOTES:
This requires:
* PHP XSLT libraries installed
* PHP Tidy libraries installed

--------------------------------------------- */

$dev = (substr($_SERVER['HTTP_HOST'],0,4)=='dev.');

$public_beta = true; // turn on for dev builds that the public is testing

// if not on a development/staging deployment...
if (!$dev || $public_beta) {
  error_reporting(0);
 // turn off error reporting
}


include '../common.php';


if (substr(@$_SERVER['REQUEST_URI'],0,9)=='/ics/sub/') {
  $subscribe = true;
  $uri = geturiparam('/ics/sub/', false); // get a subscription redirect URI
} 
else {
  $subscribe = isset($_REQUEST['subscribe']);
  $uri = geturiparam('/ics/', true);
  if ($uri == 'http://sub/') { // someone just went to http://h2vx.com/ics/sub/
   header("Location:http://h2vx.com/ics/"); // send them back to the UI
   exit;  
  }
}

// Check for subscription
if ($subscribe) {
  header("Location:webcal://h2vx.com/ics/$uri");
  exit;
}

/*
if (!$dev && contains($uri,"f1calendar.com")) {
  header("Status: 503"); // avoid default 404 from .htaccess ErrorDocument
  print 'f1calendar.com conversions are currently causing problems and are not supported for now. (2010-011)';
  exit();
}
*/

header("Status: 200"); // avoid default 404 from .htaccess ErrorDocument

if ((substr($uri, 0,7) == "http://") || (substr($uri, 0,8) == "https://")) {
  if ($dev) {
    set_time_limit(90);
  }

	// explode on the '#' to separate the anchor link from the page
	$temp = explode("#",$uri);
    if(isSet($temp[1])){ $anchor = $temp[1]; $uri = $temp[0]; } else { $anchor = '';}
    $temp = $temp[0];

	$c = curl_init();
	curl_setopt($c, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($c, CURLOPT_URL, str_replace('&amp;','&',$uri));
	curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 2);
	curl_setopt($c, CURLOPT_TIMEOUT, 4);
	curl_setopt($c, CURLOPT_USERAGENT, "H2VX events proxy (http://h2vx.com/ics/) ");
	curl_setopt($c, CURLOPT_FOLLOWLOCATION,1);
  curl_setopt($c, CURLOPT_SSL_VERIFYPEER , false );
  curl_setopt($c, CURLOPT_SSL_VERIFYHOST , false );
  $xml_string = curl_exec($c);
	$info = curl_getinfo($c);
  curl_close($c);
  unset($c);

  if (strlen(trim($xml_string))==0) {
		print 'Empty document, no HTML found.';
		  // TBI friendlier error message
    exit();
  }

	$outputEncoding = 'utf-8';
/*
	if (isset($info['content_type'])){
		$content_type = explode(';',trim($info['content_type']));
		if (isset($content_type[1])){
			$charset = explode('=',trim($content_type[1]),2);
			if (isset($charset[1])){
				$outputEncoding = $charset[1];
			}
		}
	}
*/	

/*
  $tidy = new tidy();
	$config = array('indent' => TRUE,
	               'output-xhtml' => TRUE,
	               'wrap' => 200);
	$tidy->parseString($xml_string, $config, 'UTF8');
	$tidy->cleanRepair();
	$xml_string = str_ireplace("<wbr>","&shy;",string($tidy));
  unset($tidy);
*/
  $xml_string = html5_tidy($xml_string);


	$doc = new DOMDocument();
	$xsl = new XSLTProcessor();
	
  $filename = './xhtml2vcal.xsl';
  $contentType = 'text/calendar'; 
  $extension .= 'ics'; 

	$doc->load($filename);
	$xsl->importStyleSheet($doc);
	$xsl->setParameter('', 'Source', $uri);
	$xsl->setParameter('', 'Anchor', $anchor);
	$xsl->setParameter('', 'Encoding', $outputEncoding);

	$doc->loadHTML($xml_string);
	$doc->formatOutput = true;
	$Str = $xsl->transformToXML($doc);
	unset($xsl);
	unset($doc);


	if (FALSE == $Str){
		print 'No hCalendar vevents found';
	} else {
    // check to see if a filename is specified
    $logfile = @$_REQUEST['filename'];
    if ($logfile == '') {
      // if empty or unspecified, get it from one summary or domain
      // look for the summary so we can name the ics file
      preg_match_all( '/SUMMARY.*?:(.*)/i', $Str, $matches);
      // get the matched line and all matches for our requested parameter
      // if we get more than 1 summary we've got a group of hCalendar events
      // so name the file after the domain.
      if (count($matches[1]) > 1) {
        $logfile = parse_url($uri);
        $logfile = str_replace('.', '-', $logfile['host']);
      // else try and get the summary name
      } else {
        $logfile = @trim($matches[1][0]);
        $logfile = str_ireplace(' ','-',utf8_decode($logfile));
      }
    }
    if ($logfile == '') {
      // failsafe filename
      $logfile = "hCalendar";
    }

		header("Content-Disposition: attachment; filename=$logfile.$extension");
	//	header("Content-Length: ".mb_strlen($Str)+1);
		header("Connection: close");
		header("Content-Type: $contentType; charset=$outputEncoding; name=$logfile.$extension");
		echo $Str;
		exit();
	}
} else {
	print 'invalid URI:'.$uri;
}
?>