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
          // so this does not fire for everyone...
          var parent = this
          while (parent && parent._lstamp !== event.stamp) {
            parent._lstamp = event.stamp
            if (parent._on.data.base && parent !== this) {
              parent.emit('data', data, event) // may be too heavy
            }
            parent = parent.parent
          }
        }
      }
    }
  })
  base.inject(require('vigour-js/lib/base/keys'))
}
