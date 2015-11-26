// require('vigour-scratch/lib/mixins.less')
require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var data = require('../content.json')
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
  require('../../lib/events/click')
)


var Item = new Element({
  titlefield: {
    node:'input',
    text: {
      $: '../../title'
    },
    on: {
      click (e) {
        this.node.focus()
      }
    }
  },
  descriptionfield: {
    text: {
      $: '../../description'
    }
  }
})

var focus

function focusSomething () {
  var elem = document.elementFromPoint(100, 140)
  if (elem !== focus) {
    if (focus && focus.base) focus.base.setKey('css', '')
    focus = elem
    if (elem.base) {
      elem.base.setKey('css', 'focused')
      elem.base.lookUp('navigation').val = elem.base.lookUp('_input')
    }
  }
}

var scroll = new Observable({
  key: 'scrollMagic',
  val: 180,
  on: {
    data () {
      focusSomething()
    }
  }
})

var app = new App({
  node: document.body,
  properties: {
    navigation: new Observable()
  },
  navigation: new Observable({
    title: 'Home'
  }),
  topbar: {
    y:0,
    text: {
      $: '../../navigation.title',
      $add: {
        val: scroll,
        $transform (val) {
          return ' - ' + ~~val
        }
      }
    }
  },
  list: {
    scrollTop: scroll,
    ChildConstructor: Item,
    $transform: data.shows
  }
})

focusSomething()

function setTopbar () {
  let scrollTop = document.body.scrollTop
  if (scrollTop) {
    window.requestAnimationFrame(function () {
      app.topbar.setKey('y', scrollTop)
    })
  }
}

document.body.addEventListener('blur', function () {
  // window.requestAnimationFrame(function(){
  //   app.topbar.setKey('y', 0)
  //   window.scrollTo(0,0)
  // })
  setTopbar()
  // setTimeout(function(){window.scrollTo(0,0)},200)
},true)

document.body.addEventListener('focus', function () {
  setTopbar()
},true)