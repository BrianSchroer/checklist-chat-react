import assert from 'assert';
import React from 'react';
import {expect, shallow, enzymeHelper} from '../testHelpers';
import Header from '../../../src/modules/header/components/Header';

describe('enzymeHelper', () => {
    describe('.assertFindCount', () => {
        it('should fail with expected message when counts differ', () => {
            try {
               enzymeHelper.assertFindCount(1, shallow(<Header />), 'badSelector');
            } catch (error) {
                expect(error.message).toContain(
                    'Expected 1 element(s) for selector "badSelector", but found 0.');
                return;
            }

            assert(null, null, 'Expected error was not thrown.');
        });
    });
});
