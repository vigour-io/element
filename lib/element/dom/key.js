'use strict'

exports.define = {
  key: {
    set: function (val) {
      var node = this.node
      if (node) {
        this.setNodeKey(node, val)
      }
      this._key = val
    },
    get: function () {
      return this._key
    }
  }
}
