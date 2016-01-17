'use strict'
var Base = require('vigour-js/lib/base')
var Observable = require('vigour-js/lib/observable')
var Element = require('../')
var Prop = require('../../property')
var isEmpty = require('vigour-js/lib/util/is/empty')

function resolvePath (obj, path) {
  var target = obj
  for (var i in path) {
    if (!target[path[i]]) {
      target[path[i]] = {}
    }
    console.log(target, path[i])
    target = target[path[i]]
  }
  console.log(' --->', path, target)
  return target
}

module.exports = function $map (map, path, puremap) {
  // puremap
  // context map? top level render key
  // not enough combine it with path
  if (this.hasOwnProperty('storedmap')) {
    return this.storedmap // not allways correct but good in 99% of the cases
  }
  // this can be optmized a lot!
  if (!map) {
    path = [] // this is also nasted
    map = this.storedmap = {}    // caching do later.. this is ofc stupid
    this.puremap = puremap
    if (this.$) {
      map.$ = this.$
      if (puremap) {
        if (this.$ !== true) {
          puremap = resolvePath(puremap, this.$.split('.'))
        }
      }
      if (this.$collection) {
        if (puremap) {
          if (this.ChildConstructor.prototype.hasOwnProperty('storedmap')) {
            puremap['*'] = this.ChildConstructor.prototype.puremap
          } else {
            puremap['*'] = {}
          }
        }
        map.$collection = this.ChildConstructor.prototype.$map(void 0, void 0, puremap && puremap['*'])
      }
    } else {
      map.$context = true
    }
  }
  function each (prop, key) {
    var isProp = prop instanceof Prop
    var fromPure = puremap
    if (prop.$) {
      if (puremap && prop.$ !== true) {
        // if(prop.$ )
        // fromPure = puremap
        console.log('make puremap', prop.$, prop.path.join('.'), fromPure)
        // also needs to get....
        fromPure = resolvePath(fromPure, prop.$.split('.'))
        if (isProp) {
          fromPure.val = true
        }
      }
      var p = path.concat([key])
      var mymap = map
      if (!isProp && mymap.$context) {
        delete mymap.$context
      }
      for (var i = 0, len = p.length; i < len; i++) {
        if (mymap[p[i]]) {
          mymap = mymap[p[i]]
          if (!isProp && mymap.$context) {
            delete mymap.$context
          }
        } else {
          mymap = mymap[p[i]] = {}
          if (isProp) {
            mymap.$context = true
          }
        }
        if (i === p.length - 1) {
          mymap.$ = prop.$
          if (prop.$collection) {
            if (fromPure) {
              if (prop.ChildConstructor.prototype.hasOwnProperty('storedmap')) {
                fromPure['*'] = prop.ChildConstructor.prototype.fromPure
              } else {
                fromPure['*'] = {}
              }
            }
            mymap.$collection = prop.ChildConstructor.prototype.$map(void 0, void 0, fromPure && fromPure['*'])
          }
        }
      }
    }
    prop.$map(map, path.concat([key]), fromPure)
  }
  this.each(each, (p) => p instanceof Element || p instanceof Prop)
  return map
}
