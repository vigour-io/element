'use strict'
const cid = require('./id')
// parent subs
module.exports = function subscriber (target, obs, type, id, parent) {
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
        for (let id in obs.c) {
          target._.c[id] = obs.c[id]
        }
      }
      // clean this up as well
      if (obs.cl) {
        if (!target._.cl) {
          target._.cl = {}
        }
        for (let id in obs.cl) {
          target._.cl[id] = obs.cl[id]
        }
      }
    } else {
      for (let id in obs[type]) {
        subscriber(target, obs[type][id], type, id)
      }
    }
  } else {
    let _ = target._
    if (!target._) {
      target._ = _ = { p: parent }
    }
    let pid
    // parent selector -- parent is allways the pnode parent (first traveler)
    if (!id) {
      if (obs.__c) {
        id = cid(obs)
        const parent = obs.cParent()
        pid = parent.__c ? cid(parent) : parent._uid
        // REMOVE IT!!! ITS DIRTY FACE
        // ----------------- TRY TO REMOVE THIS -------------------
        // will remove this -- have one loop for both s and t there you can find your own index and loop -- easy
        // so for now just send an array of keys? for every thing -- a map or try to store it in its own array
        // thats prob even better
        if (obs.isElement) {
          const keys = parent.keys()
          const index = obs.index
          if (index === void 0) {
            throw new Error('NO INDEX -- ALLWAYS WRONG ' + obs.path().join('.'))
          }
          let nextChild = parent[keys[index + 1]]
          if (
            nextChild &&
            nextChild.isElement &&
            nextChild.__c &&
            (!_.cl || !_.cl[id]) &&
            isNotStatic(nextChild)
          ) {
            // cl will go as well
            if (!_.cl) {
              _.cl = {}
            }
            _.cl[id] = cid(nextChild)
          }
        }
        // -----------------------------------------------------------
      } else {
        // this is the only place where we call id!
        id = obs.uid()
      }
    }
    if (!_[type]) { _[type] = {} }

    if (!pid) {
      pid = obs._parent && obs._parent.uid()
    }

    console.log('SUBSCRIBER!', type, id, obs.path().join('/'))
    if (!_[type][id]) {
      _[type][id] = obs
      if (type === 'd') {

      } else {
        if (type === 's') {
          if (!_.sList) { _.sList = [] }
          _.sList.unshift(id, pid || false, obs)
        }
        if (!_.tList) { _.tList = [] }
        _.tList.unshift(id, pid || false, obs)
      }
    }
  }
  return target
}

// THIS NEEDS TO GO! this is extremely slow ofcoure
// fix by doing addsubscriber after iterator
function isNotStatic (obs) {
  return obs.isStatic ? void 0 : obs.$ ? true : obs.each(isNotStatic)
}
