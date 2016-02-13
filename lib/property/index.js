'use strict'
var Base = require('vigour-js/lib/base')
var Observable = require('vigour-js/lib/observable')
var renderLoop = require('../element/loop')
var _parseValue = Observable.prototype.parseValue
var getData = require('../util/getdata')
var currentState = require('../util/currentstate')

document.body.addEventListener('touchstart', function (e) {
  e.preventDefault()
}, false)

module.exports = new Observable({
  inject: [
    require('../methods/patch'),
    require('../methods/stamp'),
    require('../cases/inject'),
    require('../element/map')
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
    keysCheck (val, key) {
      return val[key] instanceof module.exports
    },
    origin: {
      get () {
        var reference = this
        while (reference._input instanceof Base) {
          reference = reference._input
        }
        return getDataOrigin(this) || reference
      }
    },
    // TODO: add data to parseValue
    parseValue (val, event, origin) {
      if (val === void 0) {
        let rdata = getDataOrigin(this)
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
    compare (property, data, props, children, current, prev) {
      let key = property.key
      let stamp = property.getStamp(data)
      if (prev && prev.vnode && property.dom) {
        if (prev.state.props && prev.state.props[key] == stamp) { //eslint-disable-line
          props[property.dom] = prev.vnode.properties[property.dom]
          currentState(key, current, prev)
          return true
        }
      }
      currentState(key, current, prev)
      current.state.props[key] = stamp
    },
    emitRemove () {} // double check this but very slow to emitremove on nested instances
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

function getDataOrigin (property) {
  if (property.$) {
    let state = property.parent.state
    if (state) {
      let data = state.data
      if (data) {
        return getData(property, data)
      }
    }
  }
}
