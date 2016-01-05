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
      self = parent.refOrigin
      if (self) {
        // console.log('yo!', field)
        // also needs to be better ofc
        let a = self.retrieve(field)
        // console.log(a)
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
  // var keyx = element.key
  element.each(function (prop, key) {
    var a = attach
    let mytarget
    if (prop.$) {
      if (prop.$ === true) {
        prop = prop.set(target, event) || prop
      } else {
        console.log('do prop lezzzzz go lets do it', prop.$, element.path, (prop.refOrigin || target).retrieve(prop.$))

        mytarget = target.retrieve(prop.$)

        // if (!target) {
        prop = prop.set(mytarget, event) || prop
        // }
        // needs to add listener of course if it cant find!
        console.log('xxxx',  prop.$, mytarget,  prop.refOrigin)
      }
      a = prop
    }
    // console.log('???????WALK', mytarget)
    walker(prop, prop.refOrigin || target, a, event)
  }, function (prop, key) {
    if (prop instanceof Prop && !isNode) { // make better later
      let prop$ = prop.$
      if (prop$) {
        let lvl = element._contextLevel
        let cntxt = element._context
        console.log('target????', prop$, target)
        target.subscribe(prop$, 'data', [ function (data, event) {
          var cntxt2, lvl2
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
          var node = element.getNode()
          if (node) {
            element[key].render(node, event, element)
          }
        }, attach])
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
      // update instances of course...
      return
    }
    let elem = this
    let self = elem.refOrigin
    if (self) {
      self.each(function (prop, key) {
        elem = elem.setKey(key, { val: prop }, event) || elem
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
