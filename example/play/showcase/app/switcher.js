require('./style.less')

var e = require('../../../../e')
// for dev only
var merge = require('lodash/object/merge')
// default on element components are swithcer carousel and player
var components = {
  // carousel: require('../../../../lib/carousel'),
  switcher: require('../../../../lib/switcher'),
  // player: require('../../../../lib/player')
}

// small
merge(components, require('../components/icon'))
merge(components, require('../components/text'))
merge(components, require('../components/img'))
merge(components, require('../components/button'))
merge(components, require('../components/progress'))


// medium
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

data.set({
  state: {
    app: [ '$', 'discover' ],
    modal: {},
    focus: {}
  },
  mixed: {
    publishers: [ '$', 'publishers' ],
    channels: [ '$', 'channels' ]
  }
})

function inPath(path, key) {
  for (var i = 0 , len = path.length; i < len; i++) {
    if (path[i] === key) {
      return true
    }
  }
}

var app = global.app = e({
  key: 'app',
  components: components,
  inject: [
    require('./buttons'),
    {
      components: {
        player: {
          // inject: require('../../../../lib/player/bitdash'),
          // config: {
            // apiKey: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b'
          // }
        }
      }
    }
  ],
  switcher: {
    type: 'switcher',
    css: 'page',
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
      } else if (inPath(path, 'channels')) {
        return 'channel'
      }
    },
    properties: {
      show: { type: 'show' },
      channel: { type: 'channel' },
      discover: { type: 'discover' },
      movies: { type: 'movies' },
      movie: { type: 'page-video' }, // this one
      channels: { type: 'channels' },
      mixed: { type: 'mixed' },
      publishers: { type: 'discover' }
    }
  },
  DOM: document.body
})

// temp witcher
app.switcher.val = data.state.app
