'use strict'
var Observable = require('vigour-js/lib/observable')
var hash = require('vigour-js/lib/util/hash')
module.exports = function (element) {
  exports.define = {
    $map: require('./map'), // wrong not with $....
    handleReference (val, event, oldVal) {
      var valIsObservable = val instanceof Observable
      if (valIsObservable) {
        this._input = val
        if (this.$) {
          if (oldVal instanceof Observable && oldVal.$) {
            if (this.hasOwnProperty('hashedPureMap')) {
              console.log('old removeit --------------->', this.path, this.hashedPureMap)
              oldVal.$(null, event, void 0, this, this.hashedPureMap)
            }
          }

          if (val.$ && !this.parent.$collection) {
            var subsmap = (this.hasOwnProperty('storedmap') && this.puremap) || (this.puremap = {})
            this.renderData(val, oldVal, event, void 0, void 0, subsmap)
            if (!this.hasOwnProperty('hashedPureMap')) {
              this.hashedPureMap = hash(JSON.stringify(subsmap))
            }

            console.log('new ! ???????--------------->', this.path, this.hashedPureMap)
            val.$(subsmap, event, function () {
            }, this, this.hashedPureMap)
          } else {
            this.renderData(val, oldVal, event)
          }
        }
      } else if (oldVal instanceof Observable) {
        if (this.$) {
          if (oldVal.$) {
            console.log('NOW HAVE TO REMOVE SUBSCRIBTION ITS SWITCHED!!!!!')
            if (this.hasOwnProperty('hashedPureMap')) {
              // $ (map, event, ready, attach, key) {
              // null, event, void 0, this, this.hashedPureMap
              oldVal.$(null, event, void 0, this, this.hashedPureMap)
            }
            // with nothing fix this!!!
          } else {
            // HANDLE REMOVAL
            this.renderData(val, oldVal, event, void 0, void 0)
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
    hashedPureMap: true,
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
  element._$remove = false
}

// speed tests for the attach loop (dirty one)
