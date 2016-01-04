'use strict'
var app = require('../../lib/app')
var Element = app.ChildConstructor

function defBind () {
  return this.parent.parseValue()
}

function getit (field) {
  return function fieldbind () {
    var self
    var parent = this.parent
    while (parent) {
      parent = parent.parent
      self = parent._self
      if (self) {
        break
      }
    }
    if (self) {
      let a = self.get(field)
      return a ? a.parseValue() : 'smurky'
    }
    return 'bla'
  }
}

var Prop = require('../../lib/property')
Prop.prototype.set({
  properties: {
    $: function (val) {
      this.$ = val
      if (val === true) {
        this.set(defBind)
      } else {
        this.set(getit(val))
      }
    }
  }
})

function addListeners (element, target, attach, event) {
  element.each(function (prop, key) {
    var a = attach
    if (prop.$) {
      prop.set((prop._self || target).get(prop.$), event)
      a = prop
      // prop.blax(void 0, event)
    }
    addListeners(prop, prop._self || target, a, event)
    // this can just be done on render -- omg
  }, function (prop, key) {
    if (prop instanceof Prop) {
      if (prop.$) {
        if (target.get(prop.$)) {
          // this is the render of the element ofc
          // subscribe and resolve for nested else get node does not work
          target.get(prop.$).on('data', [ function (data, event) {
            // this is the trick of course here
            var node = element.getNode()
            if (node) {
              element[key].render(element.getNode(), event, element)
            }
          }, attach])
        } else {
          console.warn('cant find ', prop.$, prop.path)
        }
      }
      return false
    }
    return prop instanceof Element
  })
}

exports.define = {
  blax (data, event) {
    if (this._input === null) {
      return
    }
    var select = this.$
    var elem = this
    elem._self = elem.origin
    if (elem._self) {
      elem._self.each(function (prop, key) {
        elem = elem.setKey(key, void 0, event)
        elem[key]._self = prop
        addListeners(elem[key], prop, elem, event)
      })
    }
    elem._self.on('property', function (data) {
      if (this._input === null) {
      } else {
        if (data.removed) {
          for (var i in data.removed) {
            elem[data.removed[i]].remove()
          }
        }
        if (data.added) {
          for (var i in data.added) {
            elem = elem.setKey(data.added[i], void 0, event)
            elem[data.added[i]]._self = this[data.added[i]]
            addListeners(elem[data.added[i]], this[data.added[i]], elem, event)
          }
        }
      }
    })
    // handle property changes here -- first we need property datas!
    // this.origin.subscribe(val + '.$property', function () {})
    // event.trigger()
  }
}

exports.properties = {
  $: function (val) {
    this.$ = val
    if (val) {
      this.on('reference', this.blax)
    }
  }
}
