'use strict'
var merge = require('lodash/object/merge')
var Base = require('vigour-js/lib/base')
var isPlain = require('vigour-js/lib/util/is/plainobj')
var isEmpty = require('vigour-js/lib/util/is/empty')
var _child = Base.prototype.properties.Child

function lookUpComponent (target, type, val, Element) {
  var result
  while (target) {
    if (target.components && target.components[type]) {
      result = target.components[type]
      if (isPlain(result)) {
        let check = result.type !== type && result.type && type && lookUpComponent(target, result.type || type, val, Element)
        if (check) {
          result = target.components[type] = new check.Constructor(result, false, target)
        } else {
          result = target.components[type] = new Element(result, false, target)
        }
      }
      return result
    }
    target = target._parent
  }
}

module.exports = function (element) {
  var Element = element.Constructor
  exports.define = {
    getType (val, event, key, nocontext, escape) {
      var type = val.type
      if (!type) {
        return val
      }
      let result = lookUpComponent(this, type, val, Element)
      if (result) {
        let r = new result.Constructor(val, event, this, key) //, this, key, escape)
        return r
      }
      return val
    }
  }

  exports.properties = {
    Child (val, event) {
      if (isPlain(val)) {
        val = this.getType(val, event)
      }
      _child.call(this, val, event)
    },
    components (val, event) {
      if (!this.hasOwnProperty('components')) {
        this.components = {}
      }
      // if (val instanceof Array) {
      //   console.log('got multiple components do some smart merging', val)
      // }
      var comp = this.components
      for (var key in val) {
        if (val[key].type) {
          comp[key] = val[key]
        } else if (!comp[key]) {
          comp[key] = val[key]
        } else if (isPlain(comp[key])) {
          merge(comp[key], val[key])
        } else if (comp[key] instanceof Base) {
          comp[key].inject(val[key], event)
        }
      }
    }
  }

  element.inject(exports)
}
