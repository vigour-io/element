require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

var Bla = new Element({
  key: 'bla',
}).Constructor

var thing = new Element({
  css:'thing',
  x:{ val: 20, $animation: 20 },
  text: 'a'
})

app.set({
  a: new thing.Constructor(),
  b: new thing.Constructor(),
  c: new thing.Constructor()
})

app.set({
  // text: app.a.x.val
})

thing.x.val = 300


// setTime
// dit is wel heel chill
// thing.x.on('done')
