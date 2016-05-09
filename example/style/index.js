'use strict'
require('../style.css')
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')
// -------------------------
const s = require('vigour-state/s')
// -------------------------

const elem = {
  key: 'app',
  components: {
    thingy: {
      nested: {
        text: 'thingy.nested',
        style: {
          transform: {
            rotate: {
              $: 'rotate'
            },
            x: 50,
            y: 100
            // rotate:30,
            // scale:2
          },
          // height: { $: 'h' },
          border: '1px solid red'
        }
      }
    }
  },
  first: {
    type: 'thingy',
    $: 'thing'
  },
  second: {
    type: 'thingy',
    $: 'thing2'
  },
  third: {
    type: 'thingy',
    style: {
      transform: {
        scale: 2
      }
    }
  }
}

const state = s({
  thing:{
    // x:100,
    // y:20,
    rotate: 30
  },
  thing2:{
    h:200,
    rotate: 10
  }
})

document.body.appendChild(render(elem, state))
