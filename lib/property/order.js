'use strict'
var compute = require('vigour-observable').prototype.compute

exports.properties = {
  order: {
    type: 'property',
    render: {
      static () {},
      state () {}
    },
    define: {
      compute (val, previousVal, stamp, origin) {
        val = compute.call(this, val, previousVal, stamp, origin)
        return typeof val === 'number' ? val : 0
      }
    }
  }
}
