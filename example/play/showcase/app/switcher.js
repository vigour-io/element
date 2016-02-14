require('./style.less')

var e = require('../../../../e')
// for dev only
var merge = require('lodash/object/merge')
// default on element components are swithcer carousel and player
var components = {
  // carousel: require('../../../../lib/carousel'),
  switcher: require('../../../../lib/switcher'),
  player: require('../../../../lib/player')
}

// small
merge(components, require('../components/icon'))
merge(components, require('../components/text'))
merge(components, require('../components/img'))
merge(components, require('../components/button'))
merge(components, require('../components/progress'))
merge(components, require('../components/logo'))
merge(components, require('../components/loader'))

// medium
merge(components, require('../components/sidebar'))
merge(components, require('../components/carousel'))
merge(components, require('../components/item'))
merge(components, require('../components/list'))

// large
merge(components, require('../components/pages'))
merge(components, require('../components/carousel'))

// need to refactor plauer to just object
// components.player = require('../../../../lib/player')
// console.log(components.player)
// this is of course not the way have to clean up later
// ------

var data = require('../data')
var Event = require('vigour-js/lib/event')

data.set({
  state: {
    app: {
      val: [ '$', LANDING ],
      on: {
        data (data, event) {
          if (event.type !== 'url') {
            // window.history.pushState(event.stamp, 'haha', '/' + this.origin.path.join('/'))
          }
        }
      }
    },
    modal: {},
    focus: {}
  }
}, false)

const LANDING = 'discover'
// this will be a hub thing if no url then use hub value or go to discover
// like a default operator on page

window.addEventListener('popstate', readUrl)
function readUrl (ev) {
  // webpack-dev-server/
  var parsed = window.location.href.replace(/https?:\/\//, '')
  var url = parsed.split('/').slice(1)
  var event = new Event('url')
  data.state.app.set(data.get(url[0] || LANDING), event)
  event.trigger()
}
readUrl()

function inPath (path, key) {
  for (var i = 0, len = path.length; i < len; i++) {
    if (path[i] === key) {
      return true
    }
  }
}

console.clear()
console.log(components)

var app = global.app = e({
  key: 'app',
  components: components,
  inject: [
    {
      components: {
        player: {
          inject: require('../../../../lib/player/bitdash'),
          config: {
            apiKey: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b'
          }
        }
      }
    }
  ],
  sidebar: {
    type: 'sidebar'
  },
  main: {
    $: 'state.app',
    navbar: {},
    switcher: {
      type: 'switcher',
      $put: true,
      mapProperty (key, val) {
        console.log('yo?', key, val, val.path)
        var path = val.path
        if (inPath(path, 'episodes')) {
          return 'page-video' // do something else later -- need to set current show
        } if (inPath(path, 'movies')) {
          return 'movie'
        } else if (inPath(path, 'shows')) {
          return 'show'
        } else if (inPath(path, 'videos')) {
          return 'video'
        } else if (inPath(path, 'channels')) {
          return 'channel'
        } else if (inPath(path, 'publishers')) {
          return 'publisher'
        }
      },
      properties: {
        show: { type: 'show' },
        shows: { type: 'shows' },
        channel: { type: 'channel' },
        discover: { type: 'discover' },
        publisher: { type: 'discover' },
        movies: { type: 'movies' },
        movie: { type: 'page-video' }, // this one
        channels: { type: 'channels' },
        mixed: { type: 'mixed' },
        subscriptions: { type: 'channels' },
        video: { type: 'page-video' }
      }
    }
  },
  DOM: document.body
})

// temp witcher
app.val = data
