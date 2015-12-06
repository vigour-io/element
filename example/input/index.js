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
  require('../../lib/property/attributes'),
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  // require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

var Input = new Element({
  node: 'input',
  attributes:{
    placeholder:'placeholder smeiz'
  },
  text: {
    $: 'topbar.text'
  },
  on: {
    click () {
      var node = this.node
      if (document.activeElement !== node) {
        var holder = this.parent
        holder.set({
          y: -this.node.offsetTop + 65
        })
        holder.once('transitionend', () => {
          node.focus()
          this.once('blur', function () {
            holder.y.val = 0
          })
        })
      }
    },
    input () {
      this.text.origin.set(this.node.value)
    }
  }
}).Constructor

var app = new App({
  node: document.body,
  topbar: {
    text: {
      val: 'topbar'
    }
  },
  holder: {
    input:new Input()
  }
})