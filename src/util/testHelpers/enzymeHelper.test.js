import expect from 'expect';
import React from 'react';
import enzymeHelper from './enzymeHelper';
import {shallow} from 'enzyme';
import Header from '../../../src/modules/header/components/Header';

describe('enzymeHelper', () => {
    describe('.assertFindCount', () => {
        it('should fail with expected message when counts differ', () => {
            try {
               enzymeHelper.assertFindCount(1, shallow(<Header />), 'badSelector');
               throw('Expected error was not thrown.');
            } catch (error) {
                expect(error.message).toContain(
                    'Expected 1 find for selector "badSelector", but found 0.');
            }
        });
    });
});
