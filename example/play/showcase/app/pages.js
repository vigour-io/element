'use strict'

var e = require('../../../../e')

require('./style.less')

var merge = require('lodash/object/merge')
var data = require('../data')

var components = {
  carousel: require('../../../../lib/carousel'),
  switcher: require('../../../../lib/switcher'),
  player: require('../../../../lib/player')
}

components.player.inject({
  inject: require('../../../../lib/player/bitdash'),
  config: {
    apiKey: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b'
  }
})



merge(components, require('../components/progress'))
merge(components, require('../components/icon'))
merge(components, require('../components/text'))
merge(components, require('../components/img'))
merge(components, require('../components/item'))
merge(components, require('../components/list'))
merge(components, require('../components/pages'))
merge(components, require('../components/carousel'))


// do set on the type
// merge(components, require('../components/player'))
var Observable = require('vigour-js/lib/observable')

var datax = new Observable({
  key: '111',
  Child: Observable,
  img: {
    val: 'http://www.vier.be/sites/default/files/programma/erik-dsmtw.png'
  },
  number: {
    val: 1
  },
  title: {
    val: 'Aflevering van 12 oktober: Kevin Janssens, Kim Clijsters en Sam Louwyck'
  },
  time: {
    val: 0.5
  },
  duration: {
    val: 4020
  },
  video: {
    val: 'https://s3-eu-west-1.amazonaws.com/sbsvigour/output/111700_794541d68c8c4fbe47407aaaaa70ceef/{type}s/111700.{type}'
  },
  description: {
    val: 'In de allereerste aflevering van een nieuw seizoen nemen Kim Clijsters, Kevin Janssens en Sam Louwyck het tegen elkaar op.'
  }
})

var app = global.app = e({
  key: 'app',
  components: components,
  inject: [{
    components: {
      player: {
        inject: require('../../../../lib/player/bitdash'),
        config: {
          apiKey: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b'
        }
      }
    }
  }],
  pages: {
  //   discover: {
  //     type: 'discover',
  //     $: 'discover'
  //   },
  //   shows: {
  //     type: 'shows',
  //     $: 'shows'
  //   },
  //   movies: {
  //     type: 'movies',
  //     $: 'movies'
  //   },
  //   channels: {
  //     type: 'channels',
  //     $: 'channels'
  //   },
  //   mixed: { type: 'mixed' },
    video: { type: 'page-video' }
    // show: { type: 'show' },
    // publisher: { type: 'publisher' }
  },
  DOM: document.body
})

// app.pages.video.val = data.movies.g()
// app.pages.show.val = data.shows.items[2071]
// app.pages.publisher.val = data.publishers.g()

console.info('---->', app.pages.video)
app.pages.video.val = datax//data.movies.g()
console.log(data, app.pages.videox)
