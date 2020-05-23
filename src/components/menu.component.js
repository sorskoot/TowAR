AFRAME.registerComponent('menu', {
    schema: {},
    init: function () { 
        this.camera = document.querySelector("[camera]");
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) {         
        const position = this.camera.getAttribute("position");
        const rotation = this.camera.getAttribute("rotation");
        this.el.setAttribute("position",position);
        this.el.setAttribute("rotation",{y:rotation.y});
    },
    
});