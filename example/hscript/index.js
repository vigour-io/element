'use strict'

// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const Element = require('../../lib/element')
const render = require('../../lib/render')

require('html-element')

// -------------------------
const app = new Element({
  key: 'app',
  props: {
    testAttr:true
  },
  holder: {
    text: 'every one is having...',
    thing: {
      text: '...fun with hscript'
    }
  }
}, false)

console.log('\nresult:\n\n', render(app).outerHTML)