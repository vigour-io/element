'use strict'
var Observable = require('vigour-js/lib/observable')
var renderLoop = require('../element/loop')
var Event = require('vigour-js/lib/event')

module.exports = new Observable({
  inject: [
    require('../util/context'),
    require('./animate'),
    require('../cases/inject'),
    require('../element/map')
  ],
  on: {
    data: {
      patch (data, event) {
        var parent = this
        while (parent) {
          if (!parent._datarender) {
            parent._lstamp = event.stamp
          } else {
            break;
          }
          parent = parent._parent
        }
        this.patch()
      }
    }
  },
  define: {
    compare (property, data, props, children, current, prev) {
      let key = property.key
      if (prev && prev.vnode && property.dom) {
        let stamp = property.$ && data ? data._lstamp : property._lstamp
        if (prev.state.props && prev.state.props[key] == stamp) {
          props[property.dom] = prev.vnode.properties[property.dom]
          if (!current.state.props) {
            current.state.props = prev.state.props
          }
          return true
        }
      }
      if (!current.state.props) {
        current.state.props = {}
      }
      current.state.props[key] = property.$ && data ? data._lstamp : property._lstamp
    },
    patch (cb) {
      var parent = this
      while (parent) {
        if (parent.renderTree) {
          renderLoop(parent, parent.uid, cb)
          return
        }
        parent = parent.parent
      }
    }
  },
  properties: {
    _lstamp: true,
    isProp: { val: true },
    $: true,
    dom: true,
    $collection: true,
    render (val) {
      // shouldnt this just get shit (data stuff)
      this.define({ render: val })
    }
  },
  Child: 'Constructor'
}).Constructor
