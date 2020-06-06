AFRAME.registerComponent('dom-click', {
    schema: {
        element: {type: 'selector'},
        target: {type: 'selector'}
    },
    init: function () {
      this.data.element.addEventListener('click', ev => {
            this.data.target.emit('dom-click', ev)
      });
    }
  });