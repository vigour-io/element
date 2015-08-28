require('./style.less')

var app = require( '../../lib/app' )
var Icon = require('../../lib/components/icon')

app.set({
  cloud: new Icon('cloud'),
  sun: new Icon('sun'),
  twister: new Icon('twister')
})