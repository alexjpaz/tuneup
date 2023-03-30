const generator = require("./chromatic");

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

        test('should have a chromatic scale', () => {
            expect(events[1].pitch[0]).toEqual("C1");
            //
            expect(events[1].pitch[12]).toEqual("C2");
            //
            expect(events[2].pitch[10]).toEqual("Db1");
            //
            expect(events[3].pitch).toEqual("C1");
        });


    });
});