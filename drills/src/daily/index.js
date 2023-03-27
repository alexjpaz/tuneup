
module.exports = function (manifest = {}) {
    manifest.drills = manifest.drills || {};
    manifest.drills.daily = manifest.drills.daily || {};
    manifest.drills.daily.items = manifest.drills.items || [];

    manifest.drills.daily.name = "Daily Guided Practice";

    manifest.drills.daily.items.push(require('./1 - bubble').invoke());

    manifest.drills.daily.items.push(require('./2 - bass hold').invoke());

    const majorScaleBaritone = require('./major-scale-baritone');
    
    manifest.drills.daily.items.push(majorScaleBaritone.invoke());
    
    const chromaticBaritone = require('./chromatic-baritone');
    
    manifest.drills.daily.items.push(chromaticBaritone.invoke());
    
    manifest.drills.daily.items.push(require("./octave-half").invoke()); 
    manifest.drills.daily.items.push(require("./octave-half-repeat").invoke());
    manifest.drills.daily.items.push(require("./octave-half-triple").invoke());
};
