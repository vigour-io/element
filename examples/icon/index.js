require('./style.less')

var app = require( '../../lib/app' )
var Icon = require('../../lib/components/icon')

app.set({
  cloud: new Icon('cloud', 'icomoon'),
  sun: new Icon('sun', 'icomoon'),
  twister: new Icon('twister', 'icomoon')
})