'use strict'
var doc = require('./delegator')
var Property = require('../property')
exports.properties = {
  domEvent: new Property({
    render () {}, //fix this..
    Child: {
      render (val, properties) {
        var key = this.key
        // find the correct context for this node.. pretty hard but must be doable
        var context = this.storeContext()
        // will not work for the colleciton yet of course..
        // habe to fix later
        // check if parent has listeners
        if (this.parent.parent._on && this.parent.parent._on[key]) {
          // share these anon functions heavy!
          properties['ev-' + key] = (ev) => {
            this.applyContext(context)
            this.parent.parent.emit(key)
          }
        }
      }
    }
  })
}

exports.on = {
  Child: {
    define: {
      key: {
        set (val) {
          this.parent.parent.set({
            domEvent: {
              [val]: true
            }
          })
          this._key = val
        },
        get (val) {
          return this._key
        }
      }
    }
  }
}
