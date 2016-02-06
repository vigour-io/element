'use strict'
var Observable = require('vigour-js/lib/observable')
var renderLoop = require('../element/loop')
var _parseValue = Observable.prototype.parseValue

module.exports = new Observable({
  inject: [
    require('../util/context'),
    require('./animate'),
    require('../cases/inject'),
    require('../element/map'),
    require('../util/each')
  ],
  on: {
    data: {
      patch (data, event) {
        if (data === null) {
          console.log('prop emit from remove... bit too many patches')
        }
        console.log('lets patch', this._path, event.stamp, this._input)
        this._originalCache = null
        this._originalCacheStamp = null
        this.patch(event)
      }
    }
  },
  define: {
    parseValue (val) {
      if ((!val || !this.$) && this._originalCacheStamp == this._lstamp) { //eslint-disable-line
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
        if (prev.state.props && prev.state.props[key] == stamp) { //eslint-disable-line
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
    emitRemove () {},
    patch (event) {
      var parent = this
      while (parent) {
        if (event && !parent._datarender) {
          parent._lstamp = event.stamp
        }
        if (parent.renderTree) {
          renderLoop(parent, parent.uid, event)
          return
        }
        parent = parent.parent
      }
    }
  },
  properties: {
    _originalCache: true,
    _originalCacheStamp: true,
    isProp: { val: true },
    dom: true,
    render (val) {
      this.define({ render: val })
    }
  },
  Child: 'Constructor'
}).Constructor
