'use strict'
var Observable = require('vigour-js/lib/observable')

exports.define = {
  $map: require('./map'), // wrong not with $....
  handleReference (val, event, oldVal) {
    var valIsObservable = val instanceof Observable
    if (valIsObservable) {
      this._input = val
      if (this.$) {
        if (val.$) {
          var subsmap = (this.hasOwnProperty('storedmap') && this.puremap) || (this.puremap = {})
          this.renderData(val, oldVal, event, void 0, void 0, subsmap)
          console.warn(JSON.stringify(subsmap, false, 2))
        } else {
          this.renderData(val, oldVal, event)
        }
      }
    } else if (oldVal instanceof Observable) {
      if (this.$) {
        if (val.$) {
          console.log('ok ok ok here! REMOVAL')
          val.$(false, this)
          this.renderData(val, oldVal, event, void 0, void 0)
        } else {
          this.renderData(val, oldVal, event)
        }
      }
    }
  }
}

exports.inject = [
  require('./walk'),
  require('./property')
]

exports.properties = {
  storedmap: true,
  puremap: true,
  $collection (val, event) {
    this.$collection = val
    this.properties.$.call(this, val, event)
  },
  $ (val, event) {
    this.$ = val
  }
}
