const { interval } = require("tonal");
const ghostIntervalAscending = require("../common/ghost-interval-ascending");
const ghostIntervalDescending = require("../common/ghost-interval-descending");


["M2", "M3", "P5", "M7", "M9"].forEach((interval) => {
    ghostIntervalAscending.invoke({ interval });
    ghostIntervalDescending.invoke({ interval });
});