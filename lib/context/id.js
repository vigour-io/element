'use strict'
module.exports = function generateContextId (obs) {
  return 'c-' + obs.uid() + '-' + obs.path().join('-')
}
