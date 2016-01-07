'use strict'
var Element = require('../')
var isNode = require('vigour-js/lib/util/is/node')
var Prop = require('../../property')
var Observable = require('vigour-js/lib/observable')
// var Observable = require('vigour-js/lib/observable')
function defBind () {
  return this._parent._contextLevel === 1
    ? this._parent._context.parseValue()
    : this._parent.parseValue()
}

function getit (field) {
  return function fieldbind () {
    var self
    var parent = this
    while (parent) {
      if (self) {
        let a = self.retrieve && self.retrieve(field)
        return a ? a.parseValue() : 'smurky'
      }
      if (parent._context) {
        if (parent._contextLevel === 1) {
          parent = parent._context
        } else {
          parent = parent._parent
        }
      } else {
        parent = parent._parent
      }
      if (parent) {
        self = parent.refOrigin
      }
      // needs to clear and be smart
    }
    return 'bla'
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
  }
})

// each fix
exports.define = {
  renderData (target, oldVal, event, old$) {
    var element = this
    var $ = element.$
    if ($ && target) {
      if (element._context) {
        element = element.resolveContext(void 0, event, element._context)
      }
      if (element.$collection) {
        target.subscribe($, 'property', function (data, event) {
          this.each(function (property, key) {
            element.set({ [key]: property.origin }, event)
            if(!element[key].$) {
              element[key].renderData(property.origin, false, event)
            }
          })
        }, void 0, true, event)
      } else {
        target.subscribe($, 'data', function (data, event) {
          element.each(function (property, key) {
            property.renderData(target, oldVal, event, old$)
          }, (property) => property instanceof Element)
        }, void 0, true, event)
      }
    } else {
      element.each(function (property, key) {
        property.renderData(target, oldVal, event, old$)
      }, (property) => property instanceof Element)
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
    // handle prev etc (remove old etc etc  )
    this.$ = val
  }
}
