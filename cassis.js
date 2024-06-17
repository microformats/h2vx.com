/* <!--
   cassis.js Copyright 2008-2024 Tantek Çelik https://tantek.com 
   http://cassisproject.com conceived:2008-254; created:2009-299;
   license: https://creativecommons.org/licenses/by-sa/4.0/       -->
if you see this or "/// var" in the browser, you need to 
wrap your PHP include of cassis.js AND your use of functions therein 
with calls to ob_start and ob_end_clean, e.g.:
ob_start();
include 'cassis.js';
// your code that calls CASSIS functions like auto_link('@tantek.com') goes here
ob_end_clean();
/* <!-- <?php // CASSIS v0.1 start -->
// ===================================================================
// PHP-only block. Processed only by PHP. Use only // comments here.
// -------------------------------------------------------------------
function js() {
  return false;
}

// global configuration

if (php_min_version("5.1.0")) {
  date_default_timezone_set("UTC");
}

function php_min_version($s) {
  $s = explode(".",$s);
  $phpv = explode(".",phpversion());
  for ($i=0;$i<count($s);$i++) {
    if ($s[$i]>$phpv[$i]) {
      return false; 
    }
  }
  return true;
}



// -------------------------------------------------------------------
// string functions requiring separate js/php definitions

function preg_matches($p, $s) {
  $m = array();
  if (preg_match_all($p, $s, $m, PREG_PATTERN_ORDER) !== FALSE) {
    return $m[0];
  }
  else {
    return array();
  }
}

// -------------------------------------------------------------------
// date time functions

function date_get_full_year($d = "") {
  if ($d == "") {
    $d = new DateTime();
  }
  return $d->format('Y');
} 

function date_get_timestamp($d = "") { 
  if ($d == "") {
    $d = new DateTime();
  }
  return $d->format('U'); // $d->getTimestamp(); // in PHP 5.3+
}

function date_get_ordinal_days($d) {
 return 1 + $d->format('z');
}

function date_get_rfc3339($d) {
  return $d->format('c');
}

// -------------------------------------------------------------------
// old wrappers. transition code away from these
// ** do not use these in new code. **

function getFullYear($d = "") {  
  // 2010-020 obsoleted. Use date_get_full_year instead
  return date_get_full_year($d);
}

// ===================================================================
/*/ // This comment inverter switches from PHP only to JS only.
// JS-only block. Processed only by JS. Use only // comments here.
// -------------------------------------------------------------------
function js() {
  return true;
}

// array functions

function array() { // makes an array from arbitrary parameter list.
  return Array.prototype.slice.call(arguments);
}

function is_array(a) {
  return (typeof(a) === "object") && (a instanceof Array);
}

function count(a) {
  return a.length;
}

function array_slice(a, b, e) { // slice an array, begin, optional end
  if (a === undefined) { return array(); }
  if (b === undefined) { return a; }
  if (e === undefined) { return a.slice(b); }
  return a.slice(b, e);
}

// -------------------------------------------------------------------
// math and numerical functions

function floor(n) {
  return Math.floor(n);
}

function intval(n) {
  return parseInt(n, 10);
}

Array.min = function(a) { 
// from http://ejohn.org/blog/fast-javascript-maxmin/
  return Math.min.apply(Math, a);
};

function min() {
  var m = arguments;
  if (m.length < 1) {
    return false;
  } 
  if (m.length === 1) {
    m = m[0];
    if (!is_array(m)) {
      return m;
    }
  }
  return Array.min(m);
}

function ctype_digit(s) {
 return (/^[0-9]+$/).test(s);
}

function ctype_lower(s) {
 return (/^[a-z]+$/).test(s);
}

function ctype_space(s) {
 return (/\s/).test(s);
}

// -------------------------------------------------------------------
// date time functions

function date_create(s) {
  if (s) return new Date(s);
  else return new Date();
}

function date_get_full_year(d) {
  if (arguments.length < 1) {
    d = new Date();
  }
  return d.getFullYear();
}

function date_get_timestamp(d) {
  return floor(d.getTime() / 1000);
}

function date_get_rfc3339($d) {
  return strcat($d.getFullYear(),'-',
                str_pad_left(1 + $d.getUTCMonth(), 2, "0"), '-',
                str_pad_left($d.getDate(), 2, "0"), 'T',
                str_pad_left($d.getUTCHours(), 2, "0"), ':',
                str_pad_left($d.getUTCMinutes(), 2, "0"), ':',
                str_pad_left($d.getUTCSeconds(), 2, "0"), 'Z');
}

// newcal

function date_get_ordinal_days($d) {
  return ymdp_to_d($d.getFullYear(), 1 + $d.getMonth(), $d.getDate());
}


// -------------------------------------------------------------------
// character and string functions 

function ord(s) {
  return s.charCodeAt(0);
}

function strlen(s) {
  return s.length;
} 

function substr(s, o, n) {
  var m = strlen(s);
  if ((o < 0 ? -1-o : o) >= m) { return ""; }
  if (o < 0) { o = m + o; }
  if (n === undefined) { n = m - o; }
  if (n < 0) { n = m - o + n; }
  return s.substring(o, o + n);
}

function substr_count(s, n) {
 return s.split(n).length - 1;
}

function strpos(h, n, o) {
  // clients must triple-equal test return for === false for no match!
  // or use offset(n, h) instead (0 = not found, else 1-based index)
  if (arguments.length === 2) {
    o = 0;
  }
  o = h.indexOf(n, o);
  if (o === -1) { return false; }
  else { return o; }
}

function stripos(h, n, o) {
  // clients must triple-equal test return for === false for no match!
  if (arguments.length === 2) {
    o = 0;
  }
  o = h.toLowerCase().indexOf(n.toLowerCase(), o);
  if (o === -1) { return false; }
  else { return o; }
}

function strncmp(s1, s2, n) {
  s1 = substr(String(s1), 0, n);
  s2 = substr(String(s2), 0, n);
  return (s1 === s2) ? 0 :
         ((s1 < s2) ? -1 : 1);
}

function explode(d, s, n) {
  if (arguments.length === 2) {
    return s.split(d);
  }
  return s.split(d, n);
}

function implode(d, a) {
  return a.join(d);
}

function rawurlencode(s) {
  return encodeURIComponent(s);
}

function htmlspecialchars(s) {
 var c= [["&","&amp;"],["<","&lt;"],[">","&gt;"],["'","&#039;"],['"',"&quot;"]];
 for (i=0;i<c.length;i++) {
  s = s.replace(new RegExp(c[i][0],"g"),c[i][1]); // s.replace(c[i][0],c[i][1]);
 }
 return s;
}

function str_ireplace(a, b, s) {
 var i;
 if (!is_array(a)) {
   return s.replace(new RegExp(a, "gi"), is_array(b) ? b[0] : b);
 }
 else {
   for (i=0; i<a.length; i++) {
     s = s.replace(new RegExp(a[i], "gi"), is_array(b) ? b[i] : b);
   }
   return s;
 }
}

function preg_match(p, s) {
  return (s.match(trim_slashes(p)) ? 1 : 0);
}

function preg_split(p, s) {
  return s.split(new RegExp(trim_slashes(p),"gi")); // possibly off by one
}

function trim() {
 var m = arguments;
 var s = m[0];
 var c = count(m)>1 ? m[1] : " \t\n\r\f\x00\x0b\xa0";
 var i = 0;
 var j = strlen(s);
 while (contains(c,s[i]) && i<j) {
   i++;
 }
 --j;
 while (j>i && contains(c,s[j])) {
   --j;
 }
 j++;
 if (j>i) {
   return substr(s,i,j-i);
 }
 else {
   return '';
 }
}

function rtrim() {
 var m = arguments;
 var s = m[0];
 var c = count(m)>1 ? m[1] : " \t\n\r\f\x00\x0b\xa0";
 var j = strlen(s)-1;
 while (j>=0 && contains(c,s[j])) {
   --j;
 }
 if (j>=0) {
   return substr(s,0,j+1);
 }
 else {
   return '';
 }
}

function strtolower(s) {
  return s.toLowerCase();
}

function ucfirst(s) {
  return s.charAt(0).toUpperCase() + substr(s, 1);
}

