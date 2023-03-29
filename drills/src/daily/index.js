
module.exports = function (manifest = {}) {
    manifest.drills = manifest.drills || {};
    manifest.drills.daily = manifest.drills.daily || {};
    manifest.drills.daily.items = manifest.drills.items || [];

    manifest.drills.daily.name = "Daily Guided Practice";

    var normalizedPath = require("path").join(__dirname, "./");

    require("fs").readdirSync(normalizedPath).forEach(function(file) {
        const mod = require('./'+file);

        if(mod.invoke) {
            manifest.drills.daily.items.push(mod.invoke());
        }
    });



    return ;

    const majorScaleBaritone = require('./8 - interval identification');
    
    manifest.drills.daily.items.push(majorScaleBaritone.invoke());
    
    const chromaticBaritone = require('./3 - bass gug');
    
    manifest.drills.daily.items.push(chromaticBaritone.invoke());
    
    manifest.drills.daily.items.push(require("./octave-half").invoke()); 
    manifest.drills.daily.items.push(require("./ Nay").invoke());
    manifest.drills.daily.items.push(require("./octave-half-triple").invoke());
};
