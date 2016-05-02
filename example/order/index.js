'use strict'
require('../style.css')
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')
// -------------------------
const s = require('vigour-state/s')

const elem = {
  key: 'app',
  components: {
    thingy: {
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
        $: 'titlethree',
        text: {
          $: 'title'
        }
      }
    }
  },
  hoho: {
    type: 'thingy',
    four: {
      $: 'titlefour',
      text: {
        $: 'title'
      }
    }
  }
}

// elem.hoho.beforeThree = {
//   insertBefore: 'three',
//   text: 'i want to be before three!'
// }

elem.hoho.first = {
  // order: -1,
  order: {
    $: 'order'
  },
  text: 'i want to be the first!'
}



const state = s({
  haha: {
    order: -1,
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
