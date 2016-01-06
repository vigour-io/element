'use strict'
var Element = require('../')
var isNode = require('vigour-js/lib/util/is/node')
var Prop = require('../../property')
var Observable = require('vigour-js/lib/observable')
function defBind () {
  // wrong
  // return this.parent.parseValue()
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
      let old = parent
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

function walker (element, target, attach, event) {
  element.each(function (prop, key) {
    var a = attach
    let mytarget
    let nothin
    if (prop.$) {
      if (prop.$ === true) {
        // let old = prop._input
        prop = prop.set(target, event) || prop
        // prop._input = target
        // prop.refext(old, event)
      } else {
        mytarget = target.retrieve(prop.$)

        console.log(mytarget)
        if (!mytarget) {
          nothin = true
          console.error('now have to do shit', prop._path)
          target.subscribe(prop.$, 'data', function () {
            // needs to unsubscribe immediatly
            prop = prop.set(target.retrieve(prop.$), event) || prop
            walker(prop, prop.refOrigin, a, event)
          })
        } else {
          prop = prop.set(mytarget, event) || prop
        }
        // let old = prop._input
        // prop._input = mytarget
        // prop.refext(old, event)
      }
      a = prop
    }
    if (!nothin) {
      walker(prop, prop.refOrigin || target, a, event)
    }
  }, function (prop, key) {
    if (prop instanceof Prop && !isNode) { // make better later
      let prop$ = prop.$
      if (prop$) {
        let lvl = element._contextLevel
        let cntxt = element._context
        target.subscribe(prop$, 'data', function (data, event) {
          let cntxt2, lvl2
          if (cntxt) {
            if (element._context !== cntxt) {
              cntxt2 = element._context
              lvl2 = element._contextLevel
            }
            element._context = cntxt
            element._contextLevel = lvl
          }
          let node = element.getNode()
          if (node) {
            element[key].render(node, event, element)
          }
          if (cntxt2) {
            element._context = cntxt2
            element._contextLevel = lvl2
          }
        }, !!element.getNode())
        prop.clearContext() // handle this in each
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
      elem.each(function (p, key) {
        p.remove(event)
      }, (p) => p instanceof Element)
    }
    let self = elem.refOrigin
    if (self) {
      self.each(function (prop, key) {
        // so setkey is also wrong
        elem = elem.set({ [key]: prop }, event) || elem
        walker(elem[key], prop, elem, event)
        // elem[key].clearContext()
        // elem.clearContext()
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
  refext: true, // too dirty
  $collection (val) {
    this.$collection = val
    this.$ = val // this is nice
    if (val) {
      this.refext = function (data, event) {
        this.handleCollection(data, event)
      }
      // this.on('reference', this.handleCollection)
    }
  },
  $ (val) {
    // make .data??? what to do?
    this.$ = val
    if (val) {
      this.refext = function (data, event) {
        this.handleData(data, event)
      }
      // this.on('reference', this.handleData)
    }
  }
}
