import { format } from '../util';

function isoDateTime(timeStamp) {
  return `2016-12-30T${timeStamp}:00-06:00`;
}

describe('format.time', () => {
  [
    { timeStamp: isoDateTime('00:00'), expected: '12:00 am' },
    { timeStamp: isoDateTime('03:15'), expected: '3:15 am' },
    { timeStamp: isoDateTime('11:12'), expected: '11:12 am' },
    { timeStamp: isoDateTime('14:57'), expected: '2:57 pm' },
    { timeStamp: isoDateTime('23:59'), expected: '11:59 pm' },
    { timeStamp: '9:00', expected: '9:00' },
    { timeStamp: '9', expected: '9' },
    { timeStamp: '1:15', expected: '1:15' },
    { timeStamp: '14:23', expected: '14:23' },
    { timeStamp: null, expected: null },
    { timeStamp: undefined, expected: '' },
    { timeStamp: '', expected: '' }
  ].forEach(scenario => {
    it(`should format "${scenario.timeStamp}" as "${
      scenario.expected
    }"`, () => {
      expect(format.time(scenario.timeStamp)).toEqual(scenario.expected);
    });
  });
});

describe('format.isoDateTimeString', () => {
  [
    {
      input: '2017-11-30T10:30:59-06:00',
      expected: '2017-11-30T16:30:59.000Z'
    },
    {
      input: 'Fri Dec 01 2017 09:28:53 GMT-0600 (Central Standard Time)',
      expected: '2017-12-01T15:28:53.000Z'
    },
    {
      input: '1/23/2017 8:00 AM',
      expected: '2017-01-23T14:00:00.000Z'
    }
  ].forEach(scenario => {
    it(`should format "${scenario.input}" as "${scenario.expected}"`, () => {
      expect(format.isoDateTimeString(scenario.input)).toEqual(
        scenario.expected
      );
    });
  });
});
