'use strict'
var isNumber = require('vigour-js/lib/util/is/number')
exports.properties = {
  $: function (val) {
    if (val !== true && !(val instanceof Array)) {
      if (!val || typeof val === 'object') {
        throw new Error('wrong type for .$ pass a string, number or Array')
      }
      if (isNumber(val)) {
        val = val + ''
      }
      val = val.split('.')
    }
    this.$ = val
  },
  $collection: function (val) {
    this.setKey('$', val)
    this.$collection = this.$
  }
}
