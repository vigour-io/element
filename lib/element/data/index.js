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
          element = element.resolveContext(void 0, event, element._context)
        }
        if (element.$collection) {
          target.subscribe($, 'property', function (data, event) {
            this.origin.each(function (property, key) {
              element = element.set({ [key]: property.origin }, event) || element
              if (!element[key].$) {
                element[key].renderData(property.origin, false, event)
              }
            })
          }, void 0, true, event)
        } else {
          target.subscribe($, 'data', function (data, event) {
            var target = this.origin
            element.each(function (property, key) {
              property.renderData(target, oldVal, event, old$)
            }, (property) => property instanceof Element)
          }, void 0, true, event)
        }
      } else {
        element.each(function (property, key) {
          property.renderData(target.origin, oldVal, event, old$)
        }, (property) => property instanceof Element)
      }

      // render properties when changing stuff later
      if (!isNode) {
        let node = element.getNode()
        if (node) {
          element.each(function (p, key) {
            if (p.$) {
              target.subscribe(p.$, 'data', function (data, event) {
                element[key].render(element.getNode(), event, element)
              }, void 0, node , event)
            }
          }, (p) => p instanceof Prop)
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
  $collection (val, event) {
    this.$collection = val
    this.properties.$.call(this, val, event)
  },
  $ (val, event) {
    this.$ = val
  }
}
