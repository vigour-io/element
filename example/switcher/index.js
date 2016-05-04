'use strict'
require('../style.css')
const s = require('vigour-state/s')

const render = require('../../lib/render')
const elem = {
  key: 'app',
  holder: {
    $: 'navigation',
    // temp solution!
    $switch: true,
    map (state, type, stamp, subs, tree, sType) {
      console.log('map:---->', state.key)
      if (state.key === 'episodeData') {
        return 'episode'
      } else if (state.key === 'discoverData') {
        return 'discover'
      }
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
        text: 'Discover:',
        title: {
          text: {
            $: 'dis-title'
          }
        }
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
      'dis-title': 'discover it!'
    }
  }
})

document.body.appendChild( render(elem, state, function (state, type, stamp, subs, tree, sType) {
  console.log('%cFIRE', 'color: white;background-color: #333; padding: 2px;', state.path().join('/'), ' - ', type, ' - ', sType || 'normal', '\n\n')
  console.log('tree:', tree)
}))
