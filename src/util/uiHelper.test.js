import expect from 'expect';
import uiHelper from './uiHelper';

describe('uiHelper', () => {

    describe('.afterRenderIsComplete', () => {
        it('should call window.requestAnimationFrame with callback', () => {
            const testCallback = () => {};

            const mockWindow = {
                passedCallback: undefined,
                requestAnimationFrame: function(cb) { this.passedCallback = cb; }
            };

            uiHelper.afterRenderIsComplete(testCallback, mockWindow);
            expect(mockWindow.passedCallback).toBe(testCallback);
        });
    });

    describe('.scrollToBottom', () => {
        it('should set .scrollTop to .scrollHeight', () => {
            const elem = { scrollTop: 0, scrollHeight: 123 };
            const mockDoc = { getElementById: () => elem };

            uiHelper.scrollToBottom('testId', mockDoc);

            expect(elem.scrollTop).toEqual(elem.scrollHeight);
        });

        it('should handle element not found', () => {
            const mockDoc = { getElementById: () => undefined };
            uiHelper.scrollToBottom('testId', mockDoc);
        });
    });

    describe('.setFocusToFirstInputInForm', () => {
        it('should set focus to the expected element', () => {
            let wasFocused = false;
            const elem1 = {tagName: 'p'};

            const elem2 = {
                tagName: 'input', disabled: false, hidden: false, readonly: false,
                focus: () => wasFocused = true
            };

            const form = [elem1, elem2];

            const mockDoc = {getElementById: () => form};

            const firstInput = uiHelper.setFocusToFirstInputInForm('testFormId', mockDoc);
            expect(wasFocused);
            expect(firstInput).toBe(elem2);
        });
    });

    describe('.setFocusToFirstInputInForm', () => {
        it('should handle form not found', () => {
            const mockDoc = { getElementById: () => undefined };
            const node = uiHelper.setFocusToFirstInputInForm('testFormId', mockDoc);
            expect(node).toBe(null);
        });
    });

    describe('.isFocusableInput', () => {
        [
            { elem: {tagName: 'INPUT', disabled: false, hidden: false, readonly: false}, expected: true },
            { elem: {tagName: 'input', disabled: false, hidden: false, readonly: false}, expected: true },
            { elem: {tagName: 'select', disabled: false, hidden: false, readonly: false}, expected: true },
            { elem: {tagName: 'textarea', disabled: false, hidden: false, readonly: false}, expected: true },

            { elem: {tagName: 'input', disabled: true, hidden: false, readonly: false}, expected: false },
            { elem: {tagName: 'select', disabled: true, hidden: false, readonly: false}, expected: false },
            { elem: {tagName: 'textarea', disabled: true, hidden: false, readonly: false}, expected: false },

            { elem: {tagName: 'input', disabled: false, hidden: true, readonly: false}, expected: false },
            { elem: {tagName: 'select', disabled: false, hidden: true, readonly: false}, expected: false },
            { elem: {tagName: 'textarea', disabled: false, hidden: true, readonly: false}, expected: false },

            { elem: {tagName: 'input', disabled: false, hidden: false, readonly: true}, expected: false },
            { elem: {tagName: 'select', disabled: false, hidden: false, readonly: true}, expected: false },
            { elem: {tagName: 'textarea', disabled: false, hidden: false, readonly: true}, expected: false }
        ]
        .forEach(scenario => {
            it(`should return ${scenario.expected} for ${JSON.stringify(scenario.elem)}`, () => {
                expect(uiHelper.isFocusableInput(scenario.elem)).toBe(scenario.expected);
            });
        });
    });
});
