AFRAME.registerComponent('floor', {
    schema: {
        width: { default: 7 },
        depth: { default: 7 }
    },
    init: function () {
        this.createFloor();
    },
    update: function (oldData) { },

    createFloor() {
        for (let x = 0; x < this.data.width; x++) {
            for (let z = 0; z < this.data.depth; z++) {
                const container = document.createElement("a-entity");
                const placeholder = document.createElement("a-entity");
                placeholder.setAttribute("mixin", "placeholder");
                container.setAttribute("placeholder", "");
                container.appendChild(placeholder);

                const xpos = (this.el.object3D.position.x -
                    (this.data.width / 2.0) + x);
                const zpos = this.el.object3D.position.z -
                    (this.data.depth / 2.0) + z;
                
                    container.setAttribute("position", {
                    x: xpos,
                    y: this.el.object3D.position.y,
                    z: zpos
                });
                this.el.appendChild(container);
            }
        }
    }
});