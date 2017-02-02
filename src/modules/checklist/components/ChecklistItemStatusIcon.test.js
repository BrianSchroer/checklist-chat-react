import expect from 'expect';
import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import {options} from '../checklistItemStatus';
import ChecklistItemStatusIcon from './ChecklistItemStatusIcon';

describe('ChecklistItemStatusIcon', () => {
    options.forEach(option => {
        it(`should render "i" element for checklistItemStatus.${option.value}`, () => {
            enzymeHelper.findSingle(shallow(<ChecklistItemStatusIcon status={option.value} />), 'i');
        });
    });

    it('should render null for unexpected status', () => {
        const wrapper = shallow(<ChecklistItemStatusIcon status="GARBAGE" />);
        expect(wrapper.nodes[0]).toBe(null);
    });
});
