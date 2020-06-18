export default AFRAME.registerComponent('placeholder', {
    schema: {},
    init: function () {
        this.occupied = false;
        this.el.addEventListener('dom-click', (evt) => {
            this.el.parentElement.emit('placeholder-change', {x:this.el.object3D.position.x,z:this.el.object3D.position.z, src:this.el});
        });
        this.el.addEventListener('click', (evt) => {
            this.el.parentElement.emit('placeholder-change', {x:this.el.object3D.position.x,z:this.el.object3D.position.z, src:this.el});
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

