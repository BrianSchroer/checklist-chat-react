import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import enzymeHelper from '../util/enzymeHelper';
import TimeStamp from './TimeStamp';

function renderWith(props) {
    return shallow(<TimeStamp {...props}/>);
}

function renderedTimeStamp(props) {
    return enzymeHelper.findSingle(renderWith(props), 'span').text();
}

describe('TimeStamp', () => {
    [
        { timeStamp: '00:00', expected: '12:00 am' },
        { timeStamp: '03:15', expected: '3:15 am' },
        { timeStamp: '11:12', expected: '11:12 am' },
        { timeStamp: '14:57', expected: '2:57 pm' },
        { timeStamp: '23:59', expected: '11:59 pm' }
    ]
    .forEach(scenario => {
        it(`should properly render ${scenario.timeStamp}`, () => {
            const props = {
                timeStamp: `2016-12-08 ${scenario.timeStamp}:00`
            };

            expect(renderedTimeStamp(props)).toBe(scenario.expected);
        });

    });
});
