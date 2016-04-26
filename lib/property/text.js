'use strict'
const getParentNode = require('../render/dom/parent')
exports.properties = {
  text: {
    type: 'property',
    render (state, type, stamp, subs, tree, ptree, rtree, pnode, uid) {
      if (this.noState && pnode) {
        pnode.appendChild(document.createTextNode(this.compute()))
      } else {
        const val = state ? this.compute(state.val) : this.compute()
        if (!tree._[uid]) {
          tree._[uid] = document.createTextNode(val)
          pnode = pnode || getParentNode(uid, this, state, type, stamp, subs, tree, ptree, rtree)
          if (!pnode) {
            console.error('NO PNODE!', this.path(), this.parent.path())
          } else {
            pnode.appendChild(tree._[uid])
          }
        } else {
          tree._[uid].nodeValue = val
        }
      }
    }
  }
}
