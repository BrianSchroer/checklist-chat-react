import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import { options } from '../checklistItemStatus';
import ChecklistItemStatusIcon from './ChecklistItemStatusIcon';

describe('ChecklistItemStatusIcon', () => {
  const checklistItemStatusIcon = <ChecklistItemStatusIcon status="" />;
  const enzymeHelper = new EnzymeHelper(checklistItemStatusIcon);

  options.forEach(option => {
    it(`should render "i" element for checklistItemStatus.${
      option.value
    }`, () => {
      enzymeHelper.shallow({ status: option.value });
      enzymeHelper.findSingle('i');
    });
  });

  it('should render null for unexpected status', () => {
    enzymeHelper.shallow({ status: 'GARBAGE' });
    enzymeHelper.assertNoMatch('i');
  });
});
