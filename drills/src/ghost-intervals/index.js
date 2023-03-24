const ghostIntervalAscending = require("./ghost-interval-ascending");
const ghostIntervalDescending = require("./ghost-interval-descending");

const intervals = {
  "m2": { ascending: "do-ra / O-Can[-ada]",       descending: "ra-do / Joy to [the world]" },
  "M2": { ascending: "do-re / Jaws (theme)",  descending: "re-do / Yes-ter[-day]"  },
  "m3": { ascending: "do-me / O Can-[ada]",  descending: "me-do / Hey Jude / Fros-ty [the snowman]" },
  "M3": { ascending: "do-mi / Oh, when [the saints]",  descending: "mi-do / Swing low, [sweet chariot"},
  "P4": { ascending: "do-fa / A-Maz [-ing grace]",  descending: "fa-do / [O] come all [ye faithful]" },
  "P5": { ascending: "do-sol / Twinkle, Twinkle", descending: "sol-do / Flint-stones [, meet the]" },
  "m6": { ascending: "do-le / [Where do] I be-[gin]",  descending: "le-do / Where do [I begin]" },
  "M6": { ascending: "do-la / Dash-ing [through the snow]",  descending: "la-do / No-body [know the trouble]" },
  "m7": { ascending: "do-te / Star Trek (theme)",  descending: "te-do" },
  "M7": { ascending: "do-ti / Some-where [over the rainbow] / Take on Me",  descending: "ti-do" },
  "P8": { ascending: "do-do / Some-where [over the rainbow]", descending: "do-do / [Peace] on-the [Earth]" },
}

module.exports = (manifest) => {

  manifest.drills = manifest.drills || {};
  manifest.drills.ghost_intervals = manifest.drills.ghost_intervals || {};
  manifest.drills.ghost_intervals.items = manifest.drills.ghost_intervals.items || [];

  manifest.drills.ghost_intervals.name = "Ghost Interval Practice";
  manifest.drills.ghost_intervals.description = "Sing a root note and then find and hold the interval";

  Object.keys(intervals).forEach((interval) => {
    const ascending = ghostIntervalAscending.invoke({ interval });
    ascending.description = intervals[interval].ascending;

    manifest.drills.ghost_intervals.items.push(ascending);

    const descending = ghostIntervalDescending.invoke({ interval });
    descending.description = intervals[interval].descending;

    manifest.drills.ghost_intervals.items.push(descending);
  });

};