const settings = require("./settings.json");
const request = require("request");
const cf = require('cloudflare') ({
    email: settings.email,
    key: settings.apiKey
});

const domains = settings.domains;

let zone = null;
let ip = null;
let dns = [];

function getZone(then) {
    const p = cf.zones.browse();

    p.then(t => {
        // find the zone
        const i = t.result.filter(n => {return n.name == settings.zoneName});

        // check
        if (i.length < 1) return console.log("Please check the zoneName in settings.js");

        // set it
        zone = i[0];

        // continue
        if (then) then();
    });

    p.catch(console.error);
}

function getDNSs(then) {
    const p = cf.dnsRecords.browse(zone.id);

    p.then(x => {
        // loop through all domains we want to check
        for (let d in domains) {
            const domain = domains[d];

            // find it in the list
            const i = x.result.filter((n) =>  {return (n.name == domain && n.type == 'A')});

            // check
            if (i.length < 1) return console.log("Please check the domains in settings.js");
            
            // add it to our list to update
            dns.push(i[0]);
        }

        // continue
        if (then) then();
    });
    p.catch(console.error);
}

function update() {
    for (let d in dns) {
        const p = cf.dnsRecords.read(zone.id, dns[d].id);

        p.then(x => {
            x = x.result;
            x.content = ip;
            
            const p2 = cf.dnsRecords.edit(zone.id, dns[d].id, x);
            p2.then(console.log);
            p2.catch(console.error);
        });
        
        p.catch(console.error);
    }
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
    getDNSs(()=> {
        ip = dns[0].content;

        check();

        setInterval(check, 1000);

        console.log("running...");
    });
});
