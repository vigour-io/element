'use strict'

var dictionary = require('./')
var Operator = require('vigour-js/lib/operator')
var set = Operator.prototype.set

exports.inject = require('vigour-js/lib/operator/all')

exports.properties = {
  $dictionary: new Operator({
    define: {
      set: function (val) {
        arguments[0] = dictionary.get(val, val)
        set.apply(this, arguments)
      }
    },
    key: '$dictionary',
    operator: function (val, operator, origin) {
      return operator.val
    }
  })
}
