import expect from 'expect';
import format from './format';

function isoDateTime(timeStamp) {
    return `2016-12-30T${timeStamp}:00-06:00`;
}

describe('format.time', () => {
    [
        { timeStamp: isoDateTime('00:00'),  expected: '12:00 am' },
        { timeStamp: isoDateTime('03:15'),  expected: '3:15 am' },
        { timeStamp: isoDateTime('11:12'),  expected: '11:12 am' },
        { timeStamp: isoDateTime('14:57'),  expected: '2:57 pm' },
        { timeStamp: isoDateTime('23:59'),  expected: '11:59 pm' },
        { timeStamp: '9:00',                expected: '9:00' },
        { timeStamp: '9',                   expected: '9' },
        { timeStamp: '1:15',                expected: '1:15' },
        { timeStamp: '14:23',               expected: '14:23' },
        { timeStamp: null,                  expected: null },
        { timeStamp: undefined,             expected: '' },
        { timeStamp: '',                    expected: '' }
    ]
    .forEach(scenario => {
        it(`should format "${scenario.timeStamp}" as "${scenario.expected}"`, () => {
            expect(format.time(scenario.timeStamp)).toEqual(scenario.expected);
        });
    });
});
