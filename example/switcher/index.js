'use strict'
require('../style.css')
const s = require('vigour-state/s')

const render = require('../../lib/render')
const elem = {
  key: 'app',
  switcher: {
    $: 'navigation.$switch',
    map (state, type, stamp, subs, tree, sType) {
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
        $: 'field',
        text: 'Show:',
        title: {
          text: {
            $: 'show-title'
          }
        }
      },
      discover: {
        $: 'field',
        text: 'Discover:',
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
      field: {
        'show-title': 'awesome show!'
      }
    },
    discoverData: {
      field: {
        'dis-title': 'discover it!'
      }
    }
  }
})

document.body.appendChild( render(elem, state, () => {}))
