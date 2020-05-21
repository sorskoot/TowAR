AFRAME.registerComponent('add-floor', {
    schema: {
        level: { default: 1 }
    },
    init: function () {
        this.create();
        this.el.addEventListener('click', (evt) => {
            const tower = document.querySelector('[tower]');
            const newFloorElement = document.createElement("a-entity");
            newFloorElement.setAttribute("floor", { level: this.data.level });
            tower.appendChild(newFloorElement);
            this.data.level++;
            this.update();
        });
    },

    create: function () {
        const addFloorElement = document.createElement("a-entity");
        addFloorElement.setAttribute("mixin", "addfloor");
        this.el.appendChild(addFloorElement);
    },

    update: function (oldData) {
        this.el.setAttribute("position",
            {
                x: this.el.object3D.position.x,
                y: this.data.level * 0.5,
                z: this.el.object3D.position.z
            })
    },

});