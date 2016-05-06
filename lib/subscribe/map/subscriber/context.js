'use strict'
exports.id = contextId
// ----------------- TRY TO REMOVE ORDER/CL ONE CASE -------------------
exports.oder = function (_, id, obs, parent) {
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
    if (!_.cl) {
      _.cl = {}
    }
    _.cl[id] = contextId(nextChild)
  }
}

function contextId (obs) {
  // not path but contexts or just a counter is also fine (as long as its unqiue)
  return 'c-' + obs.uid() + '-' + obs.path().join('-')
}

// THIS NEEDS TO GO! this is extremely slow ofcoure
function isNotStatic (obs) {
  return obs.isStatic ? void 0 : obs.$ ? true : obs.each(isNotStatic)
}
