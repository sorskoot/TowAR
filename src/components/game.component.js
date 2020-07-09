AFRAME.registerComponent('game', {
    schema: {},
    init: function () {
        this.placedInAR = false;
        const hittester = document.getElementById('hit-test');
        hittester.addEventListener('hit-test-select', ({ detail }) => {
            if (!this.placedInAR) {
                const tower = document.getElementById('tower');
                tower.setAttribute("position", detail);
                tower.removeAttribute("hide-in-ar");
                hittester.remove();
                this.placedInAR = true;
            }
        });
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) { },
});