// -------------------------------------------------------------------
// more javascript-only php-equivalent functions here 


// javascript-only framework functions
function targetelement(e) {
  var t;
  e = e ? e : window.event;
  t = e.target ? e.target : e.srcElement;
  t = (t.nodeType == 3) ? t.parentNode : t; // Safari workaround
  return t;
}

function doevent(el, evt) {
  if (evt=="click" && el.tagName=='A') {
  // note: dispatch/fireEvent not work FF3.5+/IE8+ on [a href] w "click" event
    window.location = el.href; // workaround
    return true;
  }
  if (document.createEvent) {
    var eo = document.createEvent("HTMLEvents");
    eo.initEvent(evt, true, true);
    return !el.dispatchEvent(eo);
  } 
  else if (document.createEventObject) {
    return el.fireEvent("on"+evt);
  }
}


// -------------------------------------------------------------------
// string functions requiring separate js/php definitions

function preg_matches($p, $s) {
  return $s.match(new RegExp(trim_slashes($p),"gi")); // match is a keyword in PHP 8.0
}


// old wrappers. transition code away from them, do not use them in new code.
//function getFullYear(d) {       // use date_get_full_year instead
//  return date_get_full_year(d);
//}


// end cassis0php.js
// --------------------------------------------------------------------

/**/ // unconditional comment closer enters PHP+javascript processing
/* ------------------------------------------------------------------ */
/* cassis0.js - processed by both PHP and javascript */


// -------------------------------------------------------------------
// character and string functions

function strcat() { // takes as many strings as you want to give it.
 $strcatr = "";
 $isjs = js();
 $args = $isjs ? arguments : func_get_args();
 for ($strcati=count($args)-1; $strcati>=0; $strcati--) {
    $strcatr = $isjs ? $args[$strcati] + $strcatr : $args[$strcati] . $strcatr;
 }
 return $strcatr;
}

function number($s) {
 return $s - 0;
}

function string($n) {
 if (js()) { 
   if (typeof($n)=="number")
     return Number($n).toString(); 
   else if (typeof($n)=="undefined")
     return "";
   else return $n.toString();
 }
 else { return "" . $n; }
}

function str_pad_left($s1,$n,$s2) {
 $s1 = string($s1);
 $s2 = string($s2);
 if (js()) {
   $n -= strlen($s1);
   while ($n >= strlen($s2)) { 
     $s1 = strcat($s2,$s1); 
     $n -= strlen($s2);
   }
   if ($n > 0) {
     $s1 = strcat(substr($s2,0,$n),$s1);
   }
   return $s1;
 }
 else { return str_pad($s1,$n,$s2,STR_PAD_LEFT); }
}

function trim_slashes($s) {
  if ($s[0]=="/") { // strip unnecessary / delimiters that PHP regexp funcs want
    return substr($s,1,strlen($s)-2);
  }
  return $s;
}

/* end cassis0.js */

function ctype_post_slug($s) {
 // Falcon: post slugs should only have lowercase, numbers, or '-', or '_'
 return (preg_match("/^[a-z0-9]+([_-][a-z0-9]+)*$/", $s));
}

function ctype_email_local($s) {
 // close enough. no '.' because this is used for last char of.
 return (preg_match("/^[a-zA-Z0-9_%+-]+$/", $s));
}

function ctype_uri_scheme($s) {
 return (preg_match("/^[a-zA-Z][a-zA-Z0-9+.-]*$/", $s));
}

function ctype_time($s) { // whether start of a string is a time
  switch (offset(':', $s)) {
  case 2:
    return ctype_digit(substr($s, 0, 1)) && ctype_digit(substr($s, 2, 2));
    break;
  case 3:
    return ctype_digit(substr($s, 0, 2)) && ctype_digit(substr($s, 4, 2));  
    break;
  default:
    return false;
  }
}

// -------------------------------------------------------------------
// newbase60

function num_to_sxg($n) {
 $s = "";
 $p = "";
 $m = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz";
 if ($n==="" || $n===0) { return "0"; }
 if ($n<0) {
   $n = 0-$n;
   $p = "-";
 }
 while ($n>0) {
   $d = $n % 60;
   $s = strcat($m[$d],$s);
   $n = ($n-$d)/60;
 }
 return strcat($p,$s);
}

function num_to_sxgf($n, $f) {
  if (!$f) { $f=1; }
  return str_pad_left(num_to_sxg($n), $f, "0");
}

function sxg_to_num($s) {
 $n = 0;
 $m = 1;
 $j = strlen($s);
 if ($s[0]=="-") {
   $m= -1;
   $j--;
   $s = substr($s,1,$j);
 }
 for ($i=0;$i<$j;$i++) { // iterate from first to last char of $s
   $c = ord($s[$i]); //  put current ASCII of char into $c  
   if ($c>=48 && $c<=57) { $c=$c-48; }
   else if ($c>=65 && $c<=72) { $c-=55; }
   else if ($c==73 || $c==108) { $c=1; } // typo capital I, lowercase l to 1
   else if ($c>=74 && $c<=78) { $c-=56; }
   else if ($c==79) { $c=0; } // error correct typo capital O to 0
   else if ($c>=80 && $c<=90) { $c-=57; }
   else if ($c==95 || $c==45) { $c=34; } // _ underscore and correct dash - to _
   else if ($c>=97 && $c<=107) { $c-=62; }
   else if ($c>=109 && $c<=122) { $c-=63; }
   else break; // treat all other noise as end of number
   $n = 60*$n + $c;
 }
 return $n*$m;
}

function sxg_to_numf($s, $f) {
  if ($f===undefined) { $f=1; }
  return str_pad_left(sxg_to_num($s), $f, "0");
}

// -------------------------------------------------------------------
// == newbase60 compat functions only == (before 2011-149)
function numtosxg($n) {
  return num_to_sxg($n);
}

function numtosxgf($n, $f) {
  return num_to_sxgf($n, $f);
}

function sxgtonum($s) {
  return sxg_to_num($s);
}

function sxgtonumf($s, $f) {
  return sxg_to_numf($s, $f);
}
/* == end compat functions == */

// -------------------------------------------------------------------
// date and time

function date_create_ymd($s) {
 if (!$s) {
   return (js() ? new Date() : new DateTime());
 }
 if (js()) { 
   if (substr($s,4,1)=='-') {
      $s=strcat(strcat(substr($s,0,4),substr($s,5,2)),substr($s,8,2));
   }
   $d = new Date(substr($s,0,4),substr($s,4,2)-1,substr($s,6,2));
   $d.setHours(0); // was setUTCHours, avoiding bc JS has no default timezone
   return $d;
 }
 else { return date_create(strcat($s," 00:00:00")); }
}

function date_create_timestamp($s) {
  if (js()) {
    return new Date(1000*$s);
  }
  else {
    return new DateTime(strcat("@", string($s)));
  }
}

// function date_get_timestamp($d) // in PHP/JS specific code above.

// function date_get_rfc3339($d) // in PHP/JS specific code above.

function dt_to_time($dt) {
  $dt = explode("T", $dt);
  if (count($dt)==1) {
    $dt = explode(" ", $dt);
  }
  return (count($dt)>1) ? $dt[1] : "0:00";
}

function dt_to_date($dt) {
  $dt = explode("T", $dt);
  if (count($dt)==1) {
    $dt = explode(" ", $dt);
  }
  return $dt[0];
}

function dt_to_ordinal_date($dt) {
  return ymd_to_yd(dt_to_date($dt));
}

// -------------------------------------------------------------------
// newcal

function isleap($y) {
  return ($y % 4 === 0 && ($y % 100 !== 0 || $y % 400 === 0));
}

function ymdp_to_d($y,$m,$d) {
  $md = array(
         array(0,31,59,90,120,151,181,212,243,273,304,334),
         array(0,31,60,91,121,152,182,213,244,274,305,335));
  return $md[number(isleap($y))][$m-1] + number($d);
}

function ymd_to_d($d) {
  if (substr($d, 4, 1)==='-') {
    return ymdp_to_d(substr($d,0,4),substr($d,5,2),substr($d,8,2));
  }
  else {
    return ymdp_to_d(substr($d,0,4),substr($d,4,2),substr($d,6,2));
  }
}

