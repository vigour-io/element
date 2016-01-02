var App = require('../../lib/engine/string')

//what to do --
// make element more sane
// use lookup for the global GET RID OF THAT PIECE OF SHIT
// MAKE MULTI ENGINE SETUP
// ELEMENT MAKE FALLBACKS
// ENHANCE ELEMENT -- OR MAKE ELEMENT PART OF THE ENGINE
// think think think
// probably need to switch it up

var Element = require('../../lib/element')

global.engine = {
  nodes: {}
}

var bla = new Element({
  text: 'yuzi'
})

var A = new Element({
  text: function () {
    return this.parent.val
  }
}).Constructor

var holder = new Element()
console.time(1)

// MAKE THIS A LOT FASTER -- its element and trying to get nodes FOR SURE -- BAD!
for (var i = 0 ; i < 1e5; i++) {
  holder.setKey(i, new A(i, false), false)
}
console.timeEnd(1)

console.time(1)
var app = new App({
  james: holder
})
// prob best to use this as first render of the app if there is nothing there -- is ULTRA SPEED
document.write(app.val)

console.timeEnd(1)
