'use strict'
var Observable = require('vigour-js/lib/observable')
var Base = require('vigour-js/lib/base')
var Property = require('../property')
var Element = require('../')

// var VideoProperty = new Property({
//   properties: {
//     render (fn) {
//       this.define({
//         render (val) {
//           if (this.parent.ready.val) {
//             fn.apply(this, arguments)
//           }
//         }
//       })
//     }
//   }
// }).Constructor

module.exports = new Element({
  properties: {
    ready: new Property({
      render (val) {
        if (val) {
          this.parent.each((prop, key) => {
            if (key !== 'ready') {
              prop.render.apply(prop, arguments)
            }
          })
        }
      }
    }),
    play: new Property({
      properties: {
        render (fn) {
          this.define({
            render (val) {
              if (this.parent.ready.val) {
                // do the interval stuff


                // then call the render
                fn.apply(this, arguments)
              }
            }
          })
        }
      }
    })
  }
}).Constructor

// sbs player
module.exports = new Element({
  properties: {
    src: new Property(),
    time: new Property(),
    volume: new Property(),
    duration: new Property()
  }
})
