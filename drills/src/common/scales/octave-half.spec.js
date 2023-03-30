const generator = require("./octave-half");


beforeEach(() => {
    jest.spyOn(generator, 'pushScaleSection');
});

afterEach(() => {    
    jest.clearAllMocks();
});

describe('createScale', () => {

    let startNote = "C1";
    let endNote = "C2";

    beforeEach(() => {
        events = generator.createScale(startNote, endNote);
    });

    test('should begin with root note', () => {
        expect(events[0].pitch).toEqual(startNote);
    });

    test('should end with root note', () => {
        expect(events.slice(-1)[0].pitch[0]).toEqual(startNote);
    });

    test('should have end note in the scale', () => {
        const pitches = events.flatMap(e => e.pitch);

        expect(pitches).toEqual(expect.arrayContaining([endNote]));
    });

    test('should have an octave repeat scale', () => {
        expect(events[1].pitch).toEqual([
            "C1", "E1", "G1", "C2",
        ]);
    });

    test('should call pushScaleSection', () => {
        expect(generator.pushScaleSection).toHaveBeenCalled();
        expect(events.length).toBe(17);
    });
});


