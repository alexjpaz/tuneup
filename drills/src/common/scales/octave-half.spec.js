const { createScale } = require("./octave-half");

test('create scale', () => {
    const scale = createScale("G4");

    expect(scale).toEqual([
        "G4",
        "B4",
        "D5",
        "G5",
    ]);
})