'use strict'
var setWithPath = require('vigour-util/setwithpath')
var isNumber = require('vigour-util/is/number')
var isPlain = require('vigour-util/is/plainobj')
exports.properties = {
  _subscriptionCondition: true,
  storedmap: true,
  $ (val) {
    var parent = this
    if (val === null) {
      this.$ = null
      return
    }

    if (isPlain(val)) {
      if (!val.val) {
        throw new Error('$ needs val.val')
      }
      if (val.condition) {
        this._subscriptionCondition = val.condition
      } else if (this._subscriptionCondition) {
        delete this._subscriptionCondition
      }
      val = val.val
    }

    this.__input = void 0
    if (val !== true && !(val instanceof Array)) {
      if (!val || typeof val === 'object') {
        throw new Error('wrong type for .$ pass a string, number or Array')
      }
      if (isNumber(val)) {
        val = val + ''
      }
      val = val.split('.')
    }
    if (val !== true && val[0] === 'parent') {
      console.warn('setting force updates -- used for $.parent currently not optimized')
      if (!this.forceUpdates) {
        console.warn('no force updates yet on properties')
      } else {
        this.forceUpdates()
      }
    }
    while (parent) {
      if (!parent._datarender) {
        parent._datarender = true
      }
      parent = parent.parent
    }
    this.$ = val
  },
  $collection: function (val) {
    this.setKey('$', val)
    this.$collection = this.$
  }
}

exports.define = {
  $map: function $map (map) {
    if (this.hasOwnProperty('storedmap')) {
      return this.storedmap
    }
    var returnValue
    if (!map) {
      returnValue = map = this.storedmap = {}
    }

    if (this.$) {
      if (this.$ !== true) {
        map = setWithPath(map, this.$, {})
      }
      if (this.isProp) {
        map.val = true
      }
      if (this.$collection) {
        map = map['*'] = this.ChildConstructor.prototype.$map(void 0, true)
        for (var prop in this.properties) {
          if (this.properties[prop].base && this.properties[prop].base.$map) {
            this.properties[prop].base.$map(map)
          }
        }
      }
    }
    this.each(each, hasMap, map) // use keys and properties
    return returnValue
  }
}

function hasMap (p) {
  return p.$map
}

function each (p, key, base, map) {
  p.$map(map)
}
