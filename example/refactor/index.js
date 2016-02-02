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
  x: 20
})

// of course normal obs dont rly update have to handle that with subs --
// will be done subs is injectable enhances set boom

// update from 'sbscribeble or something give it a good name -- that can be used anywhere'
// this will make update buble up! amaze ballz!
console.clear()

var Gurk = new Element({
  type: 'br',
  css: {
    james: 'xxx'
  }
}).Constructor

var Smuts = new Element({
  type: 'br',
  css: {
    james: 'xxx'
  }
}).Constructor

app.set({
  on: {
    click () {
      console.log('whatttt?', this.path)
    }
  },
  bla: new Gurk({
    type: 'img',
    bla: new Smuts(),
    x: bla.x, // DOES NOT LISTEN YET WILL BE FIXED! e.g. add on -- only when ref (else it just fires)
    attributes: {
      src: { $: 'title.blurf' }
    },
    on: {
      click (ev) {
        this.set({
          type: 'input',
          attributes: null,
          value: bla.x
        })
      },
      keyup (ev) {
        // fix origin for property ofcourse
        this.value.origin.val = ev.target.value
        this.patch()
      }
    },
    // css: {
    //   yuzi: {
    //     $: 'title',
    //     jurk: {
    //       $: 'blurf'
    //     }
    //   }
    //   // make it possible to put stuff on props jus tuse the same shit
    // },
    val: bla
  }),
  bla2: {
    Child: {
      text: { $: 'title' },
      w: 100
    },
    // so each collection has to have its own renderthing
    $collection: 'shows',
    val: list
  }
})

console.clear()
for (var i = 0; i < 10; i++) {
  list2.shows.set({
    [i]: {
      title: 'hux'
    }
  }, false)
}

setTimeout(function () {
  app.bla2.val = list2
}, 500)

// rename vjs to observable
