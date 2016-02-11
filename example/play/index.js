require('./style.less')

var e = require('../../e')

var merge = require('lodash/object/merge')
var components = {}
// merge(components, require('./components/img'))
// merge(components, require('./components/item'))
// merge(components, require('./components/list'))
merge(components, require('./components/text'))

var app = global.app = e([{
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
  mybitch: {

  },
  // images: {
  //   thumb: { type: 'thumb' },
  //   poster: { type: 'poster' },
  //   img: { type: 'img' }
  // },
  // items: {
  //   showtje: {
  //     title: 'sjowtje'
  //   }
  // },
  DOM: document.body
}, {

  // components: {
  //   thumb: {
  //     src: { $add: '/gideon.flups' }
  //   }
  // }

}])

console.error(app.Child.prototype._title, !!app.Child.prototype._title._input)

app.render()
