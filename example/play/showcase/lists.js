require('./style.less')
var e = require('../../../e')

var merge = require('lodash/object/merge')
var components = {}
merge(components, require('../components/progress'))
merge(components, require('../components/icon'))
merge(components, require('../components/text'))
merge(components, require('../components/img'))
merge(components, require('../components/item'))
merge(components, require('../components/list'))
// this is of course not the way have to clean up later

var data = require('./data')

var app = global.app = e({
  key: 'app',
  components: components,
  lists: {
    list: {
      type: 'list',
      $collection: 'shows.items'
    },
    grid: {
      type: 'grid',
      $collection: 'shows.items'
    },
    flexGrid: {
      type: 'grid-flex',
      $collection: 'shows.items'
    },
    'horizontal': {
      type: 'list-horizontal',
      $: 'shows'
    },
    'discover': {
      type: 'list-discover',
      $: 'shows'
    },
    'video-horizontal': {
      type: 'list-horizontal',
      $: 'shows',
      list: { Child: { type: 'item-video' } }
    },
    channels: {
      type: 'list-horizontal',
      $: 'channels',
      list: { Child: { type: 'item-channel' } }
    },
    movies: {
      type: 'list-horizontal',
      $: 'movies',
      list: { Child: { type: 'item-poster' } }
    }
  },
  DOM: document.body
})

app.val = data
