'use strict'
require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Carousel = require('../../lib/carousel')
var Element = require('../../lib')

var app = global.app = new Element({
  DOM: document.body
})

Observable.prototype.inject(require('vigour-element/lib/subscription/stamp'))

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
  }// ,
  // four: {
  //   title: 'four'
  // }
})

app.set({
  carousel: new Carousel({
    w: 300,
    val: list,
    items: {
      Child: {
        html: {
          $: 'title'
        }
      },
      $collection: true
    }
  }),
  button: {
    h: 100,
    w: '50%',
    // type: 'button',
    html: 'left',
    on: {
      down (e, event) {
        this.parent.carousel.previous()
      }
    }
  },
  button2: {
    h: 100,
    w: '50%',
    // type: 'button',
    html: 'right',
    on: {
      down (e, event) {
        this.parent.carousel.next()
      }
    }
  }
})
