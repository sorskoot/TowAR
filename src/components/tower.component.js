AFRAME.registerComponent('tower', {
    schema: {
        currentLevel: { default: 0 }
    },
    init: function () {
        this.onDomClick = this.onDomClick.bind(this);
        this.el.sceneEl?.addEventListener('dom-click', this.onDomClick);
    },

    update: function (oldData) {
        const floors = this.el.querySelectorAll("[floor]");
        for (let i = 0; i < floors.length; i++) {
            const floorEl = floors[i];
            const level = +floorEl.getAttribute("data-level")
            const voxels = floorEl.querySelectorAll(".voxel");
            console.log(voxels.length);
            if (level > this.data.currentLevel) {
                voxels.forEach(v => v.setAttribute('transparent', 'isTransparent:true'))
            } else {
                voxels.forEach(v => v.setAttribute('transparent', 'isTransparent:false'))
            }
        }
    },
    onDomClick(e) {
        switch (e.detail.target.value) {

            case 'up':
                this.data.currentLevel++;
                this.update();
                break;
            case 'down':
                this.data.currentLevel--;
                this.update();
                break;
        }

    }
});