const generator = require("./octave-swing");

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
        expect(events[1].pitch).toEqual(startNote);
    });

    test('should end with root note', () => {
        expect(events.slice(-1)[0].pitch[0]).toEqual(startNote);
    });

    test('should have end note in the scale', () => {
        const pitches = events.flatMap(e => e.pitch);

        expect(pitches).toEqual(expect.arrayContaining([ endNote ]));
    });

    test('should have an octave swing', () => {
        expect(events[1].pitch).toEqual("C1");
        expect(events[2].pitch).toEqual("C2");
        expect(events[3].pitch).toEqual("C1");
    });

    test('should call pushScaleSection', () => {
        expect(generator.pushScaleSection).toHaveBeenCalled();
        expect(events.length).toBe(9);
    });
});


