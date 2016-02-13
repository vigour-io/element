'use strict'
var e = require('../../../../e')
require('!style!css!less!./style.less')
var merge = require('lodash/object/merge')
var data = require('../data')
var components = {
  carousel: require('../../../../lib/carousel'),
  switcher: require('../../../../lib/switcher'),
  player: require('../../../../lib/player')
}
merge(components, require('../components/progress'))
merge(components, require('../components/icon'))
merge(components, require('../components/text'))
merge(components, require('../components/img'))
merge(components, require('../components/item'))
merge(components, require('../components/list'))
merge(components, require('../components/pages'))


// merge(components, require('../components/player'))
var app = global.app = e([
  {
    key: 'app',
    components: components,
    pages: {
      // video: { type: 'page-video' },
      show: { type: 'show' }
    },
    DOM: document.body
  },
  {
    components: {
      player: {
        inject: require('../../../../lib/player/bitdash'),
        config: {
          apiKey: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b'
        },
        volume: 0
      }
    }
  }
])


console.info(data.shows)

data.shows.g().set({
  currentEpisode: data.shows.g().seasons.firstChild().episodes.firstChild()
})
// app.pages.video.val = data.movies.g()
// app.pages.show.val = data.shows.items[2071]
// app.pages.publisher.val = data.publishers.g()
app.val = data.shows.g()
