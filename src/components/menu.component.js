AFRAME.registerComponent('menu', {
    schema: {},
    init: function () { 
        this.camera = document.querySelector("[camera]");
        let items = this.el.querySelector('[menu-item]');
        this.menuitems=[];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            element.addEventListener('tap',(e)=>{
                alert(e);
            })
        }
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) {         
        const position = this.camera.getAttribute("position");
        const rotation = this.camera.getAttribute("rotation");
        this.el.setAttribute("position",position);
        this.el.setAttribute("rotation",{y:rotation.y});
    },
    
});