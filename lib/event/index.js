// do nothing! this has to be restrutured later
var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  module.exports = require('./browser')
}
