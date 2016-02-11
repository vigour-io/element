require('./style.less')

var e = require('../../e')

var merge = require('lodash/object/merge')
var components = {}
merge(components, require('./components/progress'))
merge(components, require('./components/icon'))
merge(components, require('./components/text'))
merge(components, require('./components/img'))
merge(components, require('./components/item'))
merge(components, require('./components/list'))

var data = require('./data')

var app = global.app = e([{
  key: 'app',
  components: components,
  // images: {
  //   // need order for this of course
  //   thumb: { type: 'thumb' },
  //   poster: { type: 'poster' },
  //   img: { type: 'img' }
  // },
  // items: {
  //   item: { type: 'item' },
  //   channel: { type: 'item-channel' },
  //   video: { type: 'item-video' },
  //   poster: { type: 'item-poster' },
  //   row: { type: 'item-row' }
  // },
  lists: {
    list: {
      type: 'list',
      $collection: 'shows'
    },
    grid: {
      type: 'grid',
      $collection: 'shows'
    },
    ['gird-flex']: {
      type: 'grid-flex',
      $collection: 'shows'
    },
    'horizontal': {
      type: 'list-horizontal',
      $collection: 'shows'
    },
    'discover': {
      type: 'list-discover',
      $collection: 'shows'
    },
    'video-horizontal': {
      type: 'list-horizontal',
      $collection: 'videos',
      Child: { type: 'item-video' }
    },
    channels: {
      type: 'list-horizontal',
      $collection: 'channels',
      Child: { type: 'item-channel' }
    },
    movies: {
      type: 'list-horizontal',
      $collection: 'shows',
      Child: { type: 'item-poster' }
    }
  },
  DOM: document.body
}, {

  // components: {
  //   thumb: {
  //     src: { $add: '/gideon.flups' }
  //   }
  // }

}])

app.val = data
