'use strict'

module.exports = function (base) {
  var Base = base.Constructor
  var _addProperty = Base.prototype.addNewProperty
  var _remove = Base.prototype.remove
  // var _contextRemove = Base.prototype.contextRemove

  exports.properties = {
    _keylists: { val: [ '_keys' ] }
  }

  function isBase (val, key) {
    return val[key] instanceof Base
  }

  exports.define = {
    // use getter later
    keys (field = '_keys', check = isBase) {
      var keys = this.hasOwnProperty(field) && this[field]
      if (!keys && this.keys !== false) {
        keys = this[field] = []
        for (let key in this) {
          if (key[0] !== '_' && this[key] !== null && check(this, key)) {
            keys.push(key)
          }
        }
        if (!keys) {
          this._keys = false
        }
      }
      return keys
    },
    remove () {
      // console.error('remove it!')
      // this.clearKeysCache()
      if (this._parent) {
        this._parent.clearKeysCache()
      }
      return _remove.apply(this, arguments)
    },
    removeProperty () {
      // console.error('remove it!')
      this.clearKeysCache()
      return
    },
    clearKeysCache () {
      for (var i = 0, len = this._keylists.length; i < len; i++) {
        var keylist = this._keylists[i]
        if (this[keylist]) {
          this[keylist] = null
        }
      }
    },
    addNewProperty () {
      // console.error('add it!')
      this.clearKeysCache()
      return _addProperty.apply(this, arguments)
    }
  }
  base.set(exports)
}
