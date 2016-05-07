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
  return 'c' + genCid(obs, obs.uid())
}

// do bitshiftt later vs "c" -- then we need to do it in the order as well!
// or even beter just in uid() on element
// no mixed types def faster
function genCid (obs, val) {
  if (obs.__c) {
    if (obs.__c && obs._cLevel === 1) {
      return val + genCid(obs.__c, obs.__c.uid())
    } else {
      return val + genCid(obs._parent, obs._parent.uid())
    }
  } else {
    return val
  }
}
