require('./style.less')

var e = require('../../e')

var merge = require('lodash/object/merge')
var components = {}
merge(components, require('./components/img'))
merge(components, require('./components/item'))
merge(components, require('./components/list'))
merge(components, require('./components/text'))

var app = global.app = e({
  key: 'app',
  components: components,
  Child: {
    title: {
      type: 'title',
      text ()  {
        return this.parent.parent.key
      }
    }
  },
  images: {
    thumb: { type: 'thumb' },
    poster: { type: 'poster' },
    img: { type: 'img' }
  },
  items: {

  },
  DOM: document.body
})

app.render()
