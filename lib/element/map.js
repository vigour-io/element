'use strict'

var setWithPath = require('vigour-js/lib/util/setwithpath')
var Base = require('vigour-js/lib/base')
var isNumber = require('vigour-js/lib/util/is/number')

module.exports = function (element) {
  exports.properties = {
    storedmap: true,
    $: function (val) {
      if (val !== true && !(val instanceof Array)) {
        if (!val || typeof val === 'object') {
          throw new Error('wrong type for .$ pass a string, number or Array')
        }
        if (isNumber(val)) {
          val = val + ''
        }
        val = val.split('.')
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
        // if (this.isOperator) {
        //   map = pmap || map
        // }
        if (this.$ !== true) {
          map = setWithPath(map, this.$, {})
        }
        if (this.isProp) {
          map.val = true
        }
        if (this.$collection) {
          map = map['*'] = this.ChildConstructor.prototype.$map()
        }
      }

      this.each(each, hasMap, map)
      return returnValue
    }
  }
  element.set(exports)
}

function hasMap (p) {
  return p instanceof Base && p.$map
}

function each (p, key, base, map) {
  p.$map(map)
}
