'use strict'
var Property = require('./')
var Event = require('vigour-js/lib/event')

// how to solve this
exports.properties = {
  rendered: new Property({
    render (node, event, element) {
      // if (!node._rendered) {
      //   let engine = element.engine
      //   let path = element.path
      //   window.requestAnimationFrame(function () {
      //     // let rendered = engine.get(path)

      //     engine.cleanContextPath(path)
      //   })
      //   node._rendered = true
      // }
    }
  })
}
