'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

var a = global.a = new Observable({
  val: 'a val',
  flups: 'a flup',
  gurkens: 'a gurkens'
})

var thing = new Element({
  text: a,
  xxx: {
    text:'xxxx'
  },
  css: {
    $: 'flups'
  }
})

var x = new Element({
  yo: {
    text: 'yooooo'
  }
})

var y = new x.Constructor({
  yo: new Element({
    text: 'gurk'
  })
})

var thing2 = new Element({
  flups: new thing.Constructor()
})

// var bla = new thing2.flups.Constructor()

app.set({
  tx: new Element({})
  // tx: new thing2.Constructor()
})

var m = {}
console.log(app.tx.$map(void 0, void 0, m), m)
// console.log(app.tx.storedmap)

app.tx.set({
  // bla: {
  //   text: {
  //     $: 'gurkens'
  //   }
  // },
  // xx: y,
  // yy: new x.Constructor()
})

var m = {}
console.log('?', JSON.stringify(app.tx.$map(void 0, void 0, m), false, 2 ), m)
// lets fix!
// app.tx.val = a

console.log('lets inject')
var b = new Element({
  bitchez: {
    living: {
      room: {
        text: 'ugh'
      }
    }
  },
  inject: new thing2.Constructor({
    bitchez: {
      noway: {
        text: 'gozee'
      }
    },
    xxx: true,
    properties: {
      gurk: function (val) {
        this.gurk = val
      }
    },
    define: {
      yuzi: function () {

      }
    },
    gurk: 'smoops',
    ChildConstructor: new Element({ blurf: {} })
  })
})

app.tx.set({
  bb: new b.Constructor({
    ChildConstructor: {
      james: { text: 'yo!' }
    }
  })
})

app.tx.set({
  bb: new b.Constructor({
    ChildConstructor: {
      james: { text: 'yex' } //check maybe allways make new?
    }
  })
})

console.log(b.gurk, b, app.tx.bb.ChildConstructor.prototype.james.text.val)
