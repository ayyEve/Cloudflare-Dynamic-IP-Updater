const settings = require("../settings.json");
const cf = require('cloudflare') ({
  email: settings.email,
  key: settings.apiKey
});

function getZone() {
    const p = cf.zones.browse();
    let zone = null;

    p.then(t => {
        console.log("reply: ", t);

        // filter
        const i = t.result.filter((n) => {return n.name==settings.domain});
        console.log("filtered zones: ", i);

        // check
        if (i.length < 1) return console.log("Please check the domain in settings.js");

        // get
        zone = i[0].id;
        console.log("selected zone: ", zone);
    });
    p.catch(console.error);
}

getZone();