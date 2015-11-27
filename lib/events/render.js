var SubsEmitter = require('vigour-js/lib/observable/subscribe/constructor')
var execInternal = SubsEmitter.prototype.execInternal
var Base = require('vigour-js/lib/base')

exports.properties = {
  rendered: true
}

exports.on = {
  properties: {
    render: new SubsEmitter({
      define: {
        execInternal (bind) {
          var parent = bind
          while (parent) {
            parent.setKey('rendered', true)
            parent = parent.parent
          }
          console.log('RENDER!')
          return execInternal.apply(this, arguments)
        },
        generateConstructor () {
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
