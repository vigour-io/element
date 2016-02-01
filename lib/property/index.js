'use strict'
var Observable = require('vigour-js/lib/observable')
var _set = Observable.prototype.set
var renderLoop = require('../element/loop')
// var Base = require('vigour-js/lib/base')
module.exports = new Observable({
  // inject: [
  //   // require('../../lib/animation')
  //   // require('../../lib/cases/inject')
  // ],
  define: {
    patch (cb) {
      var parent = this
      while (parent) {
        if (parent.renderTree) {
          renderLoop(parent, parent.uid, cb)
          return
        }
        parent = parent.parent
      }
    },
    set (val) {
      var changed = _set.apply(this, arguments)
      if (changed) {
        this.patch()
      }
      return changed
    }
  },
  properties: {
    $: true,
    $collection: true,
    render (val) {
      // shouldnt this just get shit (data stuff)
      this.define({ render: val })
    }
  },
  Child: 'Constructor'
}).Constructor