function ymdp_to_yd($y, $m, $d) {
  return strcat(str_pad_left($y, 4, "0"), '-',
                str_pad_left(ymdp_to_d($y, $m, $d), 3, "0"));
}

function ymd_to_yd($d) {
  if (substr($d, 4, 1)==='-') {
    return ymdp_to_yd(substr($d,0,4),substr($d,5,2),substr($d,8,2));
  }
  else {
    return ymdp_to_yd(substr($d,0,4),substr($d,4,2),substr($d,6,2));
  }
}

// function date_get_ordinal_days($d) // in PHP/JS specific code above

function bim_from_od($d) {
  return 1+floor(($d-1)/61);
}

function date_get_bim() {
  $args = js() ? arguments : func_get_args();
  return bim_from_od(
          date_get_ordinal_days(
           date_create_ymd((count($args) > 0) ? $args[0] : 0)));
}

function get_nm_str($m) {
  $a = array("New January", "New February", "New March", "New April", "New May", "New June", "New July", "New August", "New September", "New October", "New November", "New December");
  return $a[($m-1)];
}

function nm_from_od($d) {
  return ((($d-1) % 61) > 29) ? 2+2*(bim_from_od($d)-1) : 1+2*(bim_from_od($d)-1);
}

function date_get_ordinal_date(/* $d = "" */) {
  $args = js() ? arguments : func_get_args();
  $d = date_create_ymd((count($args) > 0) ? $args[0] : 0);
  return strcat(date_get_full_year($d), '-',
                str_pad_left(date_get_ordinal_days($d), 3, "0"));
}

// -------------------------------------------------------------------
// begin epochdays

function y_to_days($y) {
  // convert y-01-01 to epoch days
  return floor(
   (date_get_timestamp(date_create_ymd(strcat($y, "-01-01"))) -
    date_get_timestamp(date_create_ymd("1970-01-01")))/86400);
}

// convert ymd to epoch days and sexagesimal epoch days (sd)

function ymd_to_days($d) {
  return yd_to_days(ymd_to_yd($d));
}

/* old:
function ymd_to_days($d) {
  // fails in JS, "2013-03-10" and "2013-03-11" both return 15774 
  return floor((date_get_timestamp(date_create_ymd($d))-date_get_timestamp(date_create_ymd("1970-01-01")))/86400);
}
*/

function ymd_to_sd($d) {
  return num_to_sxg(ymd_to_days($d));
}

function ymd_to_sdf($d, $f) {
  return num_to_sxgf(ymd_to_days($d), $f);
}

// ordinal date (YYYY-DDD) to ymd, epoch days, sexagesimal epoch days

function ydp_to_ymd($y,$d) {
  $md = array(
         array(0,31,59,90,120,151,181,212,243,273,304,334,365),
         array(0,31,60,91,121,152,182,213,244,274,305,335,366));
  $d -= 1;
  $m = trunc($d / 29);
  if ($md[isleap($y) - 0][$m] > $d) $m -= 1;
  $d = $d - $md[isleap($y)-0][$m] + 1;
  $m += 1;
  return strcat($y, '-', str_pad_left($m, 2, '0'), 
                    '-', str_pad_left($d, 2, '0'));
}

function yd_to_ymd($d) {
  return ydp_to_ymd(substr($d, 0, 4), substr($d, 5, 3));
}

function yd_to_days($d) {
  return y_to_days(substr($d, 0, 4)) - 1 + number(substr($d, 5, 3));
}

function yd_to_sd($d) {
  return num_to_sxg(yd_to_days($d));
}

function yd_to_sdf($d, $f) {
  return num_to_sxgf(yd_to_days($d), $f);
}

// convert epoch days or sexagesimal epoch days (sd) to ordinal date

function days_to_yd($d) {
  $d = date_create_timestamp(
         date_get_timestamp(
           date_create_ymd("1970-01-01")) + $d*86400);
  $y = date_get_full_year($d);
  $a = date_create_ymd(strcat($y,"-01-01"));
  return strcat($y, strcat("-", str_pad_left(1+floor((date_get_timestamp($d)-date_get_timestamp($a))/86400), 3, "0")));
}

function sd_to_yd($d) {
  return days_to_yd(sxg_to_num($d));
}

// -------------------------------------------------------------------
// compat as of 2011-143
function bimfromod($d) { return bim_from_od($d); }
function getnmstr($m) { return get_nm_str($m); }
function nmfromod($d) { return nm_from_od($d); }
function ymdptod($y,$m,$d) { return ymdp_to_d($y,$m,$d); }
function ymdptoyd($y,$m,$d) { return ymdp_to_yd($y,$m,$d); }
function ymdtoyd($d) { return ymd_to_yd($d); }
function ymdtodays($d) { return ymd_to_days($d); }
function ymdtosd($d) { return ymd_to_sd($d); }
function ymdtosdf($d,$f) { return ymd_to_sdf($d, $f); }
function ydtodays($d) { return yd_to_days($d); }
function ydtosd($d) { return yd_to_sd($d); }
function ydtosdf($d,$f) { return yd_to_sdf($d, $f); }
function daystoyd($d) { return days_to_yd($d); }
function sdtoyd($d) { return sd_to_yd($d); }

/* end epochdays */


/* ------------------------------------------------------------------ */


// -------------------------------------------------------------------
// webaddress

function web_address_to_uri($wa, $addhttp) {
  if ($wa=='' 
      || (substr($wa, 0, 7) == "http://") 
      || (substr($wa, 0, 8) == "https://") 
      || (substr($wa, 0, 6) == "irc://")) {
    return $wa;
  }
  if ((substr($wa, 0, 7) == "Http://") 
      || (substr($wa, 0, 8) == "Https://")) { // handle iPad overcapitalization of input entries
    return strcat('h', substr($wa, 1, strlen($wa)));
  }
  
  if (substr($wa, 0, 1) == "@") {
    return strcat("https://twitter.com/", substr($wa, 1, strlen($wa)));
  }

  if ($addhttp) { // NOTE: does not handle protocol relative URLs
    $wa = strcat('http://', $wa);
  }
  return $wa;
}

function uri_clean($uri) {
  $uri = web_address_to_uri($uri, false);
  // prune the optional http:// for a neater param
  if (substr($uri, 0, 7) === 'http://') {
    $uri = explode('://', $uri);
    $uri = array_slice($uri, 1);
    $uri = implode('://', $uri);
  }
  // URL encode
  return str_ireplace("%3A", ":", 
                      str_ireplace("%2F", "/", rawurlencode($uri)));
}

// returns e.g. http:
function protocol_of_uri($uri) {
  if (offset(':', $uri) === 0) { return ""; }
  $uri = explode(':', $uri, 2);
  if (!ctype_uri_scheme($uri[0])) { return ""; }
  return strcat($uri[0], ':');
}

// returns e.g. //ttk.me/b/4DY1?seriously=yes#ud
function relative_uri_hash($uri) {
  if (offset(':', $uri) === 0) { return ""; }
  $uri = explode(':', $uri, 2);
  if (!ctype_uri_scheme($uri[0])) { return ""; }
  return $uri[1];
}

// returns e.g. ttk.me
function hostname_of_uri($uri) {
  $uri = explode('/', $uri, 4);
  if (count($uri) > 2) {
    $uri = $uri[2];
    if (offset(':', $uri) !== 0) {
      $uri = explode(':', $uri, 2);
      $uri = $uri[0];
    }
    return $uri;
  }   
  return '';
}

function sld_of_uri($uri) {
  $uri = hostname_of_uri($uri);
  $uri = explode('.', $uri);
  if (count($uri) > 1) {
    return $uri[count($uri) - 2];
  }
  return "";
}

function path_of_uri($uri) {
  $uri = explode('/', $uri);
  if (count($uri) > 3) {
    $uri = array_slice($uri, 3);
    $uri = strcat('/', implode('/', $uri));
    if (offset('?', $uri) !== 0) {
      $uri = explode('?', $uri, 2);
      $uri = $uri[0];
    }
    if (offset('#', $uri) !== 0) {
      $uri = explode('#', $uri, 2);
      $uri = $uri[0];
    }
    return $uri;    
  }
  return '/';
}

function prepath_of_uri($uri) {
  $uri = explode('/', $uri);
  $uri = array_slice($uri, 0, 3);
  return implode('/', $uri);
}

