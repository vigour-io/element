'use strict'
exports.properties = {
  $ (val) {
    if (val instanceof Array) {
      this._$length = val.length
    } else if (typeof val === 'string' && /\./.test(val)) {
      let cnt = 1
      let i = 1
      if (/\$switch/.test(val)) {
        this.isSwitcher = true
      }
      for (; i < val.length; i++) {
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
  isSwitcher: true,
  defaultSubscription: true,
  render (render) {
    this.define({ render })
  },
  map (map) {
    this.define({ map })
  }
}

exports.inject = require('./map')
