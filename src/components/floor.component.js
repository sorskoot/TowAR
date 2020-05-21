AFRAME.registerComponent('floor', {
    schema: {
        width: { default: 7 },
        depth: { default: 7 },
        level: { default: 0 }
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
                if(x==3 && z == 3){
                    placeholder.setAttribute("mixin", "elevator");
                }else{
                    placeholder.setAttribute("mixin", "placeholder");
                    container.setAttribute("placeholder", "");
                }
                container.appendChild(placeholder);

                const xpos = (this.el.object3D.position.x -
                    (this.data.width / 2.0) + x);
                const zpos = this.el.object3D.position.z -
                    (this.data.depth / 2.0) + z;
                
                    container.setAttribute("position", {
                    x: xpos+.5,
                    y: this.el.object3D.position.y + this.data.level * .5,
                    z: zpos+.5
                });
                this.el.appendChild(container);
            }
        }
    }
});