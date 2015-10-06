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

var Observable = require('vjs/lib/observable')

var thing = new Element({
  properties: {
    bla: Observable
  },
  css:'thing',
  x: {
    val: 20,
    // val: function() {
    //   //this is the next test
    //   return this.parent.key
    // },
    $animation: 2
    // on: {
    //   data: function() {
    //     console.error('ok data update', this.path)
    //   }
    // }
  },
  // text: {
  //   on: {
  //     parent: function (parent, event) {
  //       //does not work with useval?
  //       console.log('parent anyone? does not seem to work...', parent.key)
  //       this.set( parent.key, event )
  //     }
  //   }
  // }
})


// the slowness is the context lookup sitution
// cache context lookups maybe?
//
for(var i = 0 ; i < 1000; i++) {
  app.setKey(i, new thing.Constructor())
}


// for(var i = 0 ; i < 1000; i++) {
//   app.setKey(i, new Element({
//     css:'thing',
//     x: {
//       val: 20,
//       $animation:2
//     }
//   }))
// }

// app.set({
//   a: new thing.Constructor(),
//   b: new thing.Constructor(),
//   c: new thing.Constructor(),
//   d: new thing.Constructor()
// })

console.clear()

// console.log(thing._instances)

// thing.clearContext()
thing.x.val = 300

// for(var i = 0 ; i < 1000; i++) {
//   app[i].x.val = 300
// }


// setTime
// dit is wel heel chill
// thing.x.on('done')
