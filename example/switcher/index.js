require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Base = require('vigour-js/lib/base')
var Element = require('../../lib/element')
var Property = require('../../lib/property')
var data = require('../partial.json')
var App = require('../../lib/app')

Property.prototype.inject(
  require('../../lib/animation'),
  require('vigour-js/lib/observable/is')
)

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
  require('../../lib/property/draggable'),
  require('../../lib/events/click')
)

// setup
var Switcher = new Element({
  inject: require('../../lib/events/drag'),
  on: {
    dragstart (e) {
      var content = this.content
      this._start = e.x - content.x.val
      this.content.x.dragging = true
    },
    drag (e, event) {
      this.content.x.set(e.x - this._start, event)
    },
    dragend (e, event) {
      this.content.x.dragging = false
      this.content.x.set(0, event)
    },
    data: {
      switcher (data, event) {
        if (data) {
          var val = this.val
          var keys = val.split('.')
          var params = this.map.get(keys)
          if (params) {
            let Constructor = params._input
            let content = this.content
            let key = keys[keys.length - 1]
            let element = new Constructor()
            if (content) {
              let animation = content.x.$animation
              let transform
              let start
              animation && animation.remove()
              if (val.indexOf(this.current) === 0){
                start = 200
                transform = function (val) {
                  return -((start - val) / 3)
                }
              } else {
                start = -200 / 3
                transform = function (val) {
                  return -((start - val) * 3)
                }
              }
              element.set({
                x: {
                  val: start,
                  $animation: {
                    duration: 24
                  }
                }
              })
              content.x.set({
                val: element.x,
                $transform: transform
              })
              // element.on('transitionEnd', function () {
              //   content.remove()
              // })
            }
            element.setKey('x', 0, event)
            this.setKey(key, element, event)
            this.setKey('content', element, event)
            this.setKey('current', val, event)
          }
        }
      }
    }
  },
  properties: {
    map: Base,
    content: true,
    direction: true,
    current: true
  }
}).Constructor

// popup
var popup = new Switcher({
  map: {
    settings: {
      val: new Element({
        css: 'fun',
        text: 'Settings'
      }).Constructor,
      language: new Element({
        text: 'Settings: Language'
      }).Constructor,
      faq: new Element({
        text: 'Settings: FAQ'
      }).Constructor,
      help: new Element({
        text: 'Settings: Help'
      }).Constructor
    },
    register: {
      val: new Element({
        text: 'Register'
      }).Constructor,
      facebook: new Element({
        text: 'facebook'
      }).Constructor,
      email: new Element({
        text: 'email'
      }).Constructor
    },
    login: {
      val: new Element({
        text: 'language'
      }).Constructor,
      facebook: new Element({
        text: 'language'
      }).Constructor,
      email: new Element({
        text: 'language'
      }).Constructor
    }
  }
}, false)

var app = new App({
  node: document.body,
  inputfield: {
    node: 'input',
    attributes: {
      placeholder: 'enter value...'
    },
    on: {
      change() {
        popup.val = this.node.value
      }
    }
  },
  popup: popup
})