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

// each fix
exports.define = {
  renderData (target, oldVal, event, old$) {
    var element = this
    if (target) {
      let $ = element.$
      if ($) {
        if (element._context) {
          console.log('yo set!')
          element = element.resolveContext(void 0, event, element._context)
        }
        if (element.$collection) {
          target.subscribe($, 'property', [ function (data, event) {
            // guard for one the same  in the listener! -- only use data except the first time!!!!
            let origin = this.origin
            element._input = origin
            if (origin._input !== null) {
              origin.each(function (property, key) {
                if (property._input === null) {
                  console.log('wtf bitch smurtjy', key)
                  element[key] && element[key].remove(event)
                } else {
                  console.log('wtf bitch', key)
                  element = element.set({ [key]: property.origin }, event) || element
                  if (!element[key].$) {
                    element[key].renderData(property.origin, false, event)
                  }
                }
              })
            } else {
              this.clear(event)
            }
          }, element ], void 0, true, event)
        } else {
          target.subscribe($, 'data', [ function (data, event) {
            var origin = this.origin
            element._input = origin
            element.each(function (property, key) {
              property.renderData(origin, oldVal, event, old$)
            }, (property) => property instanceof Element)
          }, element ], void 0, true, event)
        }
      } else {
        if (element._input !== null) {
          element.each(function (property, key) {
            property.renderData(target.origin, oldVal, event, old$)
          }, (property) => property instanceof Element)
        }
      }
      let node
      if (!isNode) {
        node = element.getNode()
      }
      if (element._input !== null) {
        var cntx = element._context
        var level = element._contextLevel
        element._input = target
        element.each(function (p, key) {
          if (p.$) {
            target.subscribe(p.$, 'data', [ function (data, event) {
              if (cntx) {
                element._context = cntx
                element._contextLevel = level
              }
              let node = element.getNode()
              if (node && element._input !== null) {
                element[key].render(node, event, element)
              }
            }, element._context || element], void 0, node, event)
          }
        }, (p) => p instanceof Prop)
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
