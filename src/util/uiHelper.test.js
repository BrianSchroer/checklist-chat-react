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
            const node = { scrollTop: 0, scrollHeight: 123 };
            uiHelper.scrollToBottom(node);

            expect(node.scrollTop).toEqual(node.scrollHeight);
        });

        it('should handle element not found', () => {
            uiHelper.scrollToBottom(undefined);
        });
    });

    describe('.setFocusToFirstInput', () => {
        it('should set focus to the expected element', () => {
            let wasFocused = false;
            const elem1 = {tagName: 'p'};

            const elem2 = {
                tagName: 'input', disabled: false, hidden: false, readonly: false,
                focus: () => wasFocused = true
            };

            const form = [elem1, elem2];

            const firstInput = uiHelper.setFocusToFirstInput(form);

            expect(wasFocused);
            expect(firstInput).toBe(elem2);
        });
    });

    describe('.setFocusToFirstInput', () => {
        it('should handle form not found', () => {
            const node = uiHelper.setFocusToFirstInput(undefined);
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
