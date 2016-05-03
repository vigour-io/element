'use strict'
const Observable = require('vigour-observable')
const clearKeys = Observable.prototype.clearKeys

module.exports = new Observable({
  type: 'property',
  inject: require('../subscribe'),
  Child: 'Constructor',
  defaultSubscription: true,
  define: {
    clearKeys (target) {
      this._staticProps = void 0
      clearKeys.apply(this, arguments)
    }
  }
}, false)
