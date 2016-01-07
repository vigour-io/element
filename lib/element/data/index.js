'use strict'
var Base = require('vigour-js/lib/base')
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
      self = parent.refOrigin
      if (self) {
        // console.log('yo!', field)
        // also needs to be better ofc
        // console.log(self)
        let a = self.retrieve && self.retrieve(field)
        // console.log(a)
        return a ? a.parseValue() : ''
      }
      parent = parent.parent
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

function walker (element, target, attach, event) {
  element.each(function (prop, key) {
    var a = attach
    let mytarget
    if (prop.$) {
      if (prop.$ === true) {
        prop = prop.set(target, event) || prop
      } else {
        mytarget = target.retrieve(prop.$, function (segment) {
          // segment.on('reference', [ function (data, event) {
          // }, attach])
        })
        prop = prop.set(mytarget, event) || prop
      }
      a = prop
    }
    walker(prop, prop.refOrigin || target, a, event)
  }, function (prop, key) {
    if (prop instanceof Prop && !isNode) { // make better later
      let prop$ = prop.$
      if (prop$) {
        let lvl = element._contextLevel
        let cntxt = element._context
        target.subscribe(prop$, 'data', [ function (data, event) {
          let cntxt2, lvl2
          if (cntxt) {
            if (element._context !== cntxt) {
              cntxt2 = element._context
              lvl2 = element._contextLevel
            }
            element._context = cntxt
            element._contextLevel = lvl
            if (cntxt2) {
              element._context = cntxt2
              element._contextLevel = lvl2
            }
          }
          let node = element.getNode()
          if (node) {
            element[key].render(node, event, element)
          }
        }, attach], target.uid + '.' + element.uid + '.' + prop$, !!element.getNode())
      }
      return false
    }
    return prop instanceof Element
  })
}

exports.define = {
  walkData: walker,
  handleCollection (data, event) {
    if (this._input === null) {
      // this.clear()
      return
    }
    let elem = this
    if (data !== this._input && data) {
    // elem.each(function (p, key) {
    //   p.remove(event)
    // }, (p) => p instanceof Element)
    }
    let self = elem.refOrigin
    if (self) {
      self.each(function (prop, key) {
        elem = elem.setKey(key, prop, event) || elem
        walker(elem[key], prop, elem, event)
      })
      self.on('property', function (data, event) {
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
              elem = elem.setKey(data.added[i], this[data.added[i]].origin, event) || elem
              walker(elem[data.added[i]], this[data.added[i]], elem, event)
            }
          }
        }
      })
    }
  },
  handleData (data, event) {
    if (this._input === null) {
      return
    }
    let self = this.refOrigin
    if (self) {
      walker(this, self, this, event)
    }
    // let elem = this // needs to set _input with a field if nessecary!
  }
}

exports.properties = {
  refext: true,
  $collection (val) {
    this.$collection = val
    this.$ = val // this is nice
    if (val) {
      this.refext = this.handleCollection
      // this.on('reference', this.handleCollection)
    }
  },
  $ (val) {
    this.$ = val
    if (val) {
      this.refext = this.handleData
      // this.on('reference', this.handleData)
    }
  }
}
