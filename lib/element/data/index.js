'use strict'
var Base = require('vigour-js/lib/base')
var Observable = require('vigour-js/lib/observable')
var Element = require('../')
var isNode = require('vigour-js/lib/util/is/node')
var Prop = require('../../property')

function $map (map, path, nolog) {
  if (this.storedmap) {
    return this.storedmap
  }
  // option to include properties for hub also hub can flatten the structure!
  var maker
  if (!map) {
    path = []
    maker = true
    map = this.storedmap = {}
    if (this.$) {
      map.$ = this.$
      if (this.$collection) {
        map.$collection = this.ChildConstructor.prototype.$map(void 0, void 0, true)
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
            mymap.$collection = prop.ChildConstructor.prototype.$map(void 0, void 0, true)
          }
        }
      }
    }
    prop.$map(map, path.concat([key]))
  }
  this.each(each, function (p)  {
      if (p instanceof Element) {
        return true
      }
      if (p instanceof Prop) {
        return true
      }
    }
    // || p instanceof Prop
    )
  if (maker && !nolog) {
    console.log(JSON.stringify(map, false, 2))
  }
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
      self = parent._input
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

exports.define = {
  $map: $map,
  $subscribeProperty (p, target) {
    // var element = this
    // // element._input = target
    // if (p.$) {
    //   var cntxt = element._context
    //   var level = element._contextLevel
    //   target.subscribe(p.$, 'data', [ function (data, event) {
    //     // Element
    //     if (cntxt) {
    //       // dont forget to reset!
    //       element._context = cntxt
    //       element._contextLevel = level
    //     }
    //     p._context = element
    //     p._contextLevel = level ? level + 1 : 1
    //     // element._input = this.origin
    //     let node = element.getNode()
    //     if (node) {
    //       p.render(node, event, element)
    //     }
    //   }, cntxt ? (cntxt._context || cntxt) : element ])
    // }
  },
  renderData (target, oldVal, event, old$, map) {
    var element = this
    if (!map) {
      map = this.$map()
    }
    walk(map, element, target)
    function walk (obj, element, target) {
      if (obj.$context) {
        // wtf is up here...
      } else {
        if (element._context) {
          element = element.resolveContext(void 0, event, element._context) // moet nog met false
        }
        if (obj.$) {
          if (obj.$collection) {
            target.subscribe(obj.$, 'property', [
              function (data, event) {
                if (element._input !== this.origin) {
                  element.each(function (p) {
                    p instanceof Element && p.remove(event)
                  })
                }
                var origin = element._input = this.origin
                origin.each(function (property, key) {
                  element.set({ [key]: property.origin }, event)
                })
              }, element
            ], void 0, true, event)
          } else {
            target.subscribe(obj.$, 'data', [
              function () {
                let origin = element._input = this.origin //eslint-disable-line
                for (var i in obj) {
                  if (i !== '$') {
                    console.log('?', i)
                    walk(obj[i], element[i], origin)
                  }
                }
              }, element
            ], void 0, true, event)
          }
        }

        else {
          for (var i in obj) {
            // i want to use subscribe bitches
            if (i!=='$' && i!=='$collection') {
              walk(obj[i], element[i], target)
            }
          }
          // walk(obj[i], element[i], target)
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
