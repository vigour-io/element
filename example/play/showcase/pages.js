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
merge(components, require('../components/pages'))

// need to refactor plauer to just object
// components.player = require('../../../lib/player')
// console.log(components.player)
// this is of course not the way have to clean up later
var data = require('./data')
var app = global.app = e({
  key: 'app',
  components: components,
  pages: {
    discover: {
      type: 'discover',
      $: 'discover'
    },
    shows: {
      type: 'shows',
      $: 'shows'
    },
    movies: {
      type: 'movies',
      $: 'movies'
    },
    channels: {
      type: 'channels',
      $: 'channels'
    },
    mixed: { type: 'mixed' }
    // player: { type: 'player' }
  },
  DOM: document.body
})

// console.error(data)
// app.pages.player.val = data.movies.g()

app.val = data
