'use strict'
require('../style.css')
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')
// -------------------------
const s = require('vigour-state/s')

const elem = {
  key: 'app',
  hoho: {
    $: 'haha',
    one: {
      $: 'titleone',
      text: {
        $: 'title'
      }
    },
    middleman: {
      sneaky: {
        text: 'im inbetween one and two!'
      }
    },
    two: {
      $: 'titletwo',
      text: {
        $: 'title'
      }
    },
    three: {
      $:  'titlethree',
      text: {
        $:  'title'
      }
    },
    four: {
      $:  'titlefour',
      text: {
        $:  'title'
      }
    }
  }
}

const state = s({
  haha:{
    titleone: {
      title: 'one title'
    },
    titlefour: {
      title: 'four title'
    }
  }
})

console.log('----render')
document.body.appendChild(render(elem, state))
console.log('----rendered')
console.log('\n\n-------set some new stuff')

state.set({
  haha: {
    titletwo: {
      title: 'two title'
    }
  }
})

state.set({
  haha: {
    titlethree: {
      title: 'three title'
    }
  }
})
