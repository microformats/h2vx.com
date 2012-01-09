<?php
/* common.php

2009-10-26 created by Tantek Çelik http://tantek.com

NOTES:
This depends on code from CASSIS V0 by Tantek Celik http://tantek.com
http://tantek.pbworks.com/CassisProject
http://creativecommons.org/licenses/by-sa/3.0/

--------------------------------------------------------------------- */

ob_start();
include 'cassis.js';
ob_end_clean();

/* php only functions */

function geturiparam($pathdelimiter, $addhttp) {
  $uri = @$_REQUEST['uri'];  // use explicitly specified uri parameter if any
  
  // if no explict url is found, get it from the path
  if ($uri=='') {
    if ($pathdelimiter=='') {
      $pathdelimiter = '.com/';
    }
    $uri = explode($pathdelimiter, $_SERVER['REQUEST_URI'], 2);
    $uri = $uri[1];
  }
  $uri = webaddresstouri(urldecode($uri), $addhttp);
  
  // if no explicit nor path uri, look for use referrer request
  if ($uri=='referrer' || $uri== 'referer' || $uri=='http://referrer' || $uri=='http://referer') {
    $uri=getenv("HTTP_REFERER");
  }
  return $uri;
}


 /**
  * Run tidy on the given string if it is installed.
  *
  * @param string $html the html to run through tidy.
  * @return the tidied html or false if tidy is not installed.
  * @author Matt Harris
  */
 function html5_tidy($html) {
   if (class_exists('tidy')) {
     $tidy = new tidy();
       $config = array(
         'bare'            => TRUE,
         'clean'           => TRUE,
         'indent'          => TRUE,
         'output-xhtml'    => TRUE,
         'wrap'            => 200,
         'hide-comments'   => TRUE,
         'new-blocklevel-tags' => implode(' ', array(
           'header', 'footer', 'article', 'section', 'aside', 'nav', 'hgroup', 'figure',
         )),
         'new-inline-tags' => implode(' ', array(
           'mark', 'time', 'meter', 'progress',
       )),
     );
       $tidy->parseString( $html, $config, 'utf8' );
       $tidy->cleanRepair();
       // $html = str_ireplace( '<wbr />','&shy;', (string)$tidy );
       // wbr to &shy; conversion commented out due to Safari copy/paste bug:
       // -- Safari emits an actual hyphen when copy/pasting markup with &shy;
     unset($tidy);
     return $html;
   } else {
     echo 'no tidy :(';
   }
   return false;
 }

/* end php only functions */

?>