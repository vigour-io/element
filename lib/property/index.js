'use strict'
var Base = require('vigour-js/lib/base')
var Observable = require('vigour-js/lib/observable')
var renderLoop = require('../element/loop')
var _parseValue = Observable.prototype.parseValue
var getData = require('../util/getdata')

module.exports = new Observable({
  inject: [
    // require('./animate'),
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
        this._originalCache = void 0
        this._originalCacheStamp = null
        this.patch(event)
      }
    }
  },
  define: {
    origin: {
      get () {
        var reference = this
        while (reference._input instanceof Base) {
          reference = reference._input
        }
        if (reference.$) {
          let data = reference.parent.state.data
          reference = getData(reference, data)
        }
        return reference
      }
    },
    // TODO: add data to parseValue
    parseValue (val, event, origin) {
      if (val === void 0 && this.$) {
        let rdata = getData(this, this.parent.state.data)
        if (rdata) {
          val = rdata.parseValue()
        }
      }
      if (val === void 0 || !this._datarender) {
        if (this._originalCache !== void 0) {
          if (this._originalCacheStamp == this._lstamp) { //eslint-disable-line
            return this._originalCache
          }
        }
      }
      val = _parseValue.call(this, val, event, origin)
      if (val !== void 0 && !this.hasOwnProperty('_originalCache')) {
        this._originalCacheStamp = this._lstamp
        this._originalCache = val
      }
      return val
    },
    // TODO: unify compare for properties
    compare (property, data, props, children, current, prev) {
      let key = property.key
      let dstamp = (property.$ || property._datarender) && data && data._lstamp
      let lstamp = property._lstamp
      let stamp = (dstamp && (lstamp ? dstamp + lstamp : dstamp)) || lstamp

      if (prev && prev.vnode && property.dom) {
        if (prev.state.props && prev.state.props[key] == stamp) { //eslint-disable-line
          props[property.dom] = prev.vnode.properties[property.dom]
          if (!current.state.props) {
            current.state.props = prev.state.props
          } else if (!current.state.props[key]) {
            current.state.props[key] = prev.state.props[key]
          }
          return true
        }
      }
      if (!current.state.props) {
        current.state.props = {}
      }
      current.state.props[key] = stamp
    },
    emitRemove () {}, // double check this but very slow to emitremove on nested instances
    patch (event) {
      var parent = this
      while (parent) {
        if (!parent._force) {
          parent._lstamp = event.stamp // later this will become a hash using the added values then its rly state
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
