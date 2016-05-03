'use strict'
const getParentNode = require('../render/dom/parent')

exports.properties = {
  domEvents: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      if (!pnode) {
        pnode = getParentNode(this, state, type, stamp, subs, tree)
      }
      pnode._ = this.parent
    }
  }
}

exports.on = {
  Child: {
    define: {
      eventCache: {
        value: {}
      },
      key: {
        set (val) {
          this.parent.parent.setKey('domEvents', true)
          const cache = this.eventCache
          if (!cache[val]) {
            cache[val] = true
            global.addEventListener(val, function (e) {
              let target = e.target
              do {
                if (target._) {
                  target._.emit(val, e)
                }
              } while ((target = target.parentNode))
            })
          }
          this._key = val
        },
        get (val) {
          return this._key
        }
      }
    }
  }
}
