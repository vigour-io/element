'use strict'
var merge = require('lodash/object/merge')
var Base = require('vigour-js/lib/base')
var isPlain = require('vigour-js/lib/util/is/plainobj')
var _child = Base.prototype.properties.Child
// node type also need that

function lookUpComponent (target, type, val) {
  var result
  while (target) {
    if (target._components && target._components[type]) {
      result = target._components[type]
      if (isPlain(result)) {
        let check = lookUpComponent(target._parent, result.type || type, val)
        if (check) {
          result = target._components[type] = new check.Constructor(result, false)
        } else {
          result = target._components[type] = new target.Child(result, false)
        }
      }
      return result
    }
    target = target._parent
  }
  val.node = type
}

exports.define = {
  getType (val, event, key, nocontext, escape) {
    console.error('--- GET TYPE ---')
    var type = val.type
    if (!type) {
      return val
    }
    let result = lookUpComponent(this, type, val)
    if (result) {
      val.node = result.node
      return new result.Constructor(val, event, this, key, escape)
    }
    val.node = type
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

    if (val instanceof Array) {
      console.log('got multiple components do some smart merging', val)
    }

    var comp = this._components
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
    console.error('ok components lets handle them (this is not good yet!)')
  }
}
