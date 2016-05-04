'use strict'
exports.properties = {
  $ (val) {
    if (val instanceof Array) {
      this._$length = val.length
    } else if (typeof val === 'string' && /\./.test(val)) {
      let cnt = 1
      for (let i = 0; i < val.length; i++) {
        if (val[i] === '.') { cnt++ }
      }
      this._$length = cnt
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
    this.define({
      render: val
    })
  }
}

exports.inject = require('./map')
