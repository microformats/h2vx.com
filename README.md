# h2vx.com
H2VX microformats to vCard/iCalendar converter, test dev.h2vx.com for issues

# Setting up locally

_The instructions (below) assume that you are using a Debian/Ubuntu/*nix distro. Commands are Ubuntu-centric, but can be adjusted to the *nix of your choice._

1. Install `tasksel` for LAMP-server setup:
```
sudo apt install tasksel
```

2. Install LAMP-server via `tasksel`:
```
sudo tasksel
```
(starts tasksel)

Follow the rest of the instructions using the Ubuntu-tasksel [link here](https://help.ubuntu.com/community/Tasksel#Usage)

3. Install missing php-packages (assuming `php5` is installed):
```
sudo apt install php5-curl php5-xsl php5-tidy
```

4. After you have downloaded/extracted the website, you can use the following command(s) to `push` the site to the Apache-server:  
```
sudo cp -av ~/h2vx.com-master/* /var/www/html/
sudo chmod 755 -R /var/www  
# the chmod is normally required to overcome 403 or other permissions-issues
```

5. Copy/Paste the following code into `~/vcf/sharing.js`:
```
/* sharing.js

2009-10-26 created by Tantek Çelik http://tantek.com

NOTES:
This depends on functions defined in common.js
---------------------------------------------------- */

var base = document.location.href.substr(0, document.location.href.lastIndexOf('/vcf/') + 5);

function updatesharing() {
  var uri = uriclean(document.forms[0].uri.value);
  document.getElementById('vcardlink').value = base+uri;
  uri = htmlspecialchars(uri);
  document.getElementById('HTML').value ='<a type="text/directory" href="'+base+uri+'">Download vCard</a>';
}

document.forms[0].uri.onkeyup = updatesharing;
document.write('<fieldset><p><label class="term">URL <span class="info"><b>(</b>Use this link to directly retrieve vCards.<b>)</b></span></label> <input id="vcardlink" onclick="document.getElementById(\'vcardlink\').focus();document.getElementById(\'vcardlink\').select()" readonly="readonly" type="text" /></p><p><label class="term">HTML <span class="info"><b>(</b>Add this HTML to your web page to create a "Download vCard" link.<b>)</b></span></label> <input id="HTML" onclick="document.getElementById(\'HTML\').focus();document.getElementById(\'HTML\').select()" readonly="readonly" type="text" /></p></fieldset>');

updatesharing();  
```  

Note. Adjusting the `sharing/js` is required to get the generator to render on your domain (eg. `localhost/vcf` )

Note2. Remember to copy/paste the `sharing.js` to `var/www/html` in case you make changes to the local copy.

## Troubleshooting

 - Restart Apache server:
 ```
 sudo service apache2 restart
 ```
 
 - View Apache Logs:
 ```
 sudo cat /var/log/apache2/access.log
 sudo cat /var/log/apache2/error.log
 ```
