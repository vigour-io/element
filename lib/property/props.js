'use strict'
const getParent = require('../render/dom/parent')
const props = require('../render/static').property

exports.properties = {
  props: {
    type: 'property',
    properties: { staticIsParsed: true },
    render: {
      static: props,
      state (target, state, type, stamp, subs, tree, id, pid) {
        console.log('interessting its state!', target.path().join('/'), id, pid)
        const pnode = getParent(type, stamp, subs, tree, pid)
        if (!this.staticIsParsed) {
          // would be nice to have an option on props/element that says 'does static' or something ?
          props(target, pnode)
          console.log('renderStaticProps! -- this is nasty need to do both here...')
          console.log('classify as static render? make that into an option?')
          this.staticIsParsed = true
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
          console.log('more interessting its a nested state!', target.path().join('/'), id, pid)
        }
      }
    }
  }
}

/*
  render (state, type, stamp, subs, tree, pnode, id, pid) {
      // may not be strong enough -- dont inspect statiProps before render!
      if (!this._staticProps || !this.cParent()._cachedNode) {
        if (!pnode) {
          pnode = getParent(state, type, stamp, subs, tree, pid)
        }
        props(this, type, stamp, subs, tree, pnode)
      }
    },
*/

/*
 render (state, type, stamp, subs, tree, pnode, id, pid) {
        // this will become a setting pid ONE UP vs parent
        console.error('warn prop need to make a setting for CORRECT PID')
        if (this.isStatic) {
          pnode.setAttribute(this.key, this.compute())
        } else {
          if (!pnode) {
            pnode = getParent(state, type, stamp, subs, tree, pid)
          }
          pnode.setAttribute(this.key, this.compute(state.compute()))
        }
      }
    }
*/