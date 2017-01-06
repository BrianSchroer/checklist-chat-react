export function afterRenderIsComplete(callback) {
    window.requestAnimationFrame(callback);
}
