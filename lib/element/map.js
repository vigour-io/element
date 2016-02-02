'use strict'

// only pure!
// dont need the element stuff here anymore
// var Prop = require('../property')
var setWithPath = require('vigour-js/lib/util/setwithpath')
var Base = require('vigour-js/lib/base')

module.exports = function (element) {
  exports.properties = {
    storedmap: true,
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
          map = setWithPath(map, this.$.split('.'), {})
        }
        if (this.isProp) {
          map.val = true
        }
        if (this.$collection) {
          map = map['*'] = this.ChildConstructor.prototype.$map()
        }
      }
      this.each(each, (p) => p instanceof Base && p.$map, map)
      return returnValue
    }
  }
  element.set(exports)
}

function each (p, key, base, map) {
  if (p.$map) {
    p.$map(map)
  }
}
