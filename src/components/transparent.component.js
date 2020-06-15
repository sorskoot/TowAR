AFRAME.registerComponent('transparent', {
    schema: {
        isTransparent: { default: true }
    },
    init: function () {
    },

    update: function (oldData) {
        var mesh = this.el.getObject3D('mesh');
        mesh.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material.transparent = this.data.isTransparent;
                child.material.opacity = this.data.isTransparent ? 0.2: 1;                
            }
        });      
    },

    tick: function (time, timeDelta) { },
    tock: function (time, timeDelta, camera) { },
    remove: function () {

    },

    pause: function () { },
    play: function () { },
    updateSchema: function (data) { }
});