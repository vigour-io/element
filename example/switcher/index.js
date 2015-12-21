require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Base = require('vigour-js/lib/base')
var Element = require('../../lib/element')
var Property = require('../../lib/property')
var data = require('../partial.json')
var App = require('../../lib/app')

var Switcher = require('../../lib/switcher')

Property.prototype.inject(
  require('../../lib/animation')
)

Observable.prototype.inject(
// //   require('vigour-js/lib/operator/subscribe'),
  require('vigour-js/lib/operator/transform')
// //   require('vigour-js/lib/operator/add')
)

// // Element.prototype.inject(
// //   require('../../lib/property/text'),
// //   require('../../lib/property/css'),
// //   require('../../lib/property/size'),
// //   require('../../lib/property/scroll/top'),
// //   require('../../lib/property/scroll/left'),
// //   require('../../lib/property/transform'),
// //   require('../../lib/property/attributes'),
// //   require('../../lib/property/draggable'),
// //   require('../../lib/events/click')
// // )

var Settings = new Element({
  css: 'fun',
  text: 'Settings'
}).Constructor

var Language = new Element({
  text: 'Settings: Language'
}).Constructor

var FAQ = new Element({
  text: 'Settings: FAQ'
}).Constructor

var Help = new Element({
  text: 'Settings: Help'
}).Constructor

var Register = new Element({
  text: 'Register'
}).Constructor

var FbRegister = new Element({
  text: 'Register: Facebook'
}).Constructor

var EmailRegister = new Element({
  text: 'Register: Email'
}).Constructor

var Login = new Element({
  text: 'Login'
}).Constructor

var FbLogin = new Element({
  text: 'Login: Facebook'
}).Constructor

var EmailLogin = new Element({
  text: 'Login: Email'
}).Constructor

// popup




var app = new App({
  node: document.body,
  inputfield: {
    node: 'input',
    attributes: {
      placeholder: 'enter value...'
    },
    on: {
      change () {
        // settings.help
        app.popup.val = this.node.value
      }
    }
  },
  popup: new Switcher({
  // config: {
  //   animation: {
  //     duration: 100
  //   },
  //   factor: 3
  // },
  map: {
    settings: {
      val: Settings,
      language:Language,
      faq: FAQ,
      help: Help
    },
    register: {
      val: Register,
      facebook: FbRegister,
      email: EmailRegister
    },
    login: {
      val: Login,
      facebook: FbLogin,
      email: EmailLogin
    }
  },
  val:'settings'
  // inject: require('../../lib/events/drag'),
  // on: {
  //   dragstart (e) {
  //     var content = this.content
  //     this._start = e.x - content.x.val
  //     this.content.x.dragging = true
  //   },
  //   drag (e, event) {
  //     this.content.x.set(e.x - this._start, event)
  //   },
  //   dragend (e, event) {
  //     this.content.x.dragging = false
  //     this.content.x.set(0, event)
  //   }
  // }
})
})

// popup.val = 'settings'
