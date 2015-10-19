require('./style.less')
  // var app = require('../../lib/app')
var Observable = require('vjs/lib/observable')
var Element = require('../../')
Observable.prototype.inject(require('vjs/lib/operator/add'))
Observable.prototype.inject(require('vjs/lib/operator/subscribe'))
Element.prototype.inject(require('../../lib/property/text'))

var Item = new Element({
  nested: {
    text: {
      $: 'parent.parent.title'
    }
  }
}).Constructor

// var content = new Observable({
//   one: {
//     title: 'one',
//     subtitle: 'studje'
//   },
//   two: {
//     title: 'two',
//     subtitle: 'nerdje'
//   },
//   three: {
//     title: 'three',
//     subtitle: 'mannetje'
//   },
//   four: {
//     title: 'four',
//     subtitle: 'gek'
//   }
// })

var app = new Element({
  node: document.body,
  val: new Observable({
    content: {
      one: {
        title: 'one',
        subtitle: 'studje'
      },
      two: {
        title: 'two',
        subtitle: 'nerdje'
      },
      three: {
        title: 'three',
        subtitle: 'mannetje'
      },
      four: {
        title: 'four',
        subtitle: 'gek'
      }
    }
  }),
  info: {
    child: {
      $: 'upward.content',
      ChildConstructor: Item
    }
  }
})
// app.val.content.one.title.val = 'burp'
console.log('>>', app.info.child.val)

// var ref = new Observable({
//   child: {
//     nested: {
//       title: 'ballz'
//     }
//   }
// })

// app.set({
//   content: ref,

// })

// var Item = new Element({

// }).Constructor

// var GridItem = new Element({
//   title: {
//     text: ''
//   },
//   $add: {
//     $: 'episodes'
//   },
//   properties: Item
// }).Constructor

// var Grid = new Element({
//   $: 'seasons',
//   // $map: function (season, key) {
//   //   if (typeof key === 'number') {
//   //     return new GridItem({
//   //       val: season,
//   //       title: {
//   //         text: {
//   //           $: 'title'
//   //         }
//   //       }
//   //     })
//   //   }
//   // },
//   properties:new GridItem({
//     //val: season,
//     title: {
//       text: {
//         $: 'title'
//       }
//     }
//   })
// }).Constructor


// console.log('check', app.val)
//   // app.set({
//   //   info: {
//   //     title:'funfun'
//   //   },
//   //   nerdjes: {
//   //     $: 'parent.info'
//   //   }
//   // })

// // console.log(app.nerdjes.val.title.val)

// // var Slide = new Element({
// //   ChildConstructor:false,
// //   properties:{
// //     title:TextElement,
// //     subtitle:TextElement,
// //     img:ImgElement
// //   }
// // cache.title
// // }).Constructor

// // var Carousel = new Element({
// //   ChildConstructor:Slide
// // }).ChildConstructor

// // app.set({
// //   carousel:new Carousel({
// //     //episodes bijv
// //     1:{
// //       title:'nerdjes unite',
// //       subtitle:'fly as a dove',
// //       img:'be cool'
// //     },
// //     2:{
// //       title:'nerdjes unite',
// //       subtitle:'fly as a dove',
// //       img:'be cool'
// //     },
// //     3:{
// //       title:'nerdjes unite',
// //       subtitle:'fly as a dove',
// //       img:'be cool'
// //     }
// //   })
// // })

// // new Carousel({
// //   $subscribe:'upward.teasers'
// // })
