const settings = require("../settings.json");
const cf = require('cloudflare') ({
  email: settings.email,
  key: settings.apiKey
});

let zone = null;
let dns = null;
let ip = "1.1.1.1";

function getZone(then) {
    const p = cf.zones.browse();
    p.then(t => {
        const i = t.result.filter((n) => {return n.name==settings.domain});
        zone = i[0].id;
        if (then) then();
    });
    p.catch(console.error);
}

function getDnsId(then) {
    const p = cf.dnsRecords.browse(zone)
    p.then(x => {
        const i = x.result.filter((n) => {return (n.name==settings.domain && n.type == "A")});
        dns = i[0].id;
        if (then) then();
    });
    p.catch(console.error);
}

function update() {
    const p = cf.dnsRecords.read(zone, dns);
    p.then(x => {
        console.log("response:", x);
        
        x = x.result;
        console.log("result: ", x);
    
        console.log("content before: ", x.content);
        x.content = ip;
        console.log("content after:", x.content);

        const p2 = cf.dnsRecords.edit(zone, dns, x);
        console.log("after edit: ");
        p2.then(console.log);
        p2.catch(console.error);
    });

    p.catch(console.error);
}

getZone(() => {
    getDnsId(()=> {
        update();
    });
});