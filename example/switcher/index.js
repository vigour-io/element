'use strict'
require('../style.css')
const s = require('vigour-state/s')

const render = require('../../lib/render')
const elem = {
  key: 'app',
  switcher: {
    class: 'basic-item',
    $: 'navigation.$switch',
    map (state, type, stamp, subs, tree, sType) {
      console.log('%cmap:', 'color: blue', state.path())
      if (state.key === 'showData') {
        return 'show'
      } else if (state.key === 'discoverData') {
        return 'discover'
      }
    },
    Child: {
      class: 'complex-item'
    },
    properties: {
      show: {
        text: 'Show!',
        title: {
          text: {
            $: 'show-title'
          }
        }
      },
      discover: {
        text: 'Discover!',
        title: {
          text: {
            $: 'dis-title'
          }
        }
      }
    }
  },
  sick: {
    class: 'basic-item',
    text: 'switch page',
    on: {
      click () {
        console.log('----click----')
        const navigation = state.navigation
        navigation.set(navigation.val === state.content.showData
          ? '$root.content.discoverData'
          : '$root.content.showData')
      }
    }
  }
}

const state = s({
  navigation: '$root.content.showData',
  content: {
    showData: {
      // field: {
        'show-title': 'awesome show!'
      // }
    },
    discoverData: {
      // field: {
        'dis-title': 'discover it!'
      // }
    }
  }
})

var treex
var topsubs
document.body.appendChild( render(elem, state,
  (state, type, stamp, nsubs, tree, sType, subs, rTree) => {
 treex = rTree
 topsubs = subs
}))

console.log('rSubs:', topsubs)
console.log('rTree', treex)

// setTimeout(function () {
//   state.set({

//   })
// })