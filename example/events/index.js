'use strict'
var Element = require('../../lib/element')
var Event = require('vigour-js/lib/event')
var Observable = require('vigour-js/lib/observable')
var App = require('../../lib/engine/dom')
require('./style.less')

// Observable.prototype.inject(
//   require('vigour-js/lib/operator/add')
// )

Element.prototype.inject(
  require('../../lib/event/down'),
  require('../../lib/event/click'),
  require('../../lib/event/up'),
  require('../../lib/event/drag'),
  require('../../lib/event/move'),
  require('../../lib/event/render')
)

var app = new App({
  // holder: new Element({
  //   ChildConstructor:new Element({
  //     text: 'hahahaha',
  //     on: {
  //       click () {
  //         this.text.val = Math.random()
  //       }
  //     }
  //   }),
  //   $transform: new Observable({
  //     one: {},
  //     two: {},
  //     three: {}
  //   })
  // }),
  holder1: new Element({
    text: 'app.holder1',
    // inject: require('../../lib/event/render'),
    // rendered: {
    //   on: {
    //     data () {
    //       console.error('YOYOYO')
    //     }
    //   }
    // },
    // on: {
    //   render () {
    //     console.log('make it shine')
    //   }
    // },
    downer: {
      text: 'downer',
      // css: 'red',
      on: {
        mousedown () {
          this.text.val = Math.random()
          // this.text.clearContextUp()
          console.log('down', this.path, '->', this.text.path)
        }
      }
    },
    // upper: {
    //   text: 'upper',
    //   on: {
    //     mouseup () {
    //       this.text.val = Math.random()
    //       // this.text.clearContextUp()
    //     }
    //   }
    // },
    y: {
      // inject: require('../../lib/animation'),
      // $animation: {
      //   duration: 60
      // },
      val: 200,
      on: {
        data () {
          console.error('JAAAAAAAAAAA')
        }
      }
    }
  })
})

app.set({
  thing: new Element({
    text: 'thing with transform: app.holder1',
    y: {
      val: app.holder1.y,
      $transform (val) {
        return val / 2
      }
    }
  })
})

global.app = app

console.error('---------')
// app.holder.val
setTimeout(function () {
  app.holder1.y.val = 0
},1000)
