var SubsEmitter = require('vjs/lib/observable/subscribe/emitter')
var execInternal = SubsEmitter.prototype.execInternal
var Base = require('vjs/lib/base')

exports.on = {
  properties: {
    render: new SubsEmitter({
      define: {
        execInternal: function (bind) {
          var parent = bind
          while (parent) {
            parent.rendered = true
            parent = parent.parent
          }

          return execInternal.apply(this, arguments)
        },
        generateConstructor: function () {
          return function derivedBase (val, event, parent, key) {
            Base.apply(this, arguments)
            this.setKey('pattern', {
              upward: {
                rendered: true
              }
            })
          }
        }
      }
    })
  }
}
