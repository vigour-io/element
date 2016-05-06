'use strict'
exports.id = contextId
// REMOVE IT!!! ITS DIRTY FACE
// ----------------- TRY TO REMOVE THIS -------------------
// will remove this -- have one loop for both s and t there you can find your own index and loop -- easy
// so for now just send an array of keys? for every thing -- a map or try to store it in its own array
// thats prob even better
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
    // cl will go as well
    if (!_.cl) {
      _.cl = {}
    }
    _.cl[id] = contextId(nextChild)
  }
}

// THIS NEEDS TO GO! this is extremely slow ofcoure
// fix by doing addsubscriber after iterator
function isNotStatic (obs) {
  return obs.isStatic ? void 0 : obs.$ ? true : obs.each(isNotStatic)
}

function contextId (obs) {
  // not path but contexts or just a counter is also fine (as long as its unqiue)
  return 'c-' + obs.uid() + '-' + obs.path().join('-')
}
