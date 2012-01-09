/* sharing.js

2009-10-26 created by Tantek Çelik http://tantek.com

NOTES:
This depends on functions defined in common.js
---------------------------------------------------- */

function updatesharing() {
  var uri = uriclean(document.forms[0].uri.value);
  document.getElementById('vcardlink').value = 'http://h2vx.com/vcf/'+uri;
  uri = htmlspecialchars(uri);
  document.getElementById('HTML').value ='<a type="text/directory" href="http://h2vx.com/vcf/'+uri+'">Download vCard</a>';
}

document.forms[0].uri.onkeyup = updatesharing;
document.write('<fieldset><p><label class="term">URL <span class="info"><b>(</b>Use this link to directly retrieve vCards.<b>)</b></span></label> <input id="vcardlink" onclick="document.getElementById(\'vcardlink\').focus();document.getElementById(\'vcardlink\').select()" readonly="readonly" type="text" /></p><p><label class="term">HTML <span class="info"><b>(</b>Add this HTML to your web page to create a "Download vCard" link.<b>)</b></span></label> <input id="HTML" onclick="document.getElementById(\'HTML\').focus();document.getElementById(\'HTML\').select()" readonly="readonly" type="text" /></p></fieldset>');

updatesharing();
