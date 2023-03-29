
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

    /*
     refs https://github.com/alexjpaz-playground/habits/blob/main/src/singing/data.js
     { label: "1. Bubble, VVV, Puffycheeks, Raspberry", value: "Bubble.mp3" },
      { label: "2. Bass Hold", value: "nebula_scales/bass/Unison - E2 to E4 - Bass.mp3" },
      { label: "3. Bass Gug", value: "nebula_scales/bass/Standard Octave Chromatic - E2 to E4 - Bass.mp3" },
      { label: "4. Mum", value: "nebula_scales/tenor/Arpeggio Octave Major - C3 to C5 - Tenor.mp3" },
      { label: "5. Bub", value: "nebula_scales/baritone/Pentatonic 12th Major - G2 to G4 - Baritone.mp3" },
      { label: "6. Bup", value: "nebula_scales/baritone/Circular 5th Major - D3 to G4 - Baritone.mp3" },
      { label: "7. Nnng-EE-Mmm", value: "nebula_scales/tenor/Circular 5th Minor - G3 to C5 - Tenor.mp3" },
      { label: "8. Nnng-Ayy (Tenor Passagio)", value: "nebula_scales/baritone/Pentatonic 12th Minor - G2 to G4 - Baritone.mp3" },
      { label: "9. Gug", value: "nebula_scales/tenor/Standard Octave Chromatic - C3 to C5 - Tenor.mp3" },
      { label: "10. Goo/Koo", value: "nebula_scales/tenor/Arpeggio Octave Minor - C3 to C5 - Tenor.mp3" },
      { label: "11. Siren Baritone", value: "nebula_scales/baritone/Siren Octave Major - G2 to G4 - Baritone.mp3" },
      { label: "12. Siren Tenor", value: "nebula_scales/tenor/Siren Octave Major - C3 to C5 - Tenor.mp3" },
      { label: "13. Hold Vowels", value: "nebula_scales/baritone/Unison - G2 to G4 - Baritone.mp3" },
      { label: "14. Interval Training", value: "BaritonIntervalTraining.ogg" },
      { label: "15. Cooldown - Bubble, VVV, Puffycheeks, Raspberry", value: "nebula_scales/tenor/Unison - C3 to C5 - Tenor.mp3" },
    */
};
