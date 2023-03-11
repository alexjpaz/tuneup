
const fs = require('fs');

const manifest = {
    drills: [],
};

const ghostIntervalAscending = require("./common/ghost-interval-ascending");
const ghostIntervalDescending = require("./common/ghost-interval-descending");

["M2", "M3", "P5", "M7", "M9"].forEach((interval) => {
    manifest.drills.push(ghostIntervalAscending.invoke({ interval }));
    manifest.drills.push(ghostIntervalDescending.invoke({ interval }));
});

try {
    const path = `./output/manifest.js`
    fs.writeFileSync(path, JSON.stringify(manifest, null, 2));

    console.log("wrote ", path)
} catch (err) {
    console.error(err);
}
