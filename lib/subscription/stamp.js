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
    //   property: {
    //     dataKeys (data) {
    //       this._speshkeys = []
    //       // this.each((p, key) => {
    //       //   if (p._input !== null) {
    //       //     this._speshkeys.push(key)
    //       //   }
    //       // })
    //     }
    //   },
      data: {
        lstamp (data, event) {
          var parent = this
          while (parent && parent._lstamp !== event.stamp) {
            parent._lstamp = event.stamp
            if (parent._on.data.base) {
              for (var i in parent._on.data.base) {
                if (parent._on.data.base[i] && parent._on.data.base[i].patch) {
                  parent._on.data.base[i].patch()
                }
              }
            }
            parent = parent._parent
          }
        }
      }
    }
  })

}
