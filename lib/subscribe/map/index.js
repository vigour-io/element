'use strict'
const subscriber = require('./subscriber')
const iterator = require('./iterator')
// const switcher = require('./type/switcher')
// const collection = require('./type/collection')
const normal = require('./type')
const traveler = require('./type/traveler')

exports.define = {
  $map (map) {
    var returnValue
    if (!map) {
      console.warn('CREATE MAP', this.path().join('/'))
      returnValue = map = this._$map = { _: {} }
    }
    this.isStatic = null
    if (this.$) {
      if (!returnValue) { returnValue = true }
      if (this.isSwitcher) {
        // map = switcher(this, map)
      } else if (this.isCollection) {
        // map = collection(this, map)
      } else {
        map = normal(this, map)
      }
    } else if (iterator(this, map) || returnValue) {
      map = traveler(this, map)
      if (!returnValue) { returnValue = true }
    }
    return returnValue || this.hasEvents && false
  }
}
