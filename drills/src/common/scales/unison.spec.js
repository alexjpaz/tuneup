const { createScale } = require("./unison");

test('create scale', () => {
    const scale = createScale("E2", "E4");
    
    expect(scale[0]).toEqual({
        duration: [ "2" ],
        pitch: [
            "E2",
            "G2",
            "B2"
        ],
        velocity: "100",
        sequential: false,
    });
    
    expect(scale[1]).toEqual({
        duration: "2",
        pitch: "E2",
        velocity: "100",
    });

    expect(scale.slice(-2)[0]).toEqual({
        duration: "2",
        pitch: "E4",
        velocity: "100",
    });

    expect(scale.slice(-1)[0]).toEqual({
        duration: [ "1", "1" ],
        pitch: [
            "E4",
            "G#4",
            "B4"
        ],
        velocity: "100",
        sequential: false,
    });
})