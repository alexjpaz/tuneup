const fs = require('fs');

const manifest = {
  drills: {
    daily: {
      name: "Daily Guided Practice",
      items: []
    },
    intervals: {
      name: "Interval Practice",
      items: []
    },
    other: {
      name: "foo",
    }
  },
};

const majorScaleBaritone = require('./daily/major-scale-baritone');

manifest.drills.daily.items.push(majorScaleBaritone.invoke());

const ghostIntervalAscending = require("./common/ghost-interval-ascending");
const ghostIntervalDescending = require("./common/ghost-interval-descending");

["M2", "M3", "P5", "M7", "M9"].forEach((interval) => {
  manifest.drills.intervals.items.push(ghostIntervalAscending.invoke({ interval }));
  manifest.drills.intervals.items.push(ghostIntervalDescending.invoke({ interval }));
});

try {
  const path = `./output/manifest.js`
  fs.writeFileSync(path, JSON.stringify(manifest, null, 2));

  console.log("wrote ", path)
} catch (err) {
  console.error(err);
}
