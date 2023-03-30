const generator = require("./pentatonic-major");

beforeEach(() => {
    jest.spyOn(generator, 'pushScaleSection');
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('pentatonic', () => {
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

        test('should have a pentatonic major 12th scale', () => {
            expect(events[1].pitch[0]).toEqual("C1");
            //
            expect(events[1].pitch.slice(0).pop()).toEqual("G2");
            //
            expect(events[2].pitch[0]).toEqual("E2");
            //
            expect(events[2].pitch.slice(0).pop()).toEqual("D1");
        });


    });
});