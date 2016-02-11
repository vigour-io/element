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
  },
  DOM: document.body
})

app.val = data
