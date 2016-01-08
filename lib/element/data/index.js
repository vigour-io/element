'use strict'
var Base = require('vigour-js/lib/base')
var Observable = require('vigour-js/lib/observable')
var Element = require('../')
var isNode = require('vigour-js/lib/util/is/node')
var Prop = require('../../property')
function defBind () {
  // has to do while as well
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

var map = {}

// each fix
exports.define = {
  $map (map) {
    var maker
    if (!map) {
      maker = true
      map = {}
    }
    // do this in render of course -- thats the first momment that we need this -- do it completely in render!
    this.each(function (prop, key) {
      // console.log(key)
      if (prop.$) {
        // take of sharing path with map
        var p = prop.path
        var mymap = map
        for (var i = 0; i< p.length; i++) {
          mymap = mymap[p[i]] = mymap[p[i]] || {

          }
          if (i===p.length-1) {
            mymap.$ = prop.$
          }
          // mymap = map[p[i]]
        }
      }
      prop.$map(map)
    }, (p) => p instanceof Element)
    if (maker) {
      console.log(JSON.stringify(map, false, 2))
    }
    return map
  },
  renderData (target, oldVal, event, old$) {
     var element = this
     element = element._context ? element.resolveContext({}, event) : element

     /*
      first handle with context --- before actually doing something
     */

    if (target) {
      let $ = element.$
      if ($) {
        // if (element._context) {
        //   // console.log('yo resolve!', element._path)
        //   element = element.resolveContext({}, event)
        // }
        if (element.$collection) {
          // console.log('step 1')
          target.subscribe($, 'property', [ function (data, event) {
            console.log('yo prop')
            // guard for one the same  in the listener! -- only use data except the first time!!!!
            let origin = this.origin
            element._input = origin
            // element.clearContext()
            if (origin._input !== null) {
              origin.each(function (property, key) {
                if (property._input === null) {
                  // console.log('wtf bitch smurtjy', key, element.path)
                  element[key] && element[key].remove(event)
                } else {
                  // console.log('wtf bitch', key, element._context, element._path)
                  element.set({ [key]: property.origin }, event) // || element
                  // console.log(element[key], '???')
                  // should not be resolving here
                  if (!element[key].$) {
                    element[key].renderData(property.origin, false, event)
                  }
                }
              })
            } else {
              // this.clear(event)
            }
          }, element ], void 0, true, event)
        } else {
          target.subscribe($, 'data', [ function (data, event) {
            var origin = this.origin
            element._input = origin
            // element.clearContext()
            element.each(function (property, key) {
              property.renderData(origin, oldVal, event, old$)
            }, (property) => property instanceof Element)
          }, element ], void 0, true, event)
        }
      } else {
        if (element._input !== null) {
          // === walk if $ --> resolve context to up --> so these thigns allways have to go last

          element.each(function (property, key) {
            // have to be smart here!
            property.renderData(target.origin, oldVal, event, old$)
          }, (property) => property instanceof Element)
        }
      }
      let node
      if (!isNode) {
        node = element.getNode()
      }
      if (element._input !== null) {

        //HAVE TO DO THIS LAST

        // === walk if $ --> resolve context to up --> so these thigns allways have to go last

        // var cntx = element._context
        // var level = element._contextLevel
        // element._input = target
        // element.each(function (p, key) {
        //   if (p.$) {
        //     target.subscribe(p.$, 'data', [ function (data, event) {
        //       if (cntx) {
        //         element._context = cntx
        //         element._contextLevel = level
        //       }
        //       let node = element.getNode()
        //       if (node && element._input !== null) {
        //         element[key].render(node, event, element)
        //       }
        //     }, element._context || element], void 0, node, event)
        //   }
        // }, (p) => p instanceof Prop)
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
  $collection (val, event) {
    this.$collection = val
    this.properties.$.call(this, val, event)
  },
  $ (val, event) {
    this.$ = val
  }
}
