'use strict'
const getParent = require('../../render/dom/parent')
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
    render: {
      static (target, pnode) {
        pnode.style[target.key] = unit(target.compute(), 'px')
      },
      state (target, state, type, stamp, subs, tree, id, pid) {
        const pnode = getParent(type, stamp, subs, tree, pid)
        pnode.style[target.key] = unit(state
        ? target.compute(state.val)
        : target.compute(), 'px')
      }
    }
  }
}

exports.properties = properties
