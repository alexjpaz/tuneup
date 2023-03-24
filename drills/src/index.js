const fs = require('fs');

const manifest = {
  drills: {
  },
};

[
  './daily',
  './ghost-intervals'
].forEach((r) => {
  require(r)(manifest);
});

try {
  const path = `./output/manifest.js`
  fs.writeFileSync(path, JSON.stringify(manifest, null, 2));

  console.log("wrote ", path)
} catch (err) {
  console.error(err);
}
