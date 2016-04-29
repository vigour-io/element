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
    render (state, type, stamp, subs, tree, pnode) {
      if (this.noState) {
        pnode.style[this.key] = withUnit(this.compute())
      } else {
        if (!pnode) {
          pnode = getParentNode(this.parent, state, type, stamp, subs, tree)
        }
        pnode.style[this.key] = withUnit(state ? this.compute(state.val) : state.val)
      }
    }
  }
}

exports.properties = properties

function withUnit (val) {
  return isNumber(val) ? val + 'px' : val
}
