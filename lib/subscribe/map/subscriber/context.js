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
  // not path but contexts or just a counter is also fine (as long as its unqiue)
  return 'c-' + genCid(obs, obs.uid())
}

//obs.uid() + '-' + obs.cParent().path().join('-') + '-' + (obs.key || '$any')
function genCid (obs, val) {
  if (obs.__c) {
    return val + genCid(obs.__c, obs.__c.uid())
  }
  return val
}