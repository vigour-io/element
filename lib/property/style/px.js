'use strict'
// feels dirty -- maybe better to just not do this...
const getParentNode = require('../../render/dom/parent')
const isNumber = require('vigour-util/is/number')
const pxval = { type: 'px' }
const properties = {}
const pxprops = [
  'width',
  'height',
  'left',
  'right',
  'bottom',
  'top'
]

for (var i = 0; i < pxprops.length; i++) {
  properties[pxprops[i]] = pxval
}

exports.components = {
  px: {
    type: 'style',
    render: {
      dom (state, type, stamp, subs, tree, ptree, pnode) {
        if (!pnode) {
          let parent = this.parent
          pnode = getParentNode(parent.uid(), parent, state, type, stamp, subs, tree, ptree)
        }
        let val = state ? this.compute(state.val) : this.compute()
        pnode.style[this.key] = isNumber(val) ? val + 'px' : val
      }
    }
  }
}

exports.properties = properties
