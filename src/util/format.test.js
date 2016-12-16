import expect from 'expect';
import format from './format';

describe('format', () => {
    describe('format.time', () => {
        [
            { timeStamp: '00:00', expected: '12:00 am' },
            { timeStamp: '03:15', expected: '3:15 am' },
            { timeStamp: '11:12', expected: '11:12 am' },
            { timeStamp: '14:57', expected: '2:57 pm' },
            { timeStamp: '23:59', expected: '11:59 pm' }
        ]
        .forEach(scenario => {
            it(`should format "${scenario.timeStamp}" as "${scenario.expected}"`, () => {
                const dateString = `2016-12-08 ${scenario.timeStamp}:00`;
                expect(format.time(dateString)).toEqual(scenario.expected);
            });

        });
    });
});
