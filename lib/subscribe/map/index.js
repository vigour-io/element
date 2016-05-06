'use strict'
const add = require('./add')
const subscriber = require('./subscriber')
const iterator = require('./iterator')
const switcher = require('./type/switcher')
const collection = require('./type/collection')
const normal = require('./type')
const traveler = require('./type/traveler')

exports.define = {
  $map (map, prev) {
    var returnValue
    if (!map) {
      returnValue = map = this._$map = {}
    }
    this.isStatic = null
    var prevMap
    if (this.$) {
      prevMap = map
      if (!returnValue) { returnValue = true }
      if (this.isSwitcher) {
        map = switcher(this, map, prevMap)
      } else if (this.isCollection) {
        map = collection(this, map, prevMap)
      } else {
        map = normal(this, map, prevMap)
      }
      iterator(this, map, prevMap)
    } else if (iterator(this, map, prev) || returnValue) {
      traveler(this, map, prev)
      if (!returnValue) { returnValue = true }
    }
    return returnValue || this.hasEvents && false
  }
}
