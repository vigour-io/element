'use strict'
require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Carousel = require('../../lib/carousel')
var Element = require('../../lib')

var app = global.app = new Element({
  DOM: document.body
})

var cnt = 0

var list = new Observable({
  focus: 'one',
  one: {
    title: 'one'
  },
  two: {
    title: 'two'
  },
  three: {
    title: 'three'
  },
  four: {
    title: 'four'
  }
})

app.set({
  carousel: new Carousel({
    $: true,
    val: list,
    items: {
      Child: {
        html: {
          $: 'title'
        }
      },
      $collection: true
      // one: {
      //   html: 'one'
      // },
      // two: {
      //   html: 'two'
      // },
      // three: {
      //   html: 'three'
      // },
      // four: {
      //   html: 'four'
      // },
      // focusChild: 'one'
    }
  }),
  button: {
    h: 100,
    w: '50%',
    type: 'button',
    html: 'left',
    on: {
      click (e, event) {
        app.carousel.items.setKey('animateLeft', ++cnt)
        app.carousel.items.postpone('carousel', function () {
          var obj = {}
          var length = -1
          console.log('---->',this)
          this.each(function (prop, key) {
            console.log('??---->',key)
            var index = prop.flex.order.val
            obj[index] = prop
            length++
          })
          obj[0].flex.setKey('order', length)
          for (var i = 1; i <= length; i++) {
            obj[i].flex.setKey('order', i - 1)
          }
          this.setKey('marginLeft', cnt)
        }, 300)
      }
    }
  },
  button2: {
    h: 100,
    w: '50%',
    type: 'button',
    html: 'right',
    on: {
      click (e, event) {
        app.carousel.items.setKey('animateLeft', --cnt)
        app.carousel.items.postpone('carousel', function () {
          var obj = {}
          var length = -1
          this.each(function (prop, key) {
            var index = prop.flex.order.val
            obj[index] = prop
            length++
          })
          obj[length].flex.setKey('order', 0)
          for (var i = 0; i < length; i++) {
            obj[i].flex.setKey('order', i + 1)
          }
          this.setKey('marginLeft', cnt)
        }, 300)
      }
    }
  }
})
