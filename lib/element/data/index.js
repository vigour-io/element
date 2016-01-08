'use strict'
var Base = require('vigour-js/lib/base')
var Observable = require('vigour-js/lib/observable')
var Element = require('../')
var isNode = require('vigour-js/lib/util/is/node')
var Prop = require('../../property')

function $map (map, path) {
  if (this.storedmap) {
    return this.storedmap
  }
  // option to include properties for hub also hub can flatten the structure!
  // var maker
  if (!map) {
    path = []
    // maker = true
    map = this.storedmap = {}
  }
  function each (prop, key) {
    if (prop.$) {
      var p = path.concat([key])
      var mymap = map
      for (var i = 0, len = p.length; i < len; i++) {
        mymap = mymap[p[i]] = mymap[p[i]] || {}
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
  this.each(each, (p) => p instanceof Element
    // || p instanceof Prop
    )
  // if (maker) {
  //   console.log(JSON.stringify(map, false, 2))
  // }
  return map
}

function defBind () {
  return (this._contextLevel === 1 ? this._context : this._parent).parseValue()
}

function getit (field) {
  return function fieldbind () {
    var self
    var parent = this._contextLevel === 1 ? this._context : this._parent
    while (parent) {
      self = parent.refOrigin
      if (self) {
        let a = self.retrieve && self.retrieve(field)
        return a ? a.parseValue() : 'smurky'
      }
      parent = parent._contextLevel === 1 ? parent._context : parent._parent
    }
    return ''
  }
}

Prop.prototype.set({
  properties: {
    $storedmap: true,
    $ (val) {
      this.$ = val
      if (val === true) {
        this.set(defBind)
      } else {
        this.set(getit(val))
      }
    }
  },
  define: {
    $map: $map,
    origin: {
      get () {
        var field = this.$
        var reference = this
        if (field) {
          let self
          let up = reference.parent
          while (up) {
            self = up.refOrigin
            if (self) {
              reference = self.retrieve(field)
              break
            }
            up = up.parent
          }
        } else {
          while (reference._input instanceof Base) {
            reference = reference._input
          }
        }
        return reference
      }
    }
  }
})

// each fix
exports.define = {
  $map: $map,
  renderData (target, oldVal, event, old$, map) {
    var element = this
    if (!map) {
      map = this.$map()
    }
    walk(map, element, target)
    function walk (obj, element, target) {
      if (element._context) {
        element = element.resolveContext(void 0)
      }
      for (var i in obj) {
        if (i === '$') {
          if (!obj.$collection) {
            target.subscribe(obj[i], 'data', [
              function () {
                if (element._input === null) {
                  return //wrong should not be nessecary
                }
                var origin = element._input = this.origin
              }, element
            ], void 0, true)
          }
        } else if (i === '$collection') { // lets rename collection to $property
          target.subscribe(obj.$, 'property', [
            function () {
              if (element._input === null) {
                return // wrong should not be nessecary
              }
              var origin = element._input = this.origin
              origin.each(function (property, key) {
                element.set({ [key]: property.origin })
              })
            }, element
          ], void 0, true)
          // console.log('---->!', i, obj[i])
        } else {
          walk(obj[i], element[i], target)
        }
      }
    }
  },
  handleReference (val, event, oldVal) {
    var valIsObservable = val instanceof Observable
    if (valIsObservable) {
      this._input = val
      if (this.$) {
        this.renderData(val, oldVal, event)
      }
    } else if (oldVal instanceof Observable) {
      if (this.$) {
        this.renderData(val, oldVal, event)
      }
    }
  }
}

exports.properties = {
  $storedmap: true,
  $collection (val, event) {
    this.$collection = val
    this.properties.$.call(this, val, event)
  },
  $ (val, event) {
    this.$ = val
  }
}
