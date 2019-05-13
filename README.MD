# Cloudflare-Dynamic-IP-Updater
Automatically updates your dynamic ip

Simple script to automatically update your cloudflair A record to be your public ip

How to Use:
Simply edit the settings-template.json to reflect your information:

email:  the email of your Cloudflare account  
apiKey: the Api key associated with your cloudflare account  
domain: the record to update  
interval: the interval to check for updates (in ms)

Then rename "settings-template.json" to "settings.json"

PLEASE NOTE:
This does not work for IPv6 (AAAA) records, it only works with IPv4 (A) records
