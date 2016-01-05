'use strict'
var Element = require('../')
var isNode = require('vigour-js/lib/util/is/node')
var Prop = require('../../property')

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
        // also needs to be better ofc
        let a = self.get(field)
        return a ? a.parseValue() : 'smurky'
      }
      parent = parent.parent
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

function walker (element, target, attach, event) {
  element.each(function (prop, key) {
    var a = attach
    if (prop.$) {
      console.log('yo!', '???', prop.$, target)
      if (prop.$ === true) {
        // prop._self =
        prop.set((prop._self || target), event)
      } else {
        prop._self = (prop._self || target).get(prop.$)
        prop.set(prop._self, event)
      }
      a = prop
    }
    walker(prop, prop._self || target, a, event)
  }, function (prop, key) {
    if (prop instanceof Prop && !isNode) { // make better later
      let prop$ = prop.$
      if (prop$) {
        // USE SUBS
        let property = target.get(prop$)
        if (property) {
          property.on('data', [ function (data, event) {
            // store from resolved cntx
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
    if (this._input === null) {
      // this.clear()
      // update instances of course...
      return
    }
    let elem = this
    let self = elem._self = elem.origin
    if (self) {
      console.log(elem.path, self.path)
      self.each(function (prop, key) {
        console.log(key)
        elem = elem.setKey(key, void 0, event) || elem
        elem[key]._self = prop
        walker(elem[key], prop, elem, event)
      })
      elem._self.on('property', function (data, event) {
        if (this._input === null) {
          elem.clear()
        } else {
          // make or reuse event!
          if (data.removed) {
            for (let i in data.removed) {
              elem[data.removed[i]].remove(event)
            }
          }
          if (data.added) {
            for (let i in data.added) {
              console.log('xxxxxx?????', elem)
              elem = elem.setKey(data.added[i], void 0, event) || elem
              elem[data.added[i]]._self = this[data.added[i]]
              walker(elem[data.added[i]], this[data.added[i]], elem, event)
            }
          }
        }
      })
    }
    // handle property changes here -- first we need property datas!
    // this.origin.subscribe(val + '.$property', function () {})
    // event.trigger()
  },
  handleData (data, event) {
    if (this._input === null) {
      return
    }
    let elem = this
    elem._self = elem.origin
  }
}

exports.properties = {
  $collection (val) {
    this.$ = val // this is nice
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
