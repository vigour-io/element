require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var data = require('../content.json')
var App = require('../../lib/app')

Observable.prototype.inject(
  require('vigour-js/lib/operator/subscribe'),
  require('vigour-js/lib/operator/transform'),
  require('vigour-js/lib/operator/add')
)

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  // require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

var app = new App({
  node: document.body,
  topbar: {
    text: 'topbar'
  },
  holder: {
    input: {
      node: 'input',
      text: {
        $: 'topbar.text'
      },
      on: {
        click () {
          var holder = this.parent
          holder.set({
            y: -160
          })
          this.once('blur', function () {
            holder.y.val = 0
          })
          holder.once('transitionend', () => {
            this.node.focus()
          })
        },
        input () {
          console.log(this.text.origin)
          this.text.origin.set(this.node.value)
        }
      }
    }
  }
})
