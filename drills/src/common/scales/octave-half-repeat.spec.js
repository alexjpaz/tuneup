const { createScale } = require("./octave-half-repeat");

test('create scale', () => {
    const scale = createScale("G4");

    expect(scale).toEqual([
        "G4",
        "B4",
        "D5",
        "G5",
        "G5",
        "G5",
    ]);
})

test('create scale and repeat n times', () => {

    const repeat = 10

    const scale = createScale("G4", 10);

    const count = scale
        .filter(i => i === "G5")
        .length;

    expect(count).toBe(10);
})