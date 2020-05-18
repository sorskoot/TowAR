export default AFRAME.registerComponent('placeholder', {
    schema: {},
    init: function () {
        this.occupied = false;
        this.el.addEventListener('click', (evt) => {
            //lastIndex = (lastIndex + 1) % COLORS.length;
            //this.setAttribute('material', 'color', COLORS[lastIndex]);
            //console.log('I was clicked at: ', evt.detail.intersection.point);
            this.el.innerHTML = '';
            const entity = document.createElement("a-entity");
            if (this.occupied) {
                this.occupied = false;                
                entity.setAttribute("mixin", "placeholder");
            } else {
                entity.setAttribute("mixin", "room0");
                this.occupied = true;
            }
            this.el.appendChild(entity);
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

