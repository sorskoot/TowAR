AFRAME.registerComponent('ar-css-helper', {
    init: function () {
        this.el.sceneEl.addEventListener('enter-vr', (ev) => {
            if (this.el.sceneEl.is('ar-mode')) {
                document.body.classList.add("ar-mode");
            }
        });
        this.el.sceneEl.addEventListener('exit-vr', (ev) => {
            document.body.classList.remove("ar-mode");
        });
    }
});