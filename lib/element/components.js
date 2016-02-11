'use strict'
var merge = require('lodash/object/merge')
var Base = require('vigour-js/lib/base')
var isPlain = require('vigour-js/lib/util/is/plainobj')
var _child = Base.prototype.properties.Child
// node type also need that

function lookUpComponent (target, type, val) {
  var result
  while (target) {
    console.warn('search type', type)
    if (target._components && target._components[type]) {
      console.warn('gots type', type)
      result = target._components[type]
      if (isPlain(result)) {
        console.log('now lookup', result.type, type)
        // double check this gaurd
        let check = result.type !== type && result.type && type && lookUpComponent(target, result.type || type, val)
        if (check) {
          console.log('YO YO YO YO', type, result.type, result.node)
          val.node = result.node
          result = target._components[type] = new check.Constructor(result, false, target)
        } else {
          val.node = result.node
          console.log('NO NO NO NO', type, ' ---> ', result.type)
          result = target._components[type] = new target.Child(result, false, target)
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
    var type = val.type
    if (!type) {
      return val
    }
    console.info('lets start get info:', key, type)
    let result = lookUpComponent(this, type, val)
    if (result) {
      // delete val.node
      val.node = result.node
      console.log('now the set', type, val)
      return new result.Constructor(val, event, this, key, escape)
    }
    // val.node = type
    return val
  }
}

function walkChild (from, val, event) {
  if (isPlain(val)) {
    if (val.type) {
      val = from.getType(val, event)
    }
    for (var key in val) {
      val[key] = walkChild(from, val[key], event)
    }
  }
  return val
}

exports.properties = {
  Child (val, event) {
    console.warn('----> set c-csntr', val)
    val = walkChild(this, val, event)
    console.warn('----> result', val)
    // pass on type check need to go nested else its weird
    return _child.call(this, val, event)
  },
  components (val, event) {
    if (!this.hasOwnProperty('_components')) {
      this._components = {}
    }
    // if (val instanceof Array) {
    //   console.log('got multiple components do some smart merging', val)
    // }
    var comp = this._components
    console.error('create components')
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
    console.log('done!', Object.keys(comp))
  }
}