function segment_of_uri($n, $u) {
   /* nth starting at 1 */
   $u = path_of_uri($u);
   $u = explode('/', $u);
   if ($n>=0 && $n<count($u))
     return $u[$n];
   else return "";
}

function fragment_of_uri($u) {
  if (offset('#', $u) !== 0) {
    $u = explode('#', $u, 2);
    return $u[1];
  }
  return "";
}

function is_http_uri($uri) {
  $uri = explode(':', $uri, 2);
  return !!strncmp($uri[0], 'http', 4);
}

function get_absolute_uri($uri, $base) {
  if (protocol_of_uri($uri) != "") { return $uri; }
  if (substr($uri, 0, 2) === '//') { 
    return strcat(protocol_of_uri($base), $uri);
  }
  if (substr($uri, 0, 1) === '/') {
    return strcat(prepath_of_uri($base), $uri);
  }
  // TBI # relative
  return strcat(prepath_of_uri($base), path_of_uri($base), $uri);
}

// -------------------------------------------------------------------
// compat as of 2011-149
function webaddresstouri($wa, $addhttp) { 
  return web_address_to_uri($wa, $addhttp);
}
function uriclean($uri) { return uri_clean($uri); }

// -------------------------------------------------------------------
// HTTP related

function is_html_type($ct) {
  $ct = explode(';', $ct, 2);
  $ct = $ct[0];
  return ($ct === 'text/html' || $ct === 'application/xhtml+xml');
}

// -------------------------------------------------------------------
// hexatridecimal

function numtohxt($n) {
 $s = "";
 $m = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 if ($n===undefined || $n===0) { return "0"; }
 while ($n>0) {
   $d = $n % 36;
   $s = strcat($m[$d],$s);
   $n = ($n-$d)/36;
 }
 return $s;
}

function numtohxtf($n,$f) {
 if ($f===undefined) { $f=1; }
 return str_pad_left(numtohxt($n), $f, "0");
}

function hxttonum($h) {
 $n = 0;
 $j = strlen($h);
 for ($i=0;$i<$j;$i++) { // iterate from first to last char of $h
   $c = ord($h[$i]); //  put current ASCII of char into $c  
   if ($c>=48 && $c<=57) { $c=$c-48; } // 0-9
   else if ($c>=65 && $c<=90) { $c-=55; } // A-Z
   else if ($c>=97 && $c<=122) { $c-=87; } // a-z case-insensitive treat as A-Z
   else { $c = 0; } // treat all other noise as 0
   $n = 36*$n + $c;
 }
 return $n;
}

/* end hexatridecimal */


/* ------------------------------------------------------------------ */


/* ISBN-10 */

function numtoisbn10($n) {
 $n=string($n);
 $d=0;
 $f=2;
 for ($i=strlen($n)-1;$i>=0;$i--) {
  $d += $n[$i]*$f;
  $f++;  
 }
 $d = 11-($d % 11);
 if ($d==10) {$d="X";}
 else if ($d==11) {$d="0";}
 else {$d=string($d);}
 return strcat(str_pad_left($n,9,"0"),$d);
}
/* end ISBN-10 */


/* ------------------------------------------------------------------ */


/* ASIN */

function asintorsxg($a) { // ASIN to reversible sexagesimal; prefix ISBN-10 w ~
 $a = amazontoasin($a); // extract ASIN from Amazon URL if necessary
 if ($a[0]=='B') {
   $a=num_to_sxg(hxttonum(substr($a,1,9)));
 }
 else {
   $a = implode("",explode("-",$a)); // eliminate presentational hyphens
   if (strlen($a)>10 && substr($a,0,3)=="978") {
     $a = substr($a,3,9);
   }
   else {
     $a = substr($a,0,9);
   }
   $a = strcat("~",num_to_sxg($a));
 }
 return $a;
}

function amazontoasin($a) {
 // idempotent
 if (preg_match("/[\.\/]+/",$a)) {
   $a = explode("/",$a);
   for ($i=count($a)-1; $i>=0; $i--) {
     if (preg_match("/^[0-9A-Za-z]{10}$/",$a[$i])) {
       $a = $a[$i];
       break;
     }
   }
   if ($i==-1) { // no ASIN was found in URL
     $a=""; // reset $a to a string (instead of an array)
   }
 }
 return $a;
}

/* end ASIN */


/* ------------------------------------------------------------------ */


/* Unicode */

function nstr_to_usup($s) {
  if ($s===undefined || $s===0) { return '⁰'; }
  $r = '';
  $usups = array('⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹');
  for ($i=0; $i<strlen($s); $i++) {
    $r = strcat($r, $usups[number($s[$i])]);
  }
  return $r;
}


/* ------------------------------------------------------------------ */


// -------------------------------------------------------------------
// HyperTalk

function trunc($n) { // just an alias from BASIC days
  return floor($n);
}

function offset($n, $h) {
 $n = strpos($h, $n);
 if ($n===false) { return 0; }
 else            { return $n+1; }
}

function contains($h, $n) {
 // actual HT syntax:haystack contains needle: if ("abc" contains "b")
 return !(strpos($h, $n)===false);
}

function last_character_of($s) {
  return (strlen($s) > 0) ? $s[strlen($s)-1] : '';
}
/* end HyperTalk */


/* ------------------------------------------------------------------ */


// -------------------------------------------------------------------
// microformats

// xpath expressions to extract microformats
function xp_has_class($s) {
  return strcat("//*[contains(concat(' ',@class,' '),' ",$s," ')]");
}

function xpr_has_class($s) {
  return strcat(".//*[contains(concat(' ',@class,' '),' ",$s," ')]");
}

function xp_has_id($s) {
  return strcat("//*[@id='", $s, "']");
}

function xp_attr_starts_with($a, $s) {
  return strcat("//*[starts-with(@", $a, ",'", $s, "')]");
}

function xp_has_rel($s) {
  return strcat("//*[@href and contains(concat(' ',@rel,' '),' ", $s, " ')]");
}

function xpr_has_rel($s) {
  return strcat(".//*[@href and contains(concat(' ',@rel,' '),' ", $s, " ')]");
}

function xpr_attr_starts_with_has_rel($a, $s, $r) {
  return strcat(".//*[@href and contains(concat(' ',@rel,' '),' ", $r, 
                " ') and starts-with(@", $a, ",'", $s, "')]");
}

function xpr_attr_starts_with_has_class($a, $s, $c) {
  return strcat(".//*[contains(concat(' ',@class,' '),' ", $c, " ') and starts-with(@", $a, ",'", $s, "')]");
}

/* end XPath */


/* ------------------------------------------------------------------ */


/* microformats */

/* value class pattern readable date time from ISO8601 datetime */
function vcp_dt_readable($d) {
  $d = explode("T", $d);
  $r = "";
  if (count($d)>1) { 
     $r = explode("-", $d[1]);
     if (count($d)==1) {
			 $r = explode("+", $d[1]);
     }
     if (count($d)>1) {
       $r = strcat('<time class="value" datetime="',$d[1],'">', 
                   $r[0],'</time> on ');
     }
     else {
       $r = strcat('<time class="value">', $d[1], '</time> on ');
     }
  }
  return strcat($r, '<time class="value">', $d[0], '</time>');
}


// -------------------------------------------------------------------
// compat as of 2011-149
function xphasclass($s) { return xp_has_class($s); }
function xprhasclass($s) { return xpr_has_class($s); }
function xphasid($s) { return xp_has_id($s); }
function xpattrstartswith($a, $s) { 
  return xp_attr_starts_with($a, $s); 
}
function xphasrel($s) { return xp_has_rel($s); }
function xprhasrel($s) { return xpr_has_rel($s); }
function xprattrstartswithhasrel($a, $s, $r) {
  return xpr_attr_starts_with_has_rel($a, $s, $r);
}
function xprattrstartswithhasclass($a, $s, $c) {
  return xpr_attr_starts_with_has_class($a, $s, $c);
}
function vcpdtreadable($d) { return vcp_dt_readable($d); }


