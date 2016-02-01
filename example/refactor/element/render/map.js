'use strict'
var Prop = require('../../../../lib/property')

function resolvePath (obj, path) {
  var target = obj
  for (var i in path) {
    if (!target[path[i]]) {
      target[path[i]] = {}
    }
    target = target[path[i]]
  }
  return target
}

module.exports = function (element) {
  var Element = element.Constructor
  exports.properties = {
    storedmap: true,
    puremap: true
  }

// this only has to create the purmap thing

  exports.define = {
    $map: function $map (map, path, puremap) {
      if (this.hasOwnProperty('storedmap')) {
        return this.storedmap
      }
      if (!map) {
        path = []
        map = this.storedmap = {}
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
            fromPure = resolvePath(fromPure, prop.$.split('.'))
            if (isProp) {
              fromPure.val = true
            }
          } else if (fromPure && isProp && prop.$ === true) {
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
                    fromPure['*'] = prop.ChildConstructor.prototype.puremap
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
  }
  element.set(exports)
}
