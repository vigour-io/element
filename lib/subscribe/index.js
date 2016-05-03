'use strict'
exports.properties = {
  $ (val) {
    if (val instanceof Array) {
      this._$length = val.length
    } else if (typeof val === 'string' && /\./.test(val)) {
      // find a faster way (just count the dots!)
      this._$length = val.split('.').length
    } else {
      this._$length = null
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
