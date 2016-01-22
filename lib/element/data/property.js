'use strict'
var Base = require('vigour-js/lib/base')
var Prop = require('../../property')

function defBind () {
  return (this._contextLevel === 1 ? this._context : this._parent).parseValue()
}

function getit (field) {
  return function fieldbind () {
    var self
    var parent = this._contextLevel === 1 ? this._context : this._parent
    while (parent) {
      self = parent._input
      if (self) {
        let a = self.retrieve && self.retrieve(field)
        return a ? a.parseValue() : 'smurky:' + field
      }
      parent = parent._contextLevel === 1 ? parent._context : parent._parent // context if context else stop
    }
    return ''
  }
}

Prop.prototype.set({
  properties: {
    $storedmap: true,
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
    $map: require('./map'),
    origin: {
      get () {
        // without context polution!
        var field = this.$
        var reference = this
        if (field) {
          let self
          let parent = this._contextLevel === 1 ? (this._context || this._parent) : this._parent
          while (parent) {
            self = parent._input
            if (self) {
              let a = self.retrieve && self.retrieve(field)
              if (a) {
                return a
              }
            }
            parent = parent._contextLevel === 1 ? (parent._context || parent._parent) : parent._parent
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

exports.define = {
  // RENAME THIS not all dollarsigns
  $subscribeProperty (p, target, event) {
    var element = this
    if (p.$) {
      let cntxt = element._context
      let level = element._contextLevel
      let pCntxt
      let store
      if (element._context) {
        cntxt
        store = element.storeContext()
      }
      if (p._context) {
        pCntxt = true
      }
      let subscontext = cntxt ? store[store.length - 2] : element
      // console.warn('ok do it?', p.$, subscontext.uid, subscontext, store)
      target.subscribe(p.$, 'data', [ function (data, event) {
        // Element
        if (cntxt) {
          element.applyContext(store)
          p._context = cntxt
          p._contextLevel = level ? level + 1 : 1
        } else if (pCntxt) {
          p._context = element
          p._contextLevel = 1
        }
        let node = element.getNode()
        if (node) {
          p.render(node, event, element)
        }
      }, subscontext ], subscontext.uid + '.' + this.uid + element._path.join('.'))
    }
  }
}
