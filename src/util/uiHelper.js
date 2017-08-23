export default class {

    /**
     * Perform callback function after window render is complete
     *
     * @export
     * @param {any} callback
     * @param {any} [win=window] (for unit testing)
     */
    static afterRenderIsComplete(callback, win = window) {
        win.requestAnimationFrame(callback);
    }

    static scrollToBottom(node) {
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
    }

    static setFocusToFirstInput(node) {
        let firstInput = null;

        if (node) {
            for (let child of node) {
                if (this.isFocusableInput(child)) {
                    firstInput = child;
                    break;
                }
            }

            if (firstInput) {
                firstInput.focus();
            }
        }

        return firstInput;
    }

    static isFocusableInput(elem) {
        let meetsCriteria = false;

        switch (elem.tagName.toLowerCase()) {
            case 'input':
            case 'select':
            case 'textarea':
                meetsCriteria = !elem.disabled && !elem.hidden && !elem.readonly;
                break;
        }

        return meetsCriteria;
    }
}
