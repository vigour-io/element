'use strict'
var Observable = require('vigour-js/lib/observable')
// var Element = require('../../')
module.exports = function (element) {
  // var Element
  exports.define = {
    $map: require('./map'), // wrong not with $....
    handleReference (val, event, oldVal) {
      var valIsObservable = val instanceof Observable
      if (valIsObservable) {
        this._input = val
        if (this.$) {
          if (val.$ && !this.lookUp('storedmap')) {
            var subsmap = (this.hasOwnProperty('storedmap') && this.puremap) || (this.puremap = {})
            this.renderData(val, oldVal, event, void 0, void 0, subsmap)
            // console.warn('total\n', JSON.stringify(this.storedmap, false, 2))
            val.$(subsmap, this)
          } else {
            this.renderData(val, oldVal, event)
          }
        }
      } else if (oldVal instanceof Observable) {
        if (this.$) {
          if (val.$) {
            this.renderData(val, oldVal, event, void 0, void 0)
            // val.$(subsmap, true)
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
    // temp _$remove,
    __$root: true,
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

  element.set(exports)
  // if (!node) {}
  element._$remove = false
}
