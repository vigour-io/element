'use strict'
module.exports = function (obs) {
  return 'c-' + obs.uid() + '-' + obs.path().join('-')
}
