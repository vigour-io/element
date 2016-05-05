'use strict'
module.exports = function generateContextId (obs) {
  // not path but contexts or just a counter is also fine (as long as its unqiue)
  return 'c-' + obs.uid() + '-' + obs.path().join('-')
}
