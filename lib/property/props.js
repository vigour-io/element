'use strict'
const getParent = require('../render/dom/parent')
const props = require('../render/static').property

exports.properties = {
  props: {
    type: 'property',
    render: {
      static: props,
      state (target, state, type, stamp, subs, tree, id, pid) {
        const pnode = getParent(type, stamp, subs, tree, pid)
        if (!pnode._staticIsParsed) {
          // would be nice to have an option on props/element that says 'does static' or something ?
          props(target, pnode)
          pnode._staticIsParsed = true
        }
      }
    },
    Child: {
      render: {
        static (target, pnode) {
          pnode.setAttribute(target.key, target.compute())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          const pnode = getParent(type, stamp, subs, tree, pid)
          pnode.setAttribute(target.key, target.compute(state.compute()))
        }
      }
    }
  }
}
