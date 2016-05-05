'use strict'
const cid = require('../../context/id')
// parent subs
module.exports = function subscriber (target, obs, type, uid) {
  if (typeof obs === 'object' && !obs._base_version) {
    if (!type) {
      if (obs.s) { subscriber(target, obs, 's') }
      if (obs.t) { subscriber(target, obs, 't') }
      if (obs.d) { subscriber(target, obs, 'd') }
      // clean this up a bit
      if (obs.c) {
        if (!target._.c) {
          target._.c = {}
        }
        for (let uid in obs.c) {
          target._.c[uid] = obs.c[uid]
        }
      }
      // clean this up as well
      if (obs.cl) {
        if (!target._.cl) {
          target._.cl = {}
        }
        for (let uid in obs.cl) {
          target._.cl[uid] = obs.cl[uid]
        }
      }
    } else {
      for (let uid in obs[type]) {
        subscriber(target, obs[type][uid], type, uid)
      }
    }
  } else {
    if (!target._) { target._ = {} }
    if (!uid) {
      if (obs.__c) {
        uid = cid(obs)
        const parent = obs.cParent()
        if (!target._.c) { target._.c = {} }
        target._.c[uid] = parent.__c ? cid(parent) : parent.uid()
        if (obs.isElement) {
          const keys = parent.keys()
          const index = obs.index
          if (index === void 0) {
            throw new Error('NO INDEX -- ALLWAYS WRONG ' + obs.path().join('.'))
          }
          let nextChild = parent[keys[index + 1]]
          // text is unfortunate
          if (!nextChild) {
            // console.error('yo?', obs, index)
          }

          if (
            nextChild &&
            nextChild.isElement &&
            nextChild.__c &&
            (!target._.cl || !target._.cl[uid]) &&
            isNotStatic(nextChild)
          ) {
            if (!target._.cl) {
              target._.cl = {}
            }
            target._.cl[uid] = cid(nextChild)
          }
        }
      } else {
        uid = obs.uid() // this is the only place where we call uid!
        // to fix all this crash the app after this
      }
    }
    if (!target._[type]) {
      target._[type] = {}
    }
    target._[type][uid] = obs
  }
  return target
}

// THIS NEEDS TO GO! this is extremely slow ofcoure
// fix by doing addsubscriber after iterator
function isNotStatic (obs) {
  return obs.isStatic ? void 0 : obs.$ ? true : obs.each(isNotStatic)
}
