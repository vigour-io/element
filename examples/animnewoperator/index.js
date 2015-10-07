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
  require('../../lib/events/click'),
  require('../../lib/property/opacity')
)

var Bla = new Element({
  key: 'bla',
}).Constructor

var Observable = require('vjs/lib/observable')
var Property = require('../../lib/property')

var n = 500

var thing = new Element({
  properties: {
    bla: Observable,
    color: new Property({
      on: {
        data: function() {
          var val = this.val
          var r, g, b
          // val = val
          // this.parent.text.val = (Math.cos(val)*255+255)/2
          r = ~~((Math.sin(val/50)*255+255)/2)
          g = ~~((Math.cos(val/100)*255+255)/2)
          b = 10
          // b = ~~((Math.cos(val/100)*255+255)/2)
          this.parent.node.style.backgroundColor = 'rgb('+[r,g,b].join(',')+')'
        }
      }
    })
  },
  css: 'info',
  text: 'not bound',
  // color: 0,
  opacity: {
    $transform: function(val) {
      return Math.floor((val+n)/n)
    }
  },
  y:0,
  x: {
    val: 20,
    // val: function() {
    //   //this is the next test
    //   return this.parent.key
    // },
    // $animation: 2
    // on: {
    //   transitionEnd: function() {
    //     // setTimeout(function() {
    //     //   thing.x.val = Math.random()*300
    //     // })
    //   }
    // }
    // on: {
    //   data: function() {
    //     console.error('ok data update', this.path)
    //   }
    // }
  }
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
console.clear()

var t = Date.now()


for(var i = 0 ; i < n; i++) {
  //{text:i}
  app.setKey(i, new thing.Constructor())
}

console.log((Date.now()-t)/1000+'s')

// for(var i = 0 ; i < 500; i++) {
//   app.setKey(i, new Element({
//     css:'thing',
//     x: {
//       val: 20,
//       $add: i,
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


// console.log(thing._instances)

// thing.clearContext()
// thing.x.val = 300

// setTimeout(function() {
//   thing.x.val = 900
// },1000)
//
// for(var i = 0 ; i < 500; i++) {
//   app[i].x.val = i*3+50
// }

//one state off your app
//passing down the correc tthings that can be translated to state
/*
 for hub data
 subs: { sourceid: ts }

 //what we also keep in the hub is the last stamp of any change





//this combined state can be parsed

// need to think of a smart way to stored


//hub can store these 2 things
subsmap: {
  hash: sourceid+ms

  // see how to make this into a hashmap
  e.g structure based
}


// optional (how many do you want to track?)
// changemap: {  //max length (cleans up after a while)
//   // can be used to sync info about timing perhaps (for later)
//   instance--reffed--path: sourceid+ms
//   // this will only store data not set from the upstream
//   // since upstream will always be a subscription
// }
// thse changes + sourceid only have to be cominucated
// never send sourceid back even if form another upstream

/*
  disconnect / connect
*/
/*
instance--reffed--path
way to serilize paths + instance + context
*/


// setTime
// dit is wel heel chill
// thing.x.on('done')
// var Observable = require('vjs/lib/observable')
//
var test = new Observable({
  // track:
  trackInstances: true,
  cnt: {
    val:1,
    inject: require('vjs/lib/operator/all')
    // $add:10
  }
})

var Test = test.Constructor

//lookups are slow
var ins = []
for(var i = 0 ; i < n; i++) {
  ins.push(new Test({ cnt: i }))
}

var t = Date.now()
test.cnt.val++

console.log('update1', (Date.now()-t)/1000, 's', ~~(n/1000) + 'k', test.cnt.val)

var t = Date.now()

test.cnt.val++

console.log('update2', (Date.now()-t)/1000, 's', ~~(n/1000) + 'k', test.cnt.val)

for(var i = 0;i<n;i++) {
  // console.log(app[i])
  // app[i].x.val = ins[i].cnt
  // app[i].x.val = Math.sin(i/100)*50
  // app[i].y.val = Math.sin(i/100)*50

  // app[i].color.val = ins[i].cnt
  app[i].text.val = ins[i].cnt
  // app[i].opacity.val = ins[i].cnt
}

// setInterval(function() {
//   for(var i = 0;i<n;i++) {
//     ins[i].cnt.val++
//   }
// },50)

var cnt = 0
function loop() {
  cnt = ~~(Math.random()*10)
  // var i = Math.floor(Math.random()*n)
  // for (var i = Math.max(i-50,0),len = i+50; i < len; i++) {
  for(var i = 0 ; i < n; i++) {
    ins[i].cnt.val = cnt*20 + i
    // if(ins[i].cnt.val>(255*2)) {
    //   ins[i].cnt.val = 0
    // }
  }
  window.requestAnimationFrame(loop)
}

loop()
