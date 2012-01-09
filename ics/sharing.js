/* sharing.js

2009-10-26 created by Tantek Çelik http://tantek.com

NOTES:
This depends on functions defined in ../common.js
---------------------------------------------------- */

function updatesharing() {
  var uri = uriclean(document.forms[0].uri.value);
  document.getElementById("icslink").value = 'http://h2vx.com/ics/'+uri;
  uri = htmlspecialchars(uri);
  document.getElementById("HTMLdownload").value ='<a type="text/calendar" href="http://h2vx.com/ics/'+uri+'">Download iCal</a>';
  document.getElementById("HTMLsubscribe").value ='<a type="text/calendar" href="webcal://h2vx.com/ics/'+uri+'">Subscribe to iCal</a>';
}

document.forms[0].uri.onkeyup = updatesharing;
document.write('<fieldset><p><label class="term">URL <span class="info"><b>(</b>Use this link to directly retrieve an iCalendar file.<b>)</b></span></label> <input id="icslink" onclick="document.getElementById(\'icslink\').focus();document.getElementById(\'icslink\').select()" readonly="readonly" type="text" /></p><p><label class="term">HTML <span class="info"><b>(</b>Add this HTML to your web page to create a "Download iCal" link.<b>)</b></span></label> <input id="HTMLdownload" onclick="document.getElementById(\'HTMLdownload\').focus();document.getElementById(\'HTMLdownload\').select()" readonly="readonly" type="text" /></p><p><label class="term">subscribe <span class="info"><b>(</b>Add this HTML to your web page to create a "Subscribe to iCal" link.<b>)</b></span></label> <input id="HTMLsubscribe" onclick="document.getElementById(\'HTMLsubscribe\').focus();document.getElementById(\'HTMLsubscribe\').select()" readonly="readonly" type="text" /></p></fieldset>');

updatesharing();

document.forms[0].subscribe.onclick = function () {
 window.location = 'webcal://h2vx.com/ics/'+uriclean(document.forms[0].uri.value);
 return false;
}
