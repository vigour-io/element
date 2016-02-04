'use strict'
require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib')

Element.prototype.inject(
  require('../../lib/event/click'),
  require('../../lib/event/drag'),
  require('../../lib/property/scroll')
)

var app = global.app = new Element({
  key: 'app',
  DOM: document.body,
  clicker: {
    text: 'Click me!',
    on: {
      mousedown () {
        console.log('mousedown:magic!')
      },
      // enter () {
      //   console.error('!!')
      // }
    },
  },
    // thing: {
    //   type: 'button'
    // }
  // },
  // dragger: {
  //   type: 'button',
  //   text: 'Drag me!',
  //   on: {
  //     drag () {
  //       console.log('drag:magic!')
  //     }
  //   }
  // },
  scroller: {
    scrollTop: {
      animate: true,
      val: true,
      // on: {
      //   data () {
      //     console.log('scroll:data')
      //   }
      // }
    },
    Child: {
      text () {
        return this.parent._contextKey
      }
    },
    text: 'scroller',
    $collection: true,
    val: new Observable(['one', 'two', 'three', 'four', 'five', 'six', '- one', '- two', '- three', '- four', '- five', '- six'])
  },
  button: {
    type: 'button',
    text: 'SCROLL!',
    on: {
      click () {
        console.log('CLIEKC')
        app.scroller.scrollTop.val = Math.random() * 500
      }
    }
  }
})