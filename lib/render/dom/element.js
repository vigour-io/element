'use strict'
const create = require('../hyperscript/create')
// TODO move this outside dom/element (not only dom)
exports.define = {
  render: {
    value: {
      dom (state, type, stamp, subs, tree, pnode, uid) {
        var domNode = tree._ && tree._[uid]
        if (type === 'remove') {
          if (domNode) {
            pnode.removeChild(domNode)
            delete tree._[uid]
          }
        } else if (!domNode) {
          domNode = create(this, state, type, stamp, subs, tree, pnode, uid)
        }
        return domNode
      },
      hyperscript (state, type, stamp, subs, tree, pnode, uid) {
        console.log('render it hscript:', state, type)
        var hNode = tree._ && tree._[uid]
        if (type === 'remove') {
          if (hNode) {
            // remove hNode
            // hNode.parentNode.removeChild(hNode)
            // delete tree._[uid]
          }
        } else if (!hNode) {
          hNode = create(this, state, type, stamp, subs, tree, pnode, uid)
        }
        return hNode
      }
    }
  }
}
