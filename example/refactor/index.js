'use strict'
var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')

var app = new Element({
  DOM: document.body
})

var list = new Observable({
  shows: {
    1: { title: 'xxx' },
    2: { title: 'yyy' }
  }
})

var list2 = new Observable({
  shows: {
    1: { title: 'hhh' },
    2: { title: 'hihih' }
  }
})

var bla = new Observable({
  title: {
    val: 'YUZI!',
    blurf: 'hahahaha!',
  },
  x: 100
})

// of course normal obs dont rly update have to handle that with subs --
// will be done subs is injectable enhances set boom

// update from 'sbscribeble or something give it a good name -- that can be used anywhere'
// this will make update buble up! amaze ballz!

app.set({
  key: 'app',
  on: {
    click () {
      console.log('whatttt?', this.path)
    }
  },
  bla: {
    type: 'img',
    x: bla.x, // DOES NOT LISTEN YET WILL BE FIXED! e.g. add on -- only when ref (else it just fires)
    attributes: {
      src: { $: 'title.blurf' }
    },
    on: {
      click () {
        console.log('jixen!', this.path)
        this.set({
          type: 'h1',
          x: 300,
          text: 'haha node flips'
        })
      }
    },
    css: {
      yuzi: {
        $: 'title',
        jurk: {
          $: 'blurf'
        }
      }
      // make it possible to put stuff on props jus tuse the same shit
    },
    val: bla
  },
  bla2: {
    Child: {
      text: { $: 'title' },
      w: 100,
      gurken: {
        html: '<h1>blurf</h1>' // parse need path prob
      }
    },
    $collection: 'shows',
    val: list
  }
})

setTimeout(function () {
  app.bla2.val = list2
}, 500)

// rename vjs to observable
