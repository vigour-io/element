require('./style.less')

var app = require('../../lib/app')

app.set({
  topbar: {
    topbarItem: {

    }
  }
})

// var Slide = new Element({
//   ChildConstructor:false,
//   properties:{
//     title:TextElement,
//     subtitle:TextElement,
//     img:ImgElement
//   }
// }).Constructor

// var Carousel = new Element({
//   ChildConstructor:Slide
// }).ChildConstructor

// app.set({
//   carousel:new Carousel({
//     //episodes bijv
//     1:{
//       title:'nerdjes unite',
//       subtitle:'fly as a dove',
//       img:'be cool'
//     },
//     2:{
//       title:'nerdjes unite',
//       subtitle:'fly as a dove',
//       img:'be cool'
//     },
//     3:{
//       title:'nerdjes unite',
//       subtitle:'fly as a dove',
//       img:'be cool'
//     }
//   })
// })

// new Carousel({
//   $subscribe:'upward.teasers'
// })