'use strict'
require('../style.css')
const s = require('vigour-state/s')

const render = require('../../lib/render')
const elem = {
  key: 'app',
  switcher: {
    class: 'holder',
    $: 'navigation',
    $switch: true,
    map (state, type, stamp, subs, tree, sType) {
      if (state.key === 'episodeData') {
        return 'episode'
      } else if (state.key === 'discoverData') {
        return 'discover'
      }
    },
    Child: {
      class: 'complex-item'
    },
    properties: {
      episode: {
        $: 'field',
        text: 'Episode:',
        title: {
          text: {
            $: 'ep-title'
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
    staticIndex: 1,
    class: 'basic-item',
    text: 'buttonballz',
    on: {
      click () {
        const navigation = state.navigation
        state.navigation.set(navigation.val === state.content.episodeData
          ? '$root.content.discoverData'
          : '$root.content.episodeData')
      }
    }
  }
}

const state = s({
  navigation: '$root.content.episodeData',
  content: {
    episodeData: {
      field: {
        'ep-title': 'awesome episode!'
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
