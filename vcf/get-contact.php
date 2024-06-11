<?php
/* get-contact.php

2004-09-20 created by Brian Suda brian@suda.co.uk
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


require_once '../common.php';


$uri = geturiparam('/vcf/', true);

/*
if (!$dev && contains($uri,"f1calendar.com")) {
  header("Status: 200"); // avoid default 404 from .htaccess ErrorDocument
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
	curl_setopt($c, CURLOPT_USERAGENT, "H2VX contacts proxy (http://h2vx.com/vcf/) ");
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
  $tidy = new tidy();
	$config = array('indent' => TRUE,
	               'output-xhtml' => TRUE,
	               'wrap' => 200);
	$tidy->parseString($xml_string, $config, 'utf8');
	$tidy->cleanRepair();
	$xml_string = str_ireplace("<wbr />","&shy;",string($tidy));
  unset($tidy);  
*/
  $xml_string = html5_tidy($xml_string);


	$doc = new DOMDocument();
	$xsl = new XSLTProcessor();

	$filename = './xhtml2vcard.xsl'; 
	$contentType = 'text/x-vcard'; 
	$extension = 'vcf';
		
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
		print 'No hCards found'; // TBI friendlier error message
		//print '<!-- '.htmlentities($xml_string).' -->';
	} else {
    // check to see if a filename is specified
    $logfile = @$_REQUEST['filename'];
    if ($logfile == '') {
      // if empty or unspecified, get it from one fn or domain
      // look for the fullname so we can name the vcf
      preg_match_all( '/FN.*?:(.*)/i', $Str, $matches);
      // get the matched line and all matches for our requested parameter
      // if we get more than 1 name we've got a group of hCards 
      // so name the file after the domain.
      if (count($matches[1]) > 1) {
        $logfile = parse_url($uri);
        $logfile = str_replace('.', '-', $logfile['host']);
      // else try and get the fn name
      } else {
        $logfile = @trim($matches[1][0]);
        $logfile = str_ireplace(' ','-',utf8_decode($logfile));
      }
    }
    if ($logfile == '') {
      // failsafe filename
      $logfile = "hCard";
    }

		header("Content-Disposition: attachment; filename=$logfile.$extension");
	  //	header("Content-Length: ".mb_strlen($Str)+1);
		header("Connection: close");
		header("Content-Type: $contentType; charset=$outputEncoding; name=$logfile.$extension");
		echo utf8_decode($Str);
		exit();
	}
} else {
	print 'invalid URI:'.$uri;
}
?>