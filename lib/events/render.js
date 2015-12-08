var SubsEmitter = require('vigour-js/lib/observable/subscribe/constructor')
var execInternal = SubsEmitter.prototype.execInternal

exports.properties = {
  rendered: true
}

exports.on = {
  properties: {
    render: new SubsEmitter({
      pattern: {
        $upward: {
          rendered: true
        }
      },
      define: {
        execInternal (bind) {
          var parent = bind
          while (parent) {
            if (parent.rendered) {
              break
            }
            parent.setKey('rendered', true)
            parent = parent.parent
          }
          return execInternal.apply(this, arguments)
        }
      }
    })
  }
}
