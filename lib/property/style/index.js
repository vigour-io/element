'use strict'
const getParentNode = require('../../render/dom/parent')
const props = require('../../render/nostate').property
const isNumber = require('vigour-util/is/number')
const px = { type: 'px' }

exports.properties = {
  style: {
    type: 'property',
    render (state, type, stamp, subs, tree, ptree, rtree, pnode, uid) {
      if (!this.parent._cachedNode) { // check if this is ok to use
        if (!pnode) {
          pnode = getParentNode(uid, this, state, type, stamp, subs, tree, ptree, rtree)
        }
        if (pnode) {
          props(this, type, stamp, subs, tree, ptree, rtree, pnode)
        }
      }
    },
    components: {
      px: {
        type: 'property',
        render: render,
        $transform (val) {
          if (isNumber(val)) {
            return val + 'px' // -- make this a easy to use property "px"
          }
        }
      }
    },
    properties: {
      width: px,
      height: px,
      left: px,
      top: px,
      bottom: px,
      right: px
    },
    Child: { render: render }
  }
}

function render (state, type, stamp, subs, tree, ptree, rtree, pnode) {
  if (!pnode) {
    let parent = this.parent
    pnode = pnode || getParentNode(parent.uid(), parent, state, type, stamp, subs, tree, ptree, rtree)
  }
  let val = state ? this.compute(state.val) : this.compute()
  // this can be optmized make the top part in a function
  // this is the render internal thing -- then px is also not nessecary --- better to go specific (way way faster)
  pnode.style[this.key] = val
}
