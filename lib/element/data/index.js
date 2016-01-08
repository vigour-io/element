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
    if (this.$) {
      map.$ = this.$
      if (this.$collection) {
        map.$collection = this.ChildConstructor.prototype.$map()
      }
    }
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
            // each()
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
      console.log(parent)
      self = parent._input
      if (self) {
        console.error(field, self)
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

// function addPropListenersDeep (target, element) {
//   // what about doing this on render in props???? way better!!!1
//   element.each(function (p) {
//     // needs to be done better
//     // what about just adding the props in the map? saves a walk
//     // render is prop smartest for this
//     if (p.$) {
//       var cntxt = element._context
//       var level = element._contextLevel
//       target.subscribe(p.$, 'data', [ function (data, event) {
//         // Element
//         if (cntxt) {
//           // dont forget to reset!
//           element._context = cntxt
//           element._contextLevel = level
//         }
//         let node = element.getNode()
//         if (node) {
//           p.render(node, event, element)
//         }
//       }, element._context || element ])
//     }
//   }, (p) => p instanceof Prop)

//   element.each(function () {
//     // each elem lezzzgo
//   }, (p) => p instanceof Element)
// }

// each fix
exports.define = {
  $map: $map,
  $subscribeProperty (p, target) {
    console.log('yesh', p.$, target._path)
    var element = this
    // element._input = target
    if (p.$) {
      var cntxt = element._context
      var level = element._contextLevel
      target.subscribe(p.$, 'data', [ function (data, event) {
        console.log('go go go', this.path)
        // Element
        if (cntxt) {
          console.log('????xxxxxx')
          // dont forget to reset!
          element._context = cntxt
          element._contextLevel = level
        }
        p._context = element
        p._contextLevel = level ? level + 1 : 1
        // element._input = this.origin
        let node = element.getNode()
        if (node) {
          console.log('???', node, p._context)
          p.render(node, event, element)
        }
      }, cntxt ? (cntxt._context || cntxt) : element ])
    }
  },
  renderData (target, oldVal, event, old$, map) {
    // if (!target || !target.subscribe) {
      // console.error('???', this.path, target)
      // return
    // }
    var element = this
    if (!map) {
      map = this.$map()
    }
    // console.log(map)
    walk(map, element, target)
    function walk (obj, element, target) {
      if (element._context) {
        element = element.resolveContext(void 0) // moet nog met false
      }
      if (!obj.$ && !obj.$collection) {
        // ugh only for end points basicly
        // normal case have to go to props
        // addPropListenersDeep(target, element)
      }
      for (var i in obj) {
        if (i === '$') {
          if (!obj.$collection) {
            target.subscribe(obj[i], 'data', [
              function () {
                if (element._input === null) {
                  return // wrong should not be nessecary
                }
                var origin = element._input = this.origin
              }, element
            ], void 0, true, event)
          }
        } else if (i === '$collection') { // lets rename collection to $property
          target.subscribe(obj.$, 'property', [
            function (data, event) {
              if (element._input === null) {
                return // wrong should not be nessecary
              }
              if (element._input !== this.origin) {
                element.each(function (p) {
                  p instanceof Element && p.remove(event)
                })
              }
              var origin = element._input = this.origin
              origin.each(function (property, key) {
                // dont run walk here if its not rendered then its not nessecary
                element.set({ [key]: property.origin }, event)
              })
            }, element
          ], void 0, true, event)
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
