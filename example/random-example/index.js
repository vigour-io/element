require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../')

Observable.prototype.inject(require('vigour-js/lib/operator/add'))
Observable.prototype.inject(require('vigour-js/lib/operator/subscribe'))
Observable.prototype.inject(require('vigour-js/lib/operator/transform'))
Element.prototype.inject(require('../../lib/property/text'))

var Item = new Element({
  text: {
    $: '../title' // parent.title
  },
  // nested: {
  //   text: {
  //     $: '../../subtitle' // parent.parent.subtitle
  //   }
  // },
  // powertitle: {
  //   text: {
  //     $: '../../power'
  //   }
  // }
}).Constructor

var data = new Observable({
  channels: {
    one: {
      title: 'one',
      subtitle: 'studje',
      power: 'loremipsum'
    },
    two: {
      title: 'two',
      subtitle: 'nerdje',
      power: 'loremipsum'
    },
    // three: {
    //   title: 'three',
    //   subtitle: 'mannetje',
    //   power: 'loremipsum'
    // },
    // four: {
    //   title: 'four',
    //   subtitle: 'gek',
    //   power: 'loremipsum'
    // }
  },
  // episodes:{
  //   one: {
  //     title: 'one',
  //     subtitle: 'studje',
  //     power: 'loremipsum'
  //   },
  //   two: {
  //     title: 'two',
  //     subtitle: 'nerdje',
  //     power: 'loremipsum'
  //   },
  //   three: {
  //     title: 'three',
  //     subtitle: 'mannetje',
  //     power: 'loremipsum'
  //   },
  //   four: {
  //     title: 'four',
  //     subtitle: 'gek',
  //     power: 'loremipsum'
  //   }
  // }
})

var ChannelList = new Element({
  ChildConstructor: Item,
  // $: 'upward.channels'
}).Constructor

// var EpisodeList = new Element({
//   ChildConstructor: Item,
//   $: 'upward.episodes'
// }).Constructor

var app = new Element({
  node: document.body,
  val: data,
  list:new ChannelList({
    $transform:data.channels
  })
  // nested:{
  //   very:{
  //     deep:{
  //       in:{
  //         here:{
  //           list:new ChannelList()
  //         }
  //       }
  //     },
  //     list:new EpisodeList()
  //   }
  // }
})

// var elem = new Element()

//   nested:{
//     nest:{
//       list1: new ChannelList(),
//     }
//   }
//   // list2: new EpisodeList()
// })
  // console.clear()
// var cnt = 0
// setInterval(function(){
//   var set = {}
//   var key = 'channel'+ ++cnt
//   set[key] = {
//     title:key + '-title',
//     subtitle:key + '-subtitle',
//     power:key + '-powertitle'
//   }
//   data.channels.set(set)
// },1000)
  // app.list2.val
  // setInterval(function () {
  //   var randomNr = Math.random()
  //   data.items.each(function (prop, key) {
  //     prop.set({
  //       title: key + '-title' + randomNr,
  //       subtitle: key + '-subtitle' + randomNr,
  //       power: key + '-power' + randomNr
  //     })
  //   })
  // }, 500)

// var data = new Observable({
//   one: {
//     // title: 'one',
//     // subtitle: 'studje',
//     // power: 'loremipsum'
//   },
//   two: {
//   //   title: 'two',
//   //   subtitle: 'nerdje',
//   //   power: 'loremipsum'
//   },
//   three: {
//   //   title: 'three',
//   //   subtitle: 'mannetje',
//   //   power: 'loremipsum'
//   },
//   four: {
//     // title: 'four',
//     // subtitle: 'gek',
//     // power: 'loremipsum'
//   }
// })

// var app = new Element({
//   node: document.body,
//   ChildConstructor: Item,
//   $transform: data
// })

// setInterval(function () {
//   var randomNr = Math.random()
//   data.each(function (prop, key) {
//     prop.set({
//       title: key + '-title' + randomNr,
//       subtitle: key + '-subtitle' + randomNr,
//       power: key + '-power' + randomNr
//     })
//   })
// }, 500)

// console.clear()
// var obs = new Observable({
//   on:{
//     property(data){
//       if(data.added) console.error('added',data.added)
//     }
//   }
// })
