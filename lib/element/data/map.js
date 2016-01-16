'use strict'
var Base = require('vigour-js/lib/base')
var Observable = require('vigour-js/lib/observable')
var Element = require('../')
var Prop = require('../../property')
var isEmpty = require('vigour-js/lib/util/is/empty')

module.exports = function $map (map, path, puremap) {
  //puremap
  // context map? top level render key
  // not enough combine it with path
  if (this.hasOwnProperty('storedmap')) {
    // return this.pureMap
    return this.storedmap // not allways correct but good in 99% of the cases
  }
  // this can be optmized a lot!
  if (!map) {
    path = []
    map = this.storedmap = {}
    if (this.$) {
      map.$ = this.$
      if (this.$collection) {
        map.$collection = this.ChildConstructor.prototype.$map()
      }
    } else {
      map.$context = true
    }
  }
  function each (prop, key) {
    var isProp = prop instanceof Prop
    if (prop.$) {
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
            mymap.$collection = prop.ChildConstructor.prototype.$map()
          }
        }
      }
    }
    prop.$map(map, path.concat([key]))
  }
  this.each(each, (p) => p instanceof Element || p instanceof Prop)
  return map
}
