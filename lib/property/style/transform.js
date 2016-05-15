'use strict'
const getParent = require('../../render/dom/parent')
const prefix = require('vigour-ua/navigator').prefix
const unit = require('./util').appendUnit
const transform = prefix + 'Transform'

exports.properties = {
  transform: {
    type: 'group',
    render: {
      static (target, pnode) {
        pnode.style[transform] = target.storeStatic(pnode)
      },
      state (target, state, type, stamp, subs, tree, uid, pid) {
        const pnode = getParent(type, stamp, subs, tree, pid)
        pnode.style[transform] = target.storeState(state, type, stamp, subs, tree, pid + 'transform', pid)
      }
    },
    properties: {
      x: {
        render: {
          static (target, pnode, store) {
            x(store, target.compute())
          },
          state (target, state, type, stamp, subs, tree, uid, pid) {
            x(target.getStore(tree, pid + 'transform'), target.compute(state))
          }
        }
      },
      y: {
        render: {
          static (target, pnode, store) {
            y(store, target.compute())
          },
          state (target, state, type, stamp, subs, tree, uid, pid) {
            y(target.getStore(tree, pid + 'transform'), target.compute(state))
          }
        }
      },
      rotate: {
        render: {
          static (target, pnode, store) {
            rotate(store, target.compute())
          },
          state (target, state, type, stamp, subs, tree, uid, pid) {
            rotate(target.getStore(tree, pid + 'transform'), target.compute(state))
          }
        }
      },
      scale: {
        render: {
          static (target, pnode, store) {
            scale(store, target.compute())
          },
          state (target, state, type, stamp, subs, tree, uid, pid) {
            scale(target.getStore(tree, pid + 'transform'), target.compute(state))
          }
        }
      }
    }
  }
}

function x (store, val) {
  if (!store[2]) { store[2] = '0,0)' }
  store[1] = 'translate3d(' + unit(val, 'px') + ','
}

function y (store, val) {
  if (!store[1]) { store[1] = 'translate3d(0,' }
  store[2] = unit(val, 'px') + ', 0)'
}

function rotate (store, val) {
  store[3] = 'rotate(' + unit(val, 'deg') + ')'
}

function scale (store, val) {
  store[4] = 'scale(' + val + ')'
}