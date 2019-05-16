# Cloudflare-Dynamic-IP-Updater
Automatically updates your dynamic ip

Simple script to automatically update your cloudflair A record to be your public ip

How to Use:  
Step 1.  
- Simply edit the settings-template.json to reflect your information  
--- email:  the email of your Cloudflare account  
--- apiKey: the Api key associated with your cloudflare account  
--- zoneName: the name of the zone to update (the name you see beside home on dash.cloudflare.com)  
--- domains: the records to update (please keep this as an array)  
--- interval: the interval to check for updates (in ms)  

Step 2:  
- Rename "settings-template.json" to "settings.json"  
  
Step 3:  
- Start "run.bat" or "run.sh" depending on your operating system  
- (you may need to start run.bat twice, once to install the dependancies  
- and again to run the program)  


PLEASE NOTE:  
This does not work for IPv6 (AAAA) records, it only works with IPv4 (A) records  
