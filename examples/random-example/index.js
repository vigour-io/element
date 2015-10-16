require('./style.less')
  // var app = require('../../lib/app')
var Observable = require('vjs/lib/observable')
var Element = require('../../')
Observable.prototype.inject(require('vjs/lib/operator/add'))
Observable.prototype.inject(require('vjs/lib/operator/subscribe'))
Element.prototype.inject(require('../../lib/property/text'))

var app = new Element({
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
        title: 'three',
        subtitle: 'gek'
      }
    }
  }),
  node: document.body,
  info: {
    child: {
      ChildConstructor: new Element({
        nested: {
          text: {
            $: 'parent.parent.title'
          }
        },
        ballx:{
          text: {
            $: 'parent.parent.subtitle'
          }
        }
      }).Constructor,
      $: 'upward.content'
    }
  },
  info2: {
    child: {
      ChildConstructor: new Element({
        text: {
          $: 'parent.title'
        }
      }).Constructor,
      $: 'upward.content'
    }
  }
})

app.val.content.set({
    five: {
      title: 'five'
    }
  })
  // app.content.trups.remove()
console.log('>>', app.info.child.val)
console.log('>>', app.info2.child.val)

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
