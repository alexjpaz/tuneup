const generator = require("./bubble");

beforeEach(() => {
    jest.spyOn(generator, 'pushScaleSection');
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('bubble', () => {
    describe('createScale', () => {

        let events;
        let startNote = "C1";
        let endNote = "C2";

        beforeEach(() => {
            events = generator.createScale(startNote, endNote);
        });

        test('should begin with root note', () => {
            expect(events[1].pitch[0]).toEqual(startNote);
        });

        test('should end with root note', () => {
            expect(events.slice(-2)[0].pitch).toEqual(startNote);
        });

        test('should have end note in the scale', () => {
            const pitches = events.flatMap(e => e.pitch);

            expect(pitches).toEqual(expect.arrayContaining([endNote]));
        });

        test('should have an octave repeat scale', () => {
            expect(events[1].pitch).toEqual([
                "C1",
                "E1",
                "G1",
                "C2",
                "E2",
                "G2",
                "F2",
                "D2",
                "B1",
                "G1",
                "F1",
                "D1",
            ]);
        });


    });
});