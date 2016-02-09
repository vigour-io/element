var Element = require('./lib/index.js') // becomes ./element
var isPlain = require('vigour-js/lib/util/is/plainobj')
module.exports = function (set, event) {
  var Constructor = Element
  if (!event) {
    event = false
  }
  if (set instanceof Array) {
    let tempset
    if (isPlain(set[0])) {
      tempset = set[0]
      if (!tempset.inject) {
        tempset.inject = []
      } else if (!(tempset.inject instanceof Array)) {
        tempset.inject = [ tempset.inject ]
      }
      tempset.inject = tempset.inject.concat(set.slice(1))
    } else if (set[0] instanceof Element) {
      Constructor = set[0].Constructor
      tempset = { inject: set.slice(1) }
    }
    return new Constructor(tempset, event)
  } else {
    if (set instanceof Element) {
      Constructor = set.Constructor
    }
    return new Constructor(set, event)
  }
}
