'use strict'
const props = require('../render/static').property
const getParent = require('../render/dom/parent')

exports.properties = {
  focus (val) {
    this.set({
      class: {
        focus: val
      },
      focusInternal: val
    }, false)
  },
  focusInternal: {
    type: 'property',
    render: {
      static () {},
      state (target, state, type, stamp, subs, tree, id, pid) {
        if (state === state.getRoot().focus.val) {
          const pnode = getParent(type, stamp, subs, tree, pid)
          console.log('focus!', pnode)
        } else {

        }
      }
    }
  }
}