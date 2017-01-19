export function afterRenderIsComplete(callback) {
    window.requestAnimationFrame(callback);
}

export function scrollToBottom(elementId) {
    const node = document.getElementById(elementId);
    if (node) {
        node.scrollTop = node.scrollHeight;
    }
}

export function setFocusToFirstInputInForm(formId) {
    const form = document.getElementById(formId);

    if (form) {
        let firstInput = null;

        for (let child of form) {
            if (isFocusableInput(child)) {
                firstInput = child;
                break;
            }
        }

        if (firstInput) {
            firstInput.focus();
        }
    }
}

function isFocusableInput(elem) {
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
