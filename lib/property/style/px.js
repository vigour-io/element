'use strict'
// feels dirty -- maybe better to just not do this...
const getParentNode = require('../../render/dom/parent')
const unit = require('./util').appendUnit
const pxval = { type: 'px' }
const properties = {}
const pxprops = [
  'width',
  'height',
  'left',
  'right',
  'bottom',
  'top',
  'margin',
  'padding'
]

for (let i = 0; i < pxprops.length; i++) {
  properties[pxprops[i]] = pxval
}

exports.components = {
  px: {
    type: 'style',
    render (state, type, stamp, subs, tree, pnode) {
      if (this.noState) {
        pnode.style[this.key] = unit(this.compute(), 'px')
      } else {
        if (!pnode) {
          pnode = getParentNode(this.parent, state, type, stamp, subs, tree)
        }
        pnode.style[this.key] = unit(state ? this.compute(state.val) : state.val, 'px')
      }
    }
  }
}

exports.properties = properties
