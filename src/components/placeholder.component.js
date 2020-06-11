export default AFRAME.registerComponent('placeholder', {
    schema: {},
    init: function () {
        this.occupied = false;
        this.el.addEventListener('dom-click', (evt) => {
            this.el.parentElement.emit('placeholder-change', this.el.object3D.position);
        });
        this.el.addEventListener('click', (evt) => {
            this.el.parentElement.emit('placeholder-change', this.el.object3D.position);
        });
    },    
    update: function (oldData) { },
    tick: function (time, timeDelta) { },
    tock: function (time, timeDelta, camera) { },
    remove: function () { },
    pause: function () { },
    play: function () { },
    updateSchema: function (data) { }
});