// -------------------------------------------------------------------
// whistle
// algorithmic URL shortener core
// YYYY/DDD/tnnn to tdddss 
// ordinal date, type, decimal #, to sexagesimal epoch days, sexagesimal #
function whistle_short_path($p) {
  return strcat(substr($p, 9, 1),
                ((substr($p, 9, 1)!=='t') ? "/" : ""),
                yd_to_sdf(substr($p, 0, 8), 3),
                num_to_sxg(substr($p, 10, 3)));
}
/* end Whistle */


// -------------------------------------------------------------------
// Falcon

function html_unesc_amp_only($s) {
  return str_ireplace('&amp;', '&', $s);
}

function html_esc_amper_once($s) {
  return str_ireplace('&', '&amp;', html_unesc_amp_only($s));
}

function html_esc_amp_ang($s) {
  return str_ireplace('<', '&lt;',
         str_ireplace('>', '&gt;', html_esc_amper_once($s)));
}

function ellipsize_to_word($s, $max, $e, $min) {
  if (strlen($s)<=$max) {
    return $s; // no need to ellipsize
  }

  $elen = strlen($e);
  $slen = $max-$elen;

  // if last characters before $max+1 are ': ', truncate w/o ellipsis.
  // no need to take length of ellipsis into account
  if ($e=='...') {
    for ($ii=1;$ii<=$elen+1;$ii++) {
      if (substr($s,$max-$ii,2)==': ') {
        return substr($s,0,$max-$ii+1);
      }
    }
  }

  if ($min) {
    // if a non-zero minimum is provided, then
    // find previous space or word punctuation to break at.
    // do not break at %`'"&.!?^ - reasons why to be documented.
    while ($slen>$min && !contains('@$ -~*()_+[]\{}|;,<>',$s[$slen-1])) {
      --$slen;
    }
  }
  // at this point we've got a min length string, 
  // only do minimum trimming necessary to avoid a punctuation error.
  
  // trim slash after colon or slash
  if ($s[$slen-1]=='/' && $slen > 2) {
    if ($s[$slen-2]==':') {
      --$slen;    
    }
    if ($s[$slen-2]=='/') {
      $slen -= 2;
    }
  }

  //if trimmed at a ":" in a URL, trim the whole thing
    //or trimmed at "http", trim the whole URL
  if ($s[$slen-1]==':' && $slen > 5 && substr($s,$slen-5,5)=='http:') {
    $slen -= 5;
  }
  else if ($s[$slen-1]=='p' && $slen > 4 && substr($s,$slen-4,4)=='http') {
    $slen -= 4;
  }
  else if ($s[$slen-1]=='t' && $slen > 4 && (substr($s,$slen-3,4)=='http' || substr($s,$slen-3,4)==' htt')) {
    $slen -= 3;
  }
  else if ($s[$slen-1]=='h' && $slen > 4 && substr($s,$slen-1,4)=='http') {
    $slen -= 1;
  }
  
  // if char immediately before ellipsis would be @$ then trim it
  if ($slen > 0 && contains('@$', $s[$slen-1])) {
    --$slen;
  }
 
  //if char before ellipsis would be sentence terminator, trim 2 more
  while ($slen > 1 && contains('.!?', $s[$slen-1])) {
    $slen-=2;
  }

  // trim extra whitespace before ellipsis down to one space
  if ($slen > 2 && contains("\n\r ", $s[$slen-1])) {
    while (contains("\n\r ", $s[$slen-2]) && $slen > 2) {
      --$slen;
    }
  }

  if ($slen < 1) { // somehow shortened too much
    return $e; // or ellipsis by itself exceeded max, return ellipsis.
  }

  // if last two chars are ': ', omit ellipsis. 
  if ($e==='...' && substr($s, $slen-2, 2)===': ') {
    return substr($s, 0, $slen);
  }

  return strcat(substr($s, 0, $slen), $e);
}

function get_leading_images_alts($s) {
  // note: alt text is unescaped, e.g. may contain ' & '
  return parse_leading_urls($s, true, false);  
}

function trim_leading_urls($s) {
  // deliberately trim URLs with explicit http: / https: from start
  // keep schemeless URLs, @-names as expected user-visible text
  // if empty or just space after trimming, just return original
  return parse_leading_urls($s, false, true);
}

function parse_leading_urls($s, $images_only, $remainder) {
  // parse for leading URLs with explicit http: / https: from start
  // including alt text after image URLs
  // if $images_only then also stop at first non-image URL
  // if $remainder return remaining string if non-empty or original
  // else return array of url,alt strings
  $r = trim($s);
  $u = array();
  while ($r!='' && (substr($r, 0, 5) == 'http:' || substr($r, 0, 6) == 'https:'))
  {
    $ws = offset(' ', $r);
    $rs = offset("\r", $r);
    if ($rs == 0) { $rs = offset("\n", $r); }
    if ($rs != 0 && $rs < $ws) { $ws = $rs; }
    if ($ws == 0) { 
      if ($remainder) return $s; 
    } else {
      $r[$ws-1] = ' ';
    }
    if (!$remainder) {
      $us = ($ws > 0) ? substr($r, 0, $ws-1) : $r;
      $as = '';
    }
    if ($ws > 0) {
      $rlen = $ws;
    }
    else {
      $r = strcat($r, ' ');
      $rlen = strlen($r);    
    }
    if (substr($r, ($fe = $rlen-5), 1) === '.' ||
        substr($r, ($fe = $rlen-6), 1) === '.')
    {
      $fe = strtolower(substr($r, $fe, 5)); 
      if ($fe == '.gif ' || $fe == '.jpeg' || $fe == '.jpg ' ||
          $fe == '.png ' || $fe == '.svg ')
      {
        // parse alt text after an image link also

        if ($ws > 0 && substr($r, $ws, 1) == '('/*)*/ ) {
          // balance for close paren, allow balanced parens in alt
          $paren_depth = 1;
          $sp_len = strlen($r);
          for ($j = $ws+1; $j < $sp_len; $j++) {
            switch ($r[$j]) {
              case '(': ++$paren_depth; break;
              case ')': --$paren_depth; break;
            }
            if ($paren_depth == 0)
              break;
          }
          if (!$remainder) {
            $as = substr($r, $ws+1, $j-$ws-1);
          }
          if ($j < $sp_len-1) {// if alt closed before end of string, trim it
            $ws = $j+1;
          }
          if (ctype_space($r[$ws])) {
            $ws++; // skip a trailing space
          }
        }
      }
      else {
        if ($images_only) {
          $us = '';
        }
      }
    }
    else {
      if ($images_only) {
        $us = '';
      }
    }
    if (!$remainder) {
      if ($us != '') {
        $u[count($u)] = strcat($us, ' ', $as);
      }
      else {
        return $u;
      }
    }
    if ($ws > 0) {
      $r = substr($r, $ws, strlen($r)-$ws);
    }
    else {
      $r = '';
    }
  }
  if (!$remainder) {
    return $u;
  }
  $r = trim($r);
  return ((strlen($r) > 0) ? $r : $s);
}

function auto_space($s) {
// replace linebreaks with <br class="auto-break"/>
//  and one leading space with &nbsp;
// replace "  " with " &nbsp;"
// replace leading spaces (on a line or before spaces) with nbsp;
  if ($s[0] === ' ') {
    $s = strcat('&#xA0;', substr($s, 1, strlen($s)-1));
  }
  return str_ireplace(array("\r\n", "\r", "\n ", "\n", "  "),
                      array("\n", "\n", '<br class="auto-break"/>&#xA0;',
                            '<br class="auto-break"/>',
                            ' &#xA0;'),
                      $s);
}

