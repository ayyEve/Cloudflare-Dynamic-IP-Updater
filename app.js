const settings = require("./settings.json");
const request = require("request");
const cf = require('cloudflare') ({
  email: settings.email,
  key: settings.apiKey
});

let zone = null;
let dns = null;
let ip = null;

function getZone(then) {

    const p = cf.zones.browse();

    p.then(t => {
        const i = t.result.filter(n => {return n.name == settings.domain});
        zone = i[0];

        if (then) then();
    });

    p.catch(console.error);
}

function getDnsId(then) {

    const p = cf.dnsRecords.browse(zone.id);

    p.then(x => {
        const i = x.result.filter(n => {return (n.name == settings.domain && n.type == "A")});
        dns = i[0];

        if (then) then();
    });

    p.catch(console.error);
}

function update() {

    const p = cf.dnsRecords.read(zone.id, dns.id);

    p.then(x => {
        x = x.result;
        x.content = ip;

        const p2 = cf.dnsRecords.edit(zone.id, dns.id, x);
        p2.then(console.log);
        p2.catch(console.error);
    });
    
    p.catch(console.error);
}

function check() {

    request("https://api.ipify.org", (err, res, body) => {
        const newIP = body;

        if (ip != newIP) {
            console.log("new up detected, updating (" + ip + " => " + newIP);

            ip = newIP;
            update();
        }
    });
}

// start
getZone(() => {
    getDnsId(()=> {

        ip = dns.content;

        check();

        setInterval(check, 1000);
    });
});