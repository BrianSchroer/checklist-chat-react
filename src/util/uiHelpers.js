export function afterRenderIsComplete(callback) {
    window.requestAnimationFrame(callback);
}

export function scrollToBottom(elementId) {
    const node = document.getElementById(elementId);
    if (node) {
        node.scrollTop = node.scrollHeight;
    }
}
