'use strict'
var e = require('../../e')
var data  = require('./data')

console.clear()

var bla = e({
  type: 'pre',
  text: 'lulllz'
})

console.log(bla)
// now nested components and proepries

var app = e([
  require('./todos'),
  {
    components: {
      bla: bla,
      todo: {
        type: 'div', // overwrites it
        text: { $: 'title' }
      }
    }
  },
  {
    components: {
      bla: {
        text: { $add: ' o yeeeeeah' }
      }
    },
    flurks: {
      components: {
        bla: {
          text: { $add: ' - ok nested flurks' }
        }
      },
      gurkens: {
        type: 'bla'
      }
    },
    xxx: {
      type: 'bla'
    }
  },
  { DOM: document.body }
])

global.app = app

app.set(data)

// use globals/document or something for document.body more portable
console.log(app)

// overwrite and properties fix it! (overwrite / merge thing and type differentiator)
// so if type is different it does not care
