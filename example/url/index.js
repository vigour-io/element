require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var App = require('../../lib/app')

var url = require('../../lib/url')

Element.prototype.inject(
  require('../../lib/property/attributes'),
  require('../../lib/property/text'),
  require('../../lib/events/click')
)


var Button = new Element({
  node: 'button',
  on: {
    click () {
      url.buildUrl(this.val)
    }
  }
}).Constructor


var BackButton = new Element({
  node: 'button',
  // text: 'home',
  on: {
    click () {
      window.history.back()
    }
  }
}).Constructor

var parseButton = new Element({
  node: 'button',
  // text: 'home',
  on: {
    click () {
      // for node this would be req.url or something
      var parsedUrl = url.parseUrl(window.location.href)
      console.log(parsedUrl.hostname)
      console.log(parsedUrl.pathname)
      console.log(parsedUrl.hash)
      console.log(parsedUrl.search)
    }
  }
}).Constructor

var app = new App({
  node: document.body,
  holder: {
    back:new BackButton({
      text: 'back',
    }),
    parse:new parseButton({
      text: 'parse',
    }),
    home:new Button({
      text: 'Home',
      val: 'home'
    }),
    shows:new Button({
      text: 'Shows',
      val: 'shows'
    }),
    season:new Button({
      text: 'Season',
      val: 'season'
    }),
    episode:new Button({
      text: 'Episode',
      val: 'season'
    }),
  }
})
