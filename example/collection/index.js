require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var data = require('../partial.json')
var App = require('../../lib/app')

Observable.prototype.inject(
  require('vigour-js/lib/operator/subscribe'),
  require('vigour-js/lib/operator/transform'),
  require('vigour-js/lib/operator/add')
)

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/property/attributes'),
  require('../../lib/events/click')
)

var Item = new Element({
  titlefield: {
    node: 'input',
    text: {
      $: '../../title'
    },
    on: {
      input (e) {
        this.text.origin.val = this.node.value
      }
    }
  },
  descriptionfield: {
    node: 'textarea',
    text: {
      $: '../../description'
    },
    on: {
      input (e) {
        this.text.origin.val = this.node.value
      }
    }
  }
})

function count () {
  if(!Item.titlefield.text) return
  var listens = Item.titlefield.text._on
  for (var i in listens) {
    let a = listens[i] && listens[i].listensOnAttach
    if (a) {  
      listens = a
      break
    }
  }
  var cnt = {

  }
  var c = 0
  listens.each(function (p, key) {
    // console.log(p.key, p._parent._parent.path.join('.'))
    p.attach.each(function(p, key){
      c++
      // console.log(key, p)
    })
    cnt[p.key] = (cnt[p.key] || 0) + 1
  })
  console.log(JSON.stringify(cnt, false, 2))
}

console.log('- before data')
count()

var content = new Observable(data.shows)
// var content = new Observable({
//   1: {
//     title:'flups'
//   }
// })

var app = new App({
  node: document.body,
  properties: {
    data: new Observable()
  },
  toggleBtn: {
    node: 'button',
    text: 'remove data',
    on: {
      click () {
        if (this.text.val === 'remove data') {
          console.time('- remove data')
          this.parent.data.set(false)
          this.text.val = 'set data'
          console.timeEnd('- remove data')
          count()
        } else {
          console.time('- set data')
          this.parent.data.set(content)
          this.text.val = 'remove data'
          console.timeEnd('- set data')
          count()
        }
      }
    }
  },
  data: content,
  scroll: scroll,
  list: {
    thing: {
      text: 'extreme miracle'
    },
    ChildConstructor: Item,
    $: 'data'
  }
})

console.log('- after data')
count()