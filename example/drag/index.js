require('vigour-scratch/index.less')
require('./style.less')

var App = require('../../lib/app')
var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/transform'),
  require('../../lib/property/draggable'),
  require('../../lib/events/down')
)

var thing = window.thing = new Element({
  // draggable: true,
  css: 'teste',
  on: {
    down: {
      setX: {
        x: 100
      }
    },

    // up:function(){
    //   console.log('up')
    // },

    // dragstart: function (e, event) {
    //   this.set ({
    //     css: {
    //       removeClass: 'move'
    //     }
    //   })
    // },

    // click: function (e, event) {
    //   this.set({
    //     css: {
    //       toggleClass: 'blue'
    //     }
    //   })
    // },

  // dragend: function (e, event){
  //   this.set({
  //     x: event.startX,
  //     y: event.startY,
  //     css: {
  //       addClass: 'move'
  //     }
  //   })
  // }
  }
})

var app = new App({
  node:document.body,
  hello: new thing.Constructor()
})
