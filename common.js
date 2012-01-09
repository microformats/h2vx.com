/* common.js

2009-10-26 created by Tantek Çelik http://tantek.com

NOTES:
This uses code from CASSIS V0 by Tantek Celik http://tantek.com
http://tantek.pbworks.com/CassisProject
http://creativecommons.org/licenses/by-sa/3.0/

--------------------------------------------------------------------- */


/* cassis0.js */
function js() {
 return ("00"==false);
}

function strcat($s1,$s2) {
 if (js()) { return $s1 + $s2; }
 else { return $s1 . $s2; }
}
/* end cassis0.js */

/* cassis0php.js - processed only by javascript */
// ?>
<!-- <? $js=<<<EJS
/* --> /**/

function strlen(s) {
 return s.length;
} 

function ord(s) {
 return s.charCodeAt(0);
}

function substr(s,o,n) {
 var m = strlen(s);
 if (Math.abs(o)>=m) return false;
 if (o<0) o=m+o;
 if (n<0) n=m-o+n;
 return s.substring(o,o+n);
}

function explode(d,s,n) {
 return s.split(d,n);
}

function rawurlencode(s) {
 return encodeURIComponent(s);
}

function htmlspecialchars(s) {
 var c= [["&","&amp;"],["<","&lt;"],[">","&gt;"],["'","&#039;"],['"',"&quot;"]];
 for (i=0;i<c.length;i++) {
  s = s.replace(c[i][0],c[i][1]);
 }
 return s;
}

function str_ireplace(a,b,s) {
 return s.replace(new RegExp(a,"gi"),b);
}

/* more javascript-only functions here */

/*
EJS;
/**/
/* end cassis0php.js */


/* functions written in CASSIS V0 */
function webaddresstouri($wa) {
  if ((substr($wa,0,7) == "http://") || (substr($wa,0,8) == "https://")) {
    return $wa;
  }
  
  if (substr($wa,0,1) == "@") {
    return strcat("http://twitter.com/",substr($wa,1,strlen($wa)));
  }
  
  return strcat("http://",$wa);
}

function uriclean($uri) {
  $uri = webaddresstouri($uri);
  // prune the optional http:// for a neater param
  if (substr($uri, 0,7) == "http://") {
    $uri = explode("://",$uri,2);
    $uri = $uri[1];
  }
  // URL encode
  return str_ireplace("%2F","/",rawurlencode($uri));
}
/* end functions written in CASSIS V0 */