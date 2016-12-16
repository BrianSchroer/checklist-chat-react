import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import enzymeHelper from '../util/enzymeHelper';
import PlannedVsActual from './PlannedVsActual';

function renderWith(props) {
    return shallow(<PlannedVsActual {...props}/>);
}

describe('PlannedVsActual', () => {
    [
        { planned: 'abc', actual: null, plannedClass: 'planned-value', actualClass: 'actual-value-missing' },
        { planned: 'abc', actual: undefined, plannedClass: 'planned-value', actualClass: 'actual-value-missing' },
        { planned: 'abc', actual: '', plannedClass: 'planned-value', actualClass: 'actual-value-missing' },
        { planned: 'abc', actual: 'abc', plannedClass: 'planned-value-accurate', actualClass: 'actual-equals-planned' },
        { planned: 'abc', actual: 'xyz', plannedClass: 'planned-value-inaccurate', actualClass: 'actual-value' },
        { planned: null, actual: 'abc', plannedClass: 'planned-value-missing', actualClass: 'actual-value' },
        { planned: undefined, actual: 'abc', plannedClass: 'planned-value-missing', actualClass: 'actual-value' },
        { planned: '', actual: 'abc', plannedClass: 'planned-value-missing', actualClass: 'actual-value' },
        { planned: null, actual: null, plannedClass: 'planned-value-missing', actualClass: 'actual-value-missing' },
        { planned: null, actual: undefined, plannedClass: 'planned-value-missing', actualClass: 'actual-value-missing' },
        { planned: null, actual: '', plannedClass: 'planned-value-missing', actualClass: 'actual-value-missing' },
        { planned: undefined, actual: null, plannedClass: 'planned-value-missing', actualClass: 'actual-value-missing' },
        { planned: undefined, actual: undefined, plannedClass: 'planned-value-missing', actualClass: 'actual-value-missing' },
        { planned: undefined, actual: '', plannedClass: 'planned-value-missing', actualClass: 'actual-value-missing' },
        { planned: '', actual: null, plannedClass: 'planned-value-missing', actualClass: 'actual-value-missing' },
        { planned: '', actual: undefined, plannedClass: 'planned-value-missing', actualClass: 'actual-value-missing' },
        { planned: '', actual: '', plannedClass: 'planned-value-missing', actualClass: 'actual-value-missing' }
    ]
    .forEach(scenario => {
        it('should render expected HTML for '
            + `planned: "${scenario.planned}", actual: "${scenario.actual}"`, () => {

            const props = {planned: scenario.planned, actual: scenario.actual};

            const outerDiv = enzymeHelper.findSingle(renderWith(props), 'div.planned-vs-actual');

            const plannedDiv = enzymeHelper.findSingle(outerDiv, `div.${scenario.plannedClass}`);
            expect(plannedDiv.text()).toEqual(normalize(scenario.planned));

            const actualDiv = enzymeHelper.findSingle(outerDiv, `div.${scenario.actualClass}`);
            expect(actualDiv.text()).toEqual(normalize(scenario.actual));
        });
    });
});

function normalize(value = '') {
    if (value) {
        return value;
    }

    return '';
}
