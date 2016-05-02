'use strict'
module.exports = function (obs) {
  // console.warn(obs.storeContext())
  return 'c-' + obs.uid() + '-' + obs.path().join('-')
}
