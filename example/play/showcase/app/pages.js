'use strict'

var e = require('../../../../e')

require('!style!css!less!./style.less')

var merge = require('lodash/object/merge')
var data = require('../data')

var components = {
  carousel: require('../../../../lib/carousel'),
  switcher: require('../../../../lib/switcher')
  // player: require('../../../lib/player')
}
merge(components, require('../components/progress'))
merge(components, require('../components/icon'))
merge(components, require('../components/text'))
merge(components, require('../components/img'))
merge(components, require('../components/item'))
merge(components, require('../components/list'))
merge(components, require('../components/player'))
merge(components, require('../components/pages'))

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
    mixed: { type: 'mixed' },
    video: { type: 'page-video' },
    show: { type: 'show' },
    publisher: { type: 'publisher' }
  },
  DOM: document.body
})

// app.pages.video.val = data.movies.g()
// app.pages.show.val = data.shows.items[2071]
// app.pages.publisher.val = data.publishers.g()
app.val = data
