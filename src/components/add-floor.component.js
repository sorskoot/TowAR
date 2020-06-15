AFRAME.registerComponent('add-floor', {
    schema: {
        level: { default: 1 }
    },
    init: function () {
        this.el.addEventListener('dom-click', (evt) => {
            const tower = document.querySelector('[tower]');
            const newFloorElement = document.createElement("a-entity");
            newFloorElement.setAttribute("floor", `level: ${this.data.level}`);
            newFloorElement.setAttribute("data-level",this.data.level);
            tower.appendChild(newFloorElement);       
            tower.setAttribute('tower',`currentLevel:${this.data.level}`);            
            tower.components['tower'].update();
            this.data.level++;           
        });
    }

});