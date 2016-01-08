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
      self = parent._self
      if (self) {
        let a = self.get(field)
        return a ? a.parseValue() : 'smurky'
      }
      parent = parent.parent
    }
    return 'bla'
  }
}

var isNode = require('vigour-js/lib/util/is/node')

var Prop = require('../../lib/property')
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
    if (prop instanceof Prop && !isNode) {
      let prop$ = prop.$
      if (prop$) {
        let property = target.get(prop$)
        if (property) {
          // this is the render of the element ofc
          // subscribe and resolve for nested else get node does not work
          property.on('data', [ function (data, event) {
            // this is the trick of course here
            var node = element.getNode()
            if (node) {
              element[key].render(node, event, element)
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
  handleCollection (data, event) {
    if (data === null) {
      console.error('????')
    }
    if (this._input === null) {
      // this.clear()
      // update instances of course...
      return
    }
    let elem = this
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
        elem.clear()
      } else {
        if (data.removed) {
          for (let i in data.removed) {
            elem[data.removed[i]].remove()
          }
        }
        if (data.added) {
          for (let i in data.added) {
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
  },
  handleData (data, event) {
    if (data === null) {
      console.error('????')
    }
    if (this._input === null) {
      // this.clear()
      // update instances of course...
      return
    }
    let elem = this
    elem._self = elem.origin
    console.log('handleData:', elem, '||', elem.origin)
  }
}

exports.properties = {
  $collection (val) {
    this.$ = val
    if (val) {
      this.on('reference', this.handleCollection)
    }
  },
  $ (val) {
    this.$ = val
    if (val) {
      this.on('reference', this.handleData)
    }
  }
}
