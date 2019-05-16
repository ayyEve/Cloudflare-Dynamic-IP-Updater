const settings = require("../settings.json");
const domains = settings.domains;

const cf = require('cloudflare') ({
    email: settings.email,
    key: settings.apiKey
});

let zone = null;
let dns = [];

function getZone(then) {
    const p = cf.zones.browse();

    p.then(t => {
        // filter
        const i = t.result.filter((n) => {
            return n.name == settings.zoneName;
        });

        // check
        if (i.length < 1) {
            return console.log("Please check the zoneName in settings.js");
        }

        // get
        zone = i[0];

        // when done
        then();
    });

    p.catch(console.error);
}

function getDNSs() {
    const p = cf.dnsRecords.browse(zone.id);

    p.then(x => {
        // loop through all domains we want to check
        for (let d in domains) {
            const domain = domains[d];
            console.log("checking: " + domain);

            // find it in the list
            const i = x.result.filter((n) =>  {
                return (n.name == domain && n.type == 'A');
            });
            console.log("filtered results: ", i);
            
            // add it to our list to update
            dns.push(i[0]);
        }
        console.log("list: ", dns);
    });
    p.catch(console.error);
}

getZone(getDNSs);