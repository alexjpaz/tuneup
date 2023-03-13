const fs = require('fs');

const manifest = {
  drills: {
    daily: {
      name: "Daily Guided Practice",
      items: []
    },
    ghost_intervals: {
      name: "Ghost Interval Practice",
      description: "Sing a root note and then find and hold the interval",
      items: []
    },
    other: {
      name: "foo",
    }
  },
};

const majorScaleBaritone = require('./daily/major-scale-baritone');

manifest.drills.daily.items.push(majorScaleBaritone.invoke());

const chromaticBaritone = require('./daily/chromatic-baritone');

manifest.drills.daily.items.push(chromaticBaritone.invoke());

require("./ghost-intervals")(manifest);

try {
  const path = `./output/manifest.js`
  fs.writeFileSync(path, JSON.stringify(manifest, null, 2));

  console.log("wrote ", path)
} catch (err) {
  console.error(err);
}
