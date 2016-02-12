require('./style.less')
var e = require('../../../e')
// for dev only
var merge = require('lodash/object/merge')
// default on element components are swithcer carousel and player
var components = {
  carousel: require('../../../lib/carousel'),
  switcher: require('../../../lib/switcher')
}

// small
merge(components, require('../components/icon'))
merge(components, require('../components/text'))
merge(components, require('../components/img'))
merge(components, require('../components/progress'))

// medium
merge(components, require('../components/item'))
merge(components, require('../components/list'))

// large
merge(components, require('../components/pages'))

// need to refactor plauer to just object
// components.player = require('../../../lib/player')
// console.log(components.player)
// this is of course not the way have to clean up later
// ------

var data = require('./data')

data.set({
  current: {}
})

var app = global.app = e({
  key: 'app',
  components: components,
  switcher: {
    type: 'switcher',
    $: true,
    mapProperty (key, val) {
      console.error('-- lets find correct shit--->', key)
      if (val.path.indexOf('movies') > 1) {
        return 'movies'
      } else {
        return 'discover' // or generic page
      }
    },
    properties: {
      show: { type: 'show' },
      discover: { type: 'discover' },
      movies: { type: 'movies' },
      channels: { type: 'channels' }
    }
  },
  DOM: document.body
})

app.switcher.val = data.current

setInterval(function () {
  data.current.val = data.shows.g()
}, 500)

