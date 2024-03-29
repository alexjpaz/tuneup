const { Scale } = require("tonal");
const generator = require("./siren");

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
            expect(events[1].pitch).toEqual(startNote);
        });

        test('should end with root note', () => {
            expect(events.slice(-2)[0].pitch).toEqual(startNote);
        });

        test('should have end note in the scale', () => {
            const pitches = events.flatMap(e => e.pitch);

            expect(pitches).toEqual(expect.arrayContaining([endNote]));
        });

        test('should have an octave repeat scale', () => {
            expect(events[4].pitch).toEqual(Scale.get("C1 major").notes);
        })


    });
});