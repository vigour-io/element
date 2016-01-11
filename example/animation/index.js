'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor
var Event = require('vigour-js/lib/event')
// Element.prototype.inject(
  // require()
// )
require('./style.less')

var A = new Element({
  x: {
    val:0,
    // $animation:{
    //   duration:120
    // }
  }
}).Constructor

var holder = new Element()
for (var i = 50; i >= 0; i--) {
  holder.setKey(i, new A({
    text:i + 'POWER'
  }))
}

app.set({
  holder: holder
})
var cnt = 0
function go () {
  window.requestAnimationFrame(function(){
    var event = new Event('data')
    for (var i = 50; i >= 0; i--) {
      holder[i].x.set(cnt*4, event)
    }
    event.trigger()
    if( (cnt++) < 200){
      go()
    }
  })
}

global.go = go

setTimeout(go, 500)