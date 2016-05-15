'use strict'
const props = require('../render/static').property
const getParent = require('../render/dom/parent')
const raf = global.requestAnimationFrame

exports.class = {
  properties: {
    focus: {
      render: {
        static (target, pnode, store) {
          target.collect(target.compute(), store, target.uid())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          const pnode = getParent(type, stamp, subs, tree, pid)
          const focus = state.compute()
          var focused
          if (focus) {
            const mypath = pnode._s.sid()
            if (focused = target.compute(focus.sid() === mypath)) {
              const rootfocus = focus.getRoot().focus
              if (rootfocus && rootfocus.compute().sid() === mypath) {
                pnode.focus()
                if (document.activeElement !== pnode) {
                  raf(() => pnode.focus())
                }
              }
            }
          }
          target.collect(focused, target.getStore(tree, pid + 'class'), id)
        }
      }
    }
  }
}

exports.properties = {
  focus (val) {
    this.hasEvents = true
    if (!this.props || !this.props.tabindex) {
      this.setKey('props', { tabindex: 0 }, false)
    }
    this.set({
      class: { focus: val },
      on: { focus: { focus } }
    }, false)
  }
}

function focus (e) {
  const target = e.target
  const elem = target._
  if (elem) {
    const f = elem.class.focus
    if (f && '$' in f) {
      focusstate(target._s)
    }
  }
}

function focusstate (state) {
  const focus = state.lookUp('focus')
  const rootfocus = focus.getRoot().focus
  rootfocus.set(focus)
  focus.set(state)
}