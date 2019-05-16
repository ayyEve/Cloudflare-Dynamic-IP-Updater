const settings = require("../settings.json");
const cf = require('cloudflare') ({
    email: settings.email,
    key: settings.apiKey
});

function getZone() {
  const p = cf.zones.browse();

  p.then(t => {
    console.log("result:", t);

    // filter
    const i = t.result.filter((n) => {
      return n.name == settings.zoneName;
    });
    console.log("filtered:", i);

    // check
    if (i.length < 1) {
      return console.log("Please check the zoneName in settings.js");
    }

    // output
    zone = i[0];
    console.log(zone);
  });

  p.catch(console.error);
}

getZone();