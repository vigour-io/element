'use strict'
var merge = require('lodash/object/merge')
var Base = require('vigour-js/lib/base')
var isPlain = require('vigour-js/lib/util/is/plainobj')
var _child = Base.prototype.properties.Child
console.log(_child)
// node type also need that
function lookUpComponent (target, type) {
  var result
  while (target) {
    if (target._components && target._components[type]) {
      if (target._components[type]) {
        result = target._components[type]
        if (isPlain(result)) {
          let check = lookUpComponent(target._parent, result.type || type)
          if (check) {
            result = target._components[type] = new check.Constructor(result, false)
          } else {
            result = target._components[type] = new target.Child(result, false)
          }
        }
        return result
      }
    }
    target = target._parent
  }
}

exports.define = {
  getType (val, event, key, nocontext, escape) {
    // also need a check in Child
    var type = val.type
    if (!type) {
      return val
    }
    let result = lookUpComponent(this, type)
    if (result) {
      return new result.Constructor(val, event, this, key, escape)
    }
    val._node = type
    return val
  }
}

exports.properties = {
  Child (val, event) {
    if (isPlain(val) && val.type) {
      val = this.getType(val, event)
    }
    return _child.call(this, val, event)
  },
  components (val, event) {
    if (!this.hasOwnProperty('_components')) {
      this._components = {}
    }
    // special stuff

    // is plain and is elem
    merge(this._components, val)
    console.error('ok components lets handle them')
  }
}
