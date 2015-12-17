var SubsEmitter = require('vigour-js/lib/observable/subscribe/constructor')
var execInternal = SubsEmitter.prototype.execInternal
var Element = require('../element')
var rendered = {
  rendered: true
}

exports.properties = rendered

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
          if (bind._input) {
            let parent = bind
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
      }
    })
  }
}

Element.prototype.set({
  properties: rendered
})
