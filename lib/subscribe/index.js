'use strict'
exports.properties = {
  $ (val) {
    if (
      typeof val === 'string' &&
      (val = val.split('.')) ||
      val instanceof Array
    ) {
      let length = val.length
      const last = val[length - 1]
      // if (last === '$switch') {
      //   this.isSwitcher = true
      // } else
      if (last === '$any') {
        this.isCollection = true
        length -= 1
      } else if (this.isSwitcher) {
        this.isSwitcher = null
      } else if (this.isCollection) {
        this.isCollection = null
      }
      this._$length = length
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
