AFRAME.registerComponent('hide-in-ar', {
    init: function () {
        this.enterVr = this.enterVr.bind(this);
        this.exitVr = this.exitVr.bind(this);
        this.el.sceneEl.addEventListener('enter-vr', this.enterVr);
        this.el.sceneEl.addEventListener('exit-vr', this.exitVr);
    },
    remove: function () {
        this.el.sceneEl.removeEventListener('enter-vr', this.enterVr);
        this.el.sceneEl.removeEventListener('exit-vr', this.exitVr);
        if (this.wasVisible) this.el.setAttribute('visible', true);
    },
    enterVr: function (ev) {
        this.wasVisible = this.el.getAttribute('visible');
        if (this.el.sceneEl.is('ar-mode')) {
            this.el.setAttribute('visible', false);
        };
    },
    exitVr: function (ev) {
        if (this.wasVisible) this.el.setAttribute('visible', true);
    }
});

AFRAME.registerComponent('show-in-ar', {
    init: function () {
        this.el.setAttribute('visible', false);
        this.el.sceneEl.addEventListener('enter-vr', (ev) => {
            if (this.el.sceneEl.is('ar-mode')) {
                this.el.setAttribute('visible', true);
            }
        });

        this.el.sceneEl.addEventListener('exit-vr', (ev) => {
            this.el.setAttribute('visible', false);
        });
    },
    remove: function () {
        this.el.setAttribute('visible', false);
    }
});