function auto_link_re() {
  return '/(?:\\^[0-9]{1,2})|(?:(?:(:?\\@|(?:(?:http|https|irc)?:\\/\\/))?(?:(?:(?:[a-zA-Z0-9ŽžÀ-ÿ][-a-zA-Z0-9ŽžÀ-ÿ]*\\.)+(?:(?:aero|app|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|blog|b[abdefghijmnorstvwyz])|(?:cafe|cat|cloud|coffee|com|coop|c[acdfghiklmnoruvxyz])|(?:design|dev|d[ejkmoz])|(?:edu|e[cegrstu])|(?:fyi|f[ijkmor])|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|j[emop]|k[eghimnrwyz]|(?:lol|l[abcikrstuvy])|(?:mil|museum|m[acdeghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:party|pro|pub|p[aefghklmnrstwy])|qa|(?:rocks|r[eouw])|(?:social|space|s[abcdeghijklmnortuvyz])|(?:tech|tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|(?:world|wtf|w[fs])|xyz|y[etu]|(?:zone|z[amw])))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\\:\\d{1,5})?)(?:\\/(?:(?:[!#&-;=?-Z_a-z~])|(?:\\%[a-fA-F0-9]{2}))*)?)|(?:\\@[_a-zA-Z0-9]{1,17})(?=\\b|\\s|$)/';
  // ccTLD compressed regular expression clauses (re)created.
  // .mobi .jobs deliberately excluded to discourage layer violations
  // .security .trust also excluded to discourage phishing abuses
  // see http://flic.kr/p/2kmuSL for more on the problematic new gTLDs
  // part of $re derived from Android Open Source Project, Apache 2.0
  // with a bunch of subsequent fixes/improvements (e.g. ttk.me/t44H2)
  // thus auto_link_re is also Apache 2.0 licensed
  //  http://www.apache.org/licenses/LICENSE-2.0
  // - Tantek 2010-046 (moved to auto_link_re 2012-062)
}


