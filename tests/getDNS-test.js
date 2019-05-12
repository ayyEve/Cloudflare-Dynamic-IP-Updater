const settings = require("../settings.json");
const cf = require('cloudflare') ({
  email: settings.email,
  key: settings.apiKey
});

let zone = null;
let dns = null;


function getZone(then) {
    const p = cf.zones.browse();

    p.then(t => {
        // filter
        const i = t.result.filter((n) => {return n.name==settings.domain});
        console.log(t.result)

        // check
        if (i.length < 1) return console.log("Please check the domain in settings.js");

        // get
        zone = i[0].id;

        // when done
        then();
    });

    p.catch(console.error);
}

function getDnsId() {
    const p = cf.dnsRecords.browse(zone);
    p.then(x => {
        console.log("reply: ", x);

        const i = x.result.filter((n) =>  {return (n.name == settings.domain && n.type == 'A')});
        console.log("filtered results: ", i);

        dns = i[0].id;
        console.log("selected Dns: ", dns);
    });

    p.catch(console.error);
}

getZone(getDnsId);