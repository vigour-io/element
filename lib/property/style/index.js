'use strict'
const getParent = require('../../render/dom/parent')
const props = require('../../render/static').property

exports.components = {
  style: require('./type')
}

exports.properties = {
  style: {
    type: 'property',
    render: {
      static (target, pnode) {
        props(target, pnode)
      },
      state (target, state, type, stamp, subs, tree, id, pid) {
        const pnode = getParent(type, stamp, subs, tree, pid)
        if (!pnode._styleStaticParsed) {
          props(target, pnode)
          pnode._styleStaticParsed = true
        }
      }
    },
    inject: [
      require('./px'),
      require('./transform')
    ],
    Child: { type: 'style' }
  }
}