// auto_link: param 1: text; 
//  optional: param 2: do embeds & more markup or not (false),
//            param 3: do auto_links or not (true)
//            param 4: do u-* photo/video upgrade (1st) image (false)
//            param 5: do footnotes with fragmentprefix ("")
// auto_link is idempotent, works on plain text or typical markup.
function auto_link(/*$t*/) {
  $isjs = js();
  $args = $isjs ? arguments : func_get_args();
  if (count($args) === 0) {
    return '';
  }
  $t = $args[0];
  $do_embed = (count($args) > 1) && ($args[1]!==false);
  $do_link = (count($args) < 3) || ($args[2]!==false);
  $do_u_media = (count($args) > 3) && ($args[3]!==false);
  $fnote_frag = (count($args) > 4) ? $args[4] : "";
  $doing_u_media = false; // do any number in a row
  $re = auto_link_re();
  $ms = preg_matches($re, $t);
  if (!$ms) {
    return $t;
  }

  $mlen = count($ms);
  $sp = preg_split($re, $t);
  $t = "";
  $sp[0] = string($sp[0]); // force undefined to ""
  for ($i=0; $i<$mlen; $i++) {
    $mi = $ms[$i];
    $spliti = $sp[$i];
    $t = strcat($t, $spliti);
    $sp[$i+1] = string($sp[$i+1]); // force undefined to ""
    if (substr($sp[$i+1], 0, 1)=='/') { //regex omits end slash before </a
      $sp[$i+1] = substr($sp[$i+1], 1);
      $mi = strcat($mi, '/'); // explicitly include it in the match
    }
    $spe = substr($spliti, -2, 2);
    // avoid 2x-linking, don't link CSS @-rules, attr values, asciibet
    if ((!$spe || !preg_match('/(?:\\=[\\"\\\']?|t;)/', $spe)) &&
        substr(trim($sp[$i+1]), 0, 3)!='</a' && 
        (!contains('@charset@font@font-face@import@media@namespace@page@supports@ABCDEFGHIJKLMNOPQ@',
                   strcat($mi, '@'))))
    {
      $afterlink = '';
      $afterchar = substr($mi, -1, 1);
      if (contains($mi, '(') && $afterchar!=')' &&
          substr($sp[$i+1], 0, 1)===')') {
        $mi = strcat($mi, ')');
        $afterchar = ')';
        $sp[$i+1] = substr($sp[$i+1], 1);
      }
      while (contains('.!?,;"\')]}', $afterchar) && //trim end puncts
          ($afterchar!=')' || !contains($mi, '('))) { // allow a ()
          $afterlink = strcat($afterchar, $afterlink);
          $mi = substr($mi, 0, -1);
          $afterchar = substr($mi, -1, 1);
      }
      
      $fe = 0;
      if ($do_embed && strlen($mi) > 5) {
         $fe = strtolower(
                (substr($mi, -4, 1) === '.') ? substr($mi, -4, 4) 
                                             : substr($mi, -5, 5));
      }
      $wmi = web_address_to_uri($mi, true);
      $prot = protocol_of_uri($wmi);
      $hn = hostname_of_uri($wmi);
      $pa = path_of_uri($wmi);
      $ih = is_http_uri($wmi);

      $ahref = '<span class="figure" style="text-align:left">';
      $enda = '</span>';
			if ($do_link) {
        $ahref = strcat('<a class="auto-link figure" href="',      
                        $wmi, '">');
        $enda = '</a>';
      }

      if ($fe && 
          ($fe === '.jpeg' || $fe === '.jpg' || 
           $fe === '.png' || $fe === '.gif' || $fe === '.svg' || 
           $fe === '.mp4' )) // hack for IG mp4 for u-video
      {
        $alt = strcat('a ',
                      (offset('photo', $mi) != 0) ? 'photo' 
                                                  : substr($fe, 1),
                      '. ');
        $media_class = 'auto-embed';
        $poster = '';
        if (($i === 0 || $doing_u_media) && 
             // check first URL for u-photo upgrade, or sequential
            $do_u_media) {
          if ($fe === '.mp4') {
						$media_class = strcat($media_class, ' u-video');          
          }
          else {
						$media_class = strcat($media_class, ' u-photo');
          }
          $doing_u_media = true;
        }
        if ($i+1 < $mlen &&
            $afterlink === '' &&
            ((contains("\n\r ", $sp[$i+1][0]) && 
             (strlen($sp[$i+1]) == 1 || $sp[$i+1][1] == '('/*)*/)) 
             || $sp[$i+1] == '<br class="auto-break"/>')) {
          // if the non-URL after a photo/video is space or line-break
          // or if there's a (1 of "\n\r ")+"(" after, use as alt text til ")"
          // and there's a URL afterwards, link it

          if ($sp[$i+1][1] == '('/*)*/) {
            // alt text found, balance for close paren, allow balanced parens in alt
            $alt = ''; // set empty alt by default since alt was explicitly set
            $paren_depth = 1;
            $sp_len = strlen($sp[$i+1]);
            for ($j = 2; $j < $sp_len; $j++) {
              switch ($sp[$i+1][$j]) {
                case '(': ++$paren_depth; break;
                case ')': --$paren_depth; break;
              }
              if ($paren_depth == 0)
                break;
            }
            $alt = substr($sp[$i+1], 2, $j-2);
            $sp[$i+1] = ($j < $sp_len-1) ? substr($sp[$i+1], $j+1, $sp_len-$j-1) : '';
          }
          if (contains("\n\r ", $sp[$i+1]) || $sp[$i+1] == '<br class="auto-break"/>') {
            $sp[$i+1] = ''; // consume any remaining single space or line-break
          }

          $m1 = $ms[$i+1];
					$acm1 = substr($m1, -1, 1);
					if (contains($m1, '(') && $acm1!=')' &&
							substr($sp[$i+2], 0, 1)===')') {
						$m1 = strcat($m1, ')');
						$acm1 = ')';
						$sp[$i+2] = substr($sp[$i+2], 1);
					}
          while (contains('.!?,;"\')]}', $acm1) && //trim end puncts
          ($acm1!=')' || !contains($m1, '('))) { // allow a ()
						$afterlink = strcat($acm1, $afterlink);
						$m1 = substr($m1, 0, -1);
						$acm1 = substr($m1, -1, 1);
          }
          $ms[$i+1] = $m1;

          if ($afterlink==='' && $sp[$i+2] != '') { // fix the URL after if necessary
            if (substr($sp[$i+2], 0, 1) == '/') {
							// if regex pushed a trailing slash to the sp
							$sp[$i+2] = substr($sp[$i+2], 1, strlen($sp[$i+2]) - 1);
							$ms[$i+1] = strcat($ms[$i+1], '/'); // include in match
            }
						if (contains("\n\r ", substr($sp[$i+2], 0, 1))) {
							// consume blank space or linebreak after the link
							// TBI: look for a third space alt-text string
							// http://tantek.com/w/Markdown#Alttextforimages
							$sp[$i+2] = substr($sp[$i+2], 1, strlen($sp[$i+2]) - 1);
						}					
						if (substr($sp[$i+2], 0, 24)=='<br class="auto-break"/>')
						{
							// consume next auto_space linebreak (if called first)
							$sp[$i+2] = substr($sp[$i+2], 24, strlen($sp[$i+2])-24);
						}
					}
          // check second link for poster image of a video
          if ($fe == '.mp4') {
 					  $fe2 = strtolower((substr($ms[$i+1], -4, 1) === '.') 
 					                    ? substr($ms[$i+1], -4, 4)
 					                    : substr($ms[$i+1], -5, 5));
 					  if ($fe2 && 
                ($fe2 === '.jpeg' || $fe2 === '.jpg' || 
                 $fe2 === '.png' || $fe2 === '.gif')) {
              $poster = $ms[$i+1];
              // poster image found. now also check for a link after!
							if ($i+2<$mlen &&
									$afterlink === '' &&
									($sp[$i+2] == '' || contains("\n\r ", $sp[$i+2]) ||
									 $sp[$i+2] == '<br class="auto-break"/>')) {
          // if the non-URL after the poster is space or line-break
          // and there's a URL afterwards, link it
								$sp[$i+2] = ''; // consume single space or line-break
                // fix URL after if necessary
                if ($sp[$i+3] != '') {
									if (substr($sp[$i+3], 0, 1) == '/') {
										// if regex pushed a trailing slash to the sp
										$sp[$i+3] = substr($sp[$i+3], 1, strlen($sp[$i+3]) - 1);
										$ms[$i+2] = strcat($ms[$i+2], '/'); //add to match
									}
									if (contains("\n\r ", substr($sp[$i+3], 0, 1))) {
										// No need to look for a third space alt-text string, because posters can't alt
										// consume blank space or linebreak after the link
										$sp[$i+3] = substr($sp[$i+3], 1, 
										                   strlen($sp[$i+3]) - 1);
									}					
									if (substr($sp[$i+3], 0, 24) == 
									    '<br class="auto-break"/>')
									{
										// consume next auto_space linebreak (if called first)
										$sp[$i+3] = substr($sp[$i+3], 24,
										                   strlen($sp[$i+3])-24);
									}
								}
                $i++; // skip handling the poster separately
              }
            }
          }
          $poster_only = ($poster === $ms[$i+1]);
          // TBI: should poster be a (linked) fallback image?
					$a_class = "auto-link";
					if ($fe !== '.mp4') {$a_class=strcat($a_class, ' figure');}
					$ig_link = contains($ms[$i+1], 'instagram.com/p/');
					if (contains($media_class, 'u-') &&
					    ($ig_link ||
					     contains($ms[$i+1],
					              'commons.wikimedia.org/wiki/File:'))) {
					  $a_class = strcat($a_class, ' u-syndication');   
					}
					if (contains($media_class, 'u-photo') && 
					    contains($ms[$i+1], '4sqi.net/img/general/original/')) {
            // was: move u-photo to higher resolution original jpg URL
					  // $a_class = strcat($a_class, ' u-photo');
            // $media_class = 'auto-embed';
            // need to keep u-photo on img for the alt text to work!
            // Bridgy Publish syndicate higher resolution photo to Flickr
					  $a_class = strcat($a_class, ' u-bridgy-flickr-photo');
					}
					$ahref = strcat('<a class="', $a_class, '" href="',
					                $poster_only 
					                ? $wmi
					                : $ms[$i+1], '">');
          $i++; // skip handling the link separately
        }
        if ($fe === '.mp4') { // more hack
          if ($poster) { $poster = strcat('poster="', $poster, '" ');}
					$t = strcat($t, 
					            '<span class="figure"><video class="',
					            $media_class, '"',
					            ($ig_link ? ' loop="loop" ' : ' '), $poster,
											'controls="controls" src="', $wmi, '">', 
											$ahref, 'a video', $enda, '</video></span>', $afterlink);
        } else {
          $t = strcat($t, $ahref, '<img class="', $media_class, 
                      '" alt="', $alt, '" src="', $wmi, '"/>', 
                      $enda, $afterlink);
        }
      } else if ($fe && 
                 ($fe === '.mp4' || $fe === '.mov' || 
                  $fe === '.ogv' || $fe === '.webm'))
      {
        $t = strcat($t, $ahref, 
                    '<span class="figure"><video class="auto-embed" ',
                    'controls="controls" src="', $wmi, '">a video</video></span>',
                    $enda, $afterlink);
      } else if ($hn === 'vimeo.com' 
                     && ctype_digit(substr($pa, 1)))
      {
				if ($do_link) {
				  $t = strcat($t, '<a class="auto-link" href="',
				              'https:', relative_uri_hash($wmi),
                      '">', $mi, '</a> ');
				}
        if ($do_embed) {
          $t = strcat($t, '<iframe class="vimeo-player auto-embed figure" width="480" height="385" style="border:0" src="', 'https://player.vimeo.com/video/', 
                      substr($pa, 1), '"></iframe>', 
                      $afterlink);
        }
      } else if ($hn === 'youtu.be' ||
                (($hn === 'youtube.com' || $hn === 'www.youtube.com')
                 && ($yvid = offset('watch?v=', $mi)) !== 0))
      {
        if ($hn === 'youtu.be') {
          $yvid = substr($pa, 1);
        }
        else {
          $yvid = explode('&', substr($mi, $yvid+7));
          $yvid = $yvid[0];
        }
				if ($do_link) {
  				$t = strcat($t, '<a class="auto-link" href="',
  				            'https:', relative_uri_hash($wmi),
                      '">', $mi, '</a> ');
        }
        if ($do_embed) {
          $t = strcat($t, '<iframe class="youtube-player auto-embed figure" width="480" height="385" style="border:0"  src="', 'https://www.youtube.com/embed/', 
                      $yvid, '"></iframe>', 
                      $afterlink);
        }
      } else if ($mi[0] === '^' && $do_link) {
        // convert footnote to Unicode and hyperlink
        if ($fnote_frag!='' && !contains('"\'', $afterlink[0])) { // if not quoted example
					$fnote_num = substr($mi, 1);
					$mi = nstr_to_usup($fnote_num); // convert number string to Unicode superscripts
					$fnote_exp_id = strcat($fnote_frag, '_note-', $fnote_num);
					$fnote_ref_id = strcat($fnote_frag, '_ref-', $fnote_num);
					if (contains("\r\n", substr($spliti, -1, 1)) ||
  	  			  substr($spliti, -5, 5) == '<br/>' ||
  	  			  substr($spliti, -6, 6) == '<br />' ||
					    substr($spliti, -14, 14) == '"auto-break"/>') { // before ^ is a linebreak
						// TBI? append ⮐ after note expansion hyperlinked to inline ref
						// create <a id=$fnote_exp_id href=#,$fnote_ref_id > uni-num </a>
						$mi = strcat('<a id="', $fnote_exp_id, '" href="#', $fnote_ref_id, '">', 
													$mi, '</a>');
					} else {
						// create <a id=$fnote_ref_id href=#,$fnote_exp_id > uni-num </a>
						$mi = strcat('<a id="', $fnote_ref_id, '" href="#', $fnote_exp_id, '">', 
													$mi, '</a>');
					}
        }
        $t = strcat($t, $mi, $afterlink);
      } else if ($do_link) {
				$extra_class = '';
        if ($mi[0] === '@') { 
          $wmi = substr($mi, 1); // $spliti
          // link @name@domainpath @domainpath@domainpath or @name
          if ($i<$mlen-1 && $ms[$i+1][0] == '@' && contains($ms[$i+1], '.') 
              && strlen($sp[$i+1]) == 0)
          { // if @-@ and second @ is @domain, then link them together
						if ($mi == $ms[$i+1]) { // @domain@domain
							$wmi = strcat('https://', $wmi);
						}
						else { // @something@domain
							$wmi = strcat('https://', substr($ms[$i+1], 1), '/', $mi);
							$mi = strcat($mi, $ms[$i+1]);
						}
						$ms[$i+1] = ''; // already linked the next link match in this link
					}
					else if (contains($mi, '.')) { // @domain
						$wmi = strcat('https://', $wmi);
          }
					else { // otherwise Twitter @username
						$wmi = strcat('https://twitter.com/', $wmi);
						$extra_class = ' h-cassis-username';
					}
        }
				$doing_u_media = false;
        $t = strcat($t, '<a class="auto-link', $extra_class, '" href="',
                    $wmi, '">', $mi, '</a>', 
                    $afterlink);
      } else {
        $doing_u_media = false;
        $t = strcat($t, $mi, $afterlink);
      }
    } else {
			$doing_u_media = false;
      $t = strcat($t, $mi);
    }
  }
  return strcat($t, $sp[$mlen]);
}

