'use strict'
module.exports = {
  properties: {
    _lstamp: true
  },
  on: {
    data: {
      lstamp (data, event) {
        // this needs improvement
        // we can use this on the hubs as well -- stamp info
        // just go up an send it out when someone reqs --- same system
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
}
