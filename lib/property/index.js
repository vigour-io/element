'use strict'
var Observable = require('vigour-js/lib/observable')
var renderLoop = require('../element/loop')
var Event = require('vigour-js/lib/event')
var Base = require('vigour-js/lib/base')
var _parseValue = Observable.prototype.parseValue
var _addProperty = Observable.prototype.addProperty
//Base.prototype.parseValue

module.exports = new Observable({
  inject: [
    require('../util/context'),
    require('./animate'),
    require('../cases/inject'),
    require('../element/map'),
    require('../subscription')
  ],
  on: {
    // property: {
    //   props () {
    //     var props = []
    //     this.each(function (p, key) {
    //       props.push(key)
    //     }, function (p) {
    //       return p instanceof module.exports && p._input !== null
    //     })
    //     this.props = props
    //   }
    // },
    data: {
      patch (data, event) {
        var parent = this
        while (parent) {
          if (!parent._datarender) {
            parent._lstamp = event.stamp
          } else {
            break
          }
          parent = parent._parent
        }
        this.patch()
      }
    }
  },
  define: {
    parseValue (val) {
      if ((!val || !this.$) && this._originalCacheStamp == this._lstamp) {
        return this._originalCache
      }
      val = _parseValue.apply(this, arguments)
      if (val !== void 0 && !this.hasOwnProperty('_originalCache')) {
        this._originalCache = val
        this._originalCacheStamp = this._lstamp
      }
      return val
    },
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
    props: true,
    _lstamp: true,
    _originalCache: true,
    _originalCacheStamp: true,
    isProp: { val: true },
    dom: true,
    render (val) {
      // shouldnt this just get shit (data stuff)
      this.define({ render: val })
    }
  },
  Child: 'Constructor'
}).Constructor