// auto_embed: syntactic sugar for calling auto_link to produce embedding markup
// required param 1: text to auto link and embed 
function auto_embed($t) {
  return auto_link($t, true);
}


function get_auto_linked_urls($s) {
  // in: $s result of auto_link() applied to plain text
  // out: array of urls from hyperlinks in $s
  
  $s = explode('href="', $s);
  $irtn = count($s);
  if ($irtn < 2) { return array(); }
  $r = array();
  for ($i=1; $i<$irtn; $i++) {
    $r[$i-1] = substr($s[$i], 0, offset('"', $s[$i])-1);
  }
  return $r;
}


// returns array of URLs after literal "in-reply-to:" in text
function get_in_reply_to_urls($s) {
  $s = explode('in-reply-to: ', $s);
  $irtn = count($s);
  if ($irtn < 2) { return array(); }
  $r = array();
  $re = auto_link_re();
  for ($i=1; $i<$irtn; $i++) {
    // iterate through all strings after an 'in-reply-to: ' for URLs
    $ms = preg_matches($re, $s[$i]);
    $msn = count($ms);
    if ($ms) {
      $sp = preg_split($re, $s[$i]);
      $j = 0;
      $afterlink = '';
      while ($j<$msn && 
             $afterlink == '' &&
             ($sp[$j] == '' || ctype_space($sp[$j]))) {
        // iterate through space separated URLs and add them to $r
        $m = $ms[$j];
        if ($m[0] != '@') { // skip @-references
          $ac = substr($m, -1, 1);
          while (contains('.!?,;"\')]}', $ac) && // trim punc @ end
              ($ac != ')' || !contains($m, '('))) { 
              // allow one paren pair
              // *** not sure twitter is this smart
              $afterlink = strcat($ac, $afterlink);
              $m = substr($m, 0, -1);
              $ac = substr($m, -1, 1);
          }
          if (substr($m, 0, 6) === 'irc://') { 
            // skip it. no known use of in-reply-to an IRC URL
          } else {
            $r[count($r)] = web_address_to_uri($m, true);
          }
        }
        $j++;
      }
    }
  } 
  return $r;
}

/* Twitter POSSE support */

function tw_text_proxy($t) {
  // replace URLs with https://j.mp/0011235813 to mimic Twitter's t.co
  // $t must be plain text
  $re = auto_link_re();
  $ms = preg_matches($re, $t);
  if (!$ms) {
    return $t;
  }

  $mlen = count($ms);
  $sp = preg_split($re, $t);
  $t = "";
  $sp[0] = string($sp[0]); // force undefined to ""
  for ($i=0; $i<$mlen; $i++) {
    $mi = $ms[$i];
    $spliti = $sp[$i];
    $t = strcat($t, $spliti);
    $sp[$i+1] = string($sp[$i+1]); // force undefined to ""
    if (substr($sp[$i+1], 0, 1)=='/') { // regex omits '/' before </a
      $sp[$i+1] = substr($sp[$i+1], 1, strlen($sp[$i+1])-1);
      $mi = strcat($mi, '/'); // explicitly include in match
    }
    if ($i<$mlen-1 && $mi[0] == '@' && strlen($sp[$i+1]) == 0 && $ms[$i+1][0] == '@') {
      // found an @-@, combine it into one linkable thing.
      $mi = strcat($mi, $ms[$i+1]);
      $ms[$i+1] = '';
    }
    $spe = substr($spliti, -2, 2);
    // don't proxy @-names (and before 2018-024: plain ccTLDs)
    if ($mi !== '' && $mi[0] !== '@'
      //&& (substr($mi, -3, 1) !== '.' || substr_count($mi, '.') > 1)
        ) {
      $afterlink = '';
      $afterchar = substr($mi, -1, 1);
      while (contains('.!?,;"\')]}', $afterchar) && // trim punc @ end
          ($afterchar !== ')' || !contains($mi, '('))) { 
          // allow one paren pair
          // *** not sure twitter is this smart
          $afterlink = strcat($afterchar, $afterlink);
          $mi = substr($mi, 0, -1);
          $afterchar = substr($mi, -1, 1);
      }
      
      $prot = protocol_of_uri($mi);
      $proxy_url = '';
      if ($prot === 'irc:') {
        $proxy_url = $mi; // Twitter doesn't tco irc: URLs
      }
      else { /* 'https:', 'http:' or presumed for schemeless URLs */ 
        $proxy_url = 'https://j.mp/0011235813';
      }
      $t = strcat($t, $proxy_url, $afterlink);
    }
    else {
      $t = strcat($t, $mi);
    }
  }
  return strcat($t, $sp[$mlen]);
}


function note_length_check($note, $maxlen, $username) {
// checks to see if $note fits in $maxlen characters.
// if $username is non-empty, checks to see if a RT'd $note fits in $maxlen
// 0 - bad params or other precondition failure error
// 200 - exactly fits max characters with RT if username provided
// 206 - less than max chars with RT if username provided
// 207 - more than RT safe length, but less than tweet max
// 208 - tweet max length but with RT would be over
// 413 - (entity too large) over max tweet length
// strlen('RT @: ') == 6.
  if ($maxlen < 1) return 0;
  
  $note_size_check_u = $username ? 6 + strlen(string($username)) : 0;
  $note_size_check_n = strlen(string($note)) + $note_size_check_u;
  
  if ($note_size_check_n == $maxlen)                      return 200;
  if ($note_size_check_n < $maxlen)                       return 206;
  if ($note_size_check_n - $note_size_check_u < $maxlen)  return 207;
  if ($note_size_check_n - $note_size_check_u == $maxlen) return 208;
  return 413;
}

function tw_length_check($t, $maxlen, $username) {
  return note_length_check(tw_text_proxy($t), 
                           $maxlen, $username);
}

function tw_url_to_status_id($u) {
// $u - tweet permalink url
// returns tweet status id string; 0 if not a tweet permalink.
  if (!$u) return 0;
  $u = explode("/", string($u)); // https:,,twitter.com,t,status,nnn
  if (($u[2] != "twitter.com" && $u[2] != "mobile.twitter.com") || 
      $u[4] != "status"      ||
      !ctype_digit($u[5])) {
    return 0;
  }
  return $u[5];
}

function tw_url_to_username($u) {
// $u - tweet permalink url
// returns twitter username; 0 if not a tweet permalink.
  if (!$u) return 0;
  $u = explode("/", string($u)); // https:,,twitter.com,t,status,nnn
  if ($u[2] != "twitter.com" || 
      $u[4] != "status"      ||
      !ctype_digit($u[5])) {
    return 0;
  }
  return $u[3];
}

function fb_url_to_event_id($u) {
// $u - fb event permalink url
// returns fb event id string; 0 if not a fb event permalink.
  if (!$u) return 0;
  $u = explode("/", string($u)); // https:,,fb.com,events,nnn
  if (($u[2] != "fb.com" && $u[2] != "facebook.com" && 
       $u[2] != "www.facebook.com") || 
      $u[3] != "events"      ||
      !ctype_digit($u[4])) {
    return 0;
  }
  return $u[4];
}

function is_slash_at_post($u) {
// $u - Mastodon or other ActivityPub supporting site post permalink URL
// returns whether or not the URL has one of the following syntaxes:
// domain/@user@domain/number
// domain/@user/number
// false positives should be harmless so this function can be shorter/quicker
  if (!$u) return false;
  $u = explode('/', string($u)); // https:,,domain,@user(@domain),nnn
  if (count($u) != 5) return false;
  if (substr($u[3], 0, 1) != '@') return false;
  if (!ctype_digit($u[4])) return false;
  return true;
}


/* end Falcon */


/* ------------------------------------------------------------------ */

/* end cassis.js */
// ?> -->
