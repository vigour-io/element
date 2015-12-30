var Emitter = require('vigour-js/lib/emitter')

exports.inject = require('../property/rendered')

exports.on = {
  properties: {
    render: new Emitter({
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            if (parent) {
              parent.parent.setKey('rendered', false, ev)
            }
            return Emitter.apply(this, arguments)
          }
        }
      }
    })
  }
}
