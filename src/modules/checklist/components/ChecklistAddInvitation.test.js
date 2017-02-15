import React from 'react';
import{shallow, enzymeHelper} from '../../../util/testHelpers';
import ChecklistAddInvitation from './ChecklistAddInvitation';

function render() {
    return shallow(<ChecklistAddInvitation />);
}

describe('ChecklistAddInvitation', () => {
    it('should render tbody and tr', () => {
        enzymeHelper.findSingle(render(), 'tbody > tr');
    });

    it('should render expected number of columns', () => {
        const tds = enzymeHelper.find(render(), 'tbody > tr > td');
        expect(tds.length).toBe(3);
    });

    it('should render blank sequence number column', () => {
        const td = enzymeHelper.find(render(), 'tbody > tr > td').at(0);
        expect(td.text()).toEqual(' ');
    });

    it('should render blank status column', () => {
        const td = enzymeHelper.find(render(), 'tbody > tr > td').at(1);
        expect(td.text()).toEqual(' ');
    });

    it('should render invitation column', () => {
        const td = enzymeHelper.find(render(), 'tbody > tr > td').at(2);
        expect(td.hasClass('text-success'));

        expect(enzymeHelper.find(td, 'h4').at(0).text()).
            toEqual('This chat has no checklist items.');

        expect(enzymeHelper.find(td, 'h4').at(1).text()).
            toEqual('Use the "Add Checklist Item" button below to add one.');
    });
});
