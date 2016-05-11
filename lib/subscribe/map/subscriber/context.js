'use strict'
exports.id = contextId
// ----------------- TRY TO REMOVE ORDER/CL ONE CASE -------------------
exports.order = function (_, id, obs, parent) {
  const index = obs.index
  if (index !== void 0) {
    const keys = parent.keys()
    let nextChild = parent[keys[index + 1]]
    if (
      nextChild &&
      nextChild.isElement &&
      !nextChild.isNotStatic &&
      nextChild.__c &&
      (!_.cl || !_.cl[id])
    ) {
      if (!_.cl) { _.cl = {} }
      _.cl[id] = contextId(nextChild)
    }
  }
}

function contextId (obs) {
  if (obs.storeContextKey) {
    return 'c' + obs.cParent().key + '-' + genCid(obs)
  } else {
    return 'c' + genCid(obs)
  }
}

function genCid (obs) {
  if (obs.__c) {
    if (obs._cLevel === 1) {
      return obs.uid() + '' + genCid(obs.__c)
    } else {
      return obs.uid() + '' + genCid(obs._parent)
    }
  } else {
    return obs.uid()
  }
}
