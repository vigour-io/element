'use strict'
exports.properties = {
  $ (val) {
    this.$ = val
  },
  $any: true,
  noState: true,
  defaultSubscription: true,
  render (val) {
    this.define({ render: val })
  }
}

exports.inject = require('./map')
