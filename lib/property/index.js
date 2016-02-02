'use strict'
var Observable = require('vigour-js/lib/observable')
var _set = Observable.prototype.set
var renderLoop = require('../element/loop')
// var Base = require('vigour-js/lib/base')
module.exports = new Observable({
  inject: [
    require('../util/context'),
    // require('../../lib/animation')
    require('../cases/inject'),
    require('../element/map')
  ],
  on: {
    // special listener on data from a reference
    data () {
      this.patch()
      // way to slow ofc
      // also need to remove -- just make this a special thing has to be ultra fast as well
      // this.on('data', this.patch, 'reflistener')
    }
  },
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
      // in set? check if ref then --->
      var changed = _set.apply(this, arguments)
      // if (changed) {
      //   this.patch()
      // }
      return changed
    }
  },
  properties: {
    isProp: { val: true },
    $: true,
    $collection: true,
    render (val) {
      // shouldnt this just get shit (data stuff)
      this.define({ render: val })
    }
  },
  Child: 'Constructor'
}).Constructor
