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
  return 'c-' + obs.uid() + '-' + obs.path().join('-')
}
