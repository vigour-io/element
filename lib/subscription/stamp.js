'use strict'
module.exports = function (base) {
  var _on = base.on
  base.set({
    properties: {
      _lstamp: true
    },
    define: {
      on (type, val) {
        if (val.$map && this.$) {
          this.$(val.$map(), void 0, false, val)
        }
        return _on.apply(this, arguments)
      }
    },
    on: {
      data: {
        lstamp (data, event) {
          var parent = this._parent
          while (parent && parent._lstamp !== event.stamp) {
            parent._lstamp = event.stamp
            if (parent._on.data.base) {
              parent.emit('data', data, event) // may be too heavy
            }
            parent = parent._parent
          }
        }
      }
    }
  })
  base.inject(require('../util/each'))
}
