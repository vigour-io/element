require('./style.less')
  // var app = require('../../lib/app')
var Observable = require('vjs/lib/observable')
var Element = require('../../')
Observable.prototype.inject(require('vjs/lib/operator/add'))
Observable.prototype.inject(require('vjs/lib/operator/subscribe'))
Element.prototype.inject(require('../../lib/property/text'))

// var app = new Element({
//   node: document.body,
//   title: 'HAHA SUCCESS',
//   info:{
//     text:'info'
//   },
//   thisShouldBeGoneAfterTransForm: {
//     text: 'I shouldn\'t exist'
//   },
//   $transform () {
//     return {
//       subtitle: {
//         text: 'haha'
//       },
//       superfun: {
//         text: 'superfun'
//       }
//     }
//   },
//   $add () {
//     return {
//       thirdthing: {
//         text: {
//           $: 'upward.title'
//         }
//       }
//     }
//   }
// })

var app = new Element({
  node: document.body,
  title: 'HAHA SUCCESS',
  text:'ULTIMATE',
  content:{
    flups:{
      text:'flups'
    },
    trups:{
      text:'trups'
    }
  },
  info: {
    child: {
      $: 'upward.content'
    }
  }
})

// app.content.trups.remove()
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
