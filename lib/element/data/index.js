'use strict'
var Observable = require('vigour-js/lib/observable')
var hash = require('vigour-js/lib/util/hash')

function $origin (val, target) {
  if (target) {
    if (val.$ !== true) {
      let temppath = val.$.split('.')
      let i = temppath.length
      while (i) {
        target = target.parent
        i--
      }
    }
  }
  return target
}

module.exports = function (element) {
  exports.define = {
    $origin: {
      get () {
        return $origin(this, this._input)
      }
    },
    $map: require('./map'), // wrong not with $....
    handleReference (val, event, oldVal) {
      var valIsObservable = val instanceof Observable
      if (valIsObservable) {
        this._input = val
        if (this.$) {
          if (oldVal instanceof Observable && oldVal.$) {
            if (this.hasOwnProperty('hashedPureMap')) {
              $origin(this, oldVal).$(null, event, void 0, this, this.hashedPureMap)
            }
          }
          // have to block some events
          if (val.$ && !this.parent || !this.parent.$collection) {
            // var smap =
            var subsmap = (this.hasOwnProperty('storedmap') && this.puremap) || (this.puremap = {})
            this.renderData(val, oldVal, event, void 0, void 0, subsmap)
            if (!this.hasOwnProperty('hashedPureMap')) {
              this.hashedPureMap = hash(JSON.stringify(subsmap))
            }
            val.$(subsmap, event, function () {
            }, this, this.hashedPureMap)
          } else {
            this.renderData(val, oldVal, event)
          }
        }
      } else if (oldVal instanceof Observable) {
        if (this.$) {
          if (oldVal.$) {
            if (this.hasOwnProperty('hashedPureMap')) {
              $origin(this, oldVal).$(null, event, void 0, this, this.hashedPureMap)
            }
          }
          // HANDLE REMOVAL of everything
          // this.renderData(val, oldVal, event, void 0, void 0) //something like null
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
