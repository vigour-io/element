'use strict'
exports.properties = {
  $ (val) {
    if (val instanceof Array) {
      this._$path = val
    } else if (typeof val === 'string' && /\./.test(val)) {
      this._$path = val.split('.')
    } else {
      this._$path = null
    }
    this.$ = val
  },
  _$path: true,
  $any: true,
  isStatic: true,
  defaultSubscription: true,
  render (val) {
    this.define({ render: val })
  }
}

exports.inject = require('./map')
