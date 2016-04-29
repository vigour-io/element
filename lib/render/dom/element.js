'use strict'
const create = require('./create')

exports.define = {
  render: {
    value: {
      dom (state, type, stamp, subs, tree, ptree, pnode, uid) {
        var domNode = tree._ && tree._[uid]
        if (type === 'remove') {
          if (domNode) {
            domNode.parentNode.removeChild(domNode)
            delete tree._[uid]
          }
        } else if (!domNode) {
          domNode = create(this, state, type, stamp, subs, tree, ptree, pnode, uid)
        }
        return domNode
      },
      hscript (state, type, stamp, subs, tree, ptree, pnode, uid) {

      },
      canvas (state, type, stamp, subs, tree, ptree, pnode, uid) {

      }
    }
  }
}
