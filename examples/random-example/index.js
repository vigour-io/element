require('./style.less')
  // var app = require('../../lib/app')
var Observable = require('vigour-js/lib/observable')
var Element = require('../../')

Observable.prototype.inject(require('vigour-js/lib/operator/add'))
Observable.prototype.inject(require('vigour-js/lib/operator/subscribe'))
Element.prototype.inject(require('../../lib/property/text'))

var Item = new Element({
  // val:new Observable(),
  key:'original',
  titleField: {
    text: {
      $: 'upward.title'
    }
  },
  // subtitleField: {
  //   nested: {
  //     nested: {
  //       text: {
  //         $: 'upward.subtitle'
  //       }
  //     }
  //   }
  // },
  // desc: {
  //   nested: {
  //     nested: {
  //       text: {
  //         $: 'upward.description'
  //       }
  //     }
  //   }
  // }
}).Constructor

var data = new Observable({
  content: {
    one: {
      title: 'one',
      // subtitle: 'studje',
      // description: 'loremipsum'
    },
    two: {
      title: 'two',
      // subtitle: 'nerdje',
      // description: 'loremipsum'
    },
    three: {
      title: 'three',
      // subtitle: 'mannetje',
      // description: 'loremipsum'
    },
    four: {
      title: 'four',
      // subtitle: 'gek',
      // description: 'loremipsum'
    }
  }
})

var item = new Item({
    // text:'1',
    key:'item',
    val:data.content.one
  })

var app = new Element({
  key:'APP',
  node: document.body,
  val: data,
  // item1:new Item({
  //   // text:'1',
  //   key:'itemOne'//,
  //   val:data.content.one
  // }),
  // item2:item
  // item2:new Item({
  //   // text:2,
  //   key:'itemTwo',
  //   val:data.content.two
  // }),
  // item3:new Item({
  //   val:data.content.three
  // }),
  // item4:new Item({
  //   val:data.content.four
  // })
  // info1:{
    holder: {
      ChildConstructor: Item,
      $: 'upward.content'
    }
  // }
  // pattern:{text:'pattern'},
  // notpattern:{text:'notpattern'}
})

// app.item1.val = data.content.one

// app.holder.val.one.val = data.content.two
console.log('RESULT',app.holder.val.one.titleField.text.val)

// // var toggle = 0
// setInterval(() => {
//   // data.content[toggle === 1 ? 'one' : 'two'].title.val = Math.random()
//   // toggle = toggle === 1 ? 0 : 1
//   var numberOfFields = findFields(data)
//   var randomIndex = Math.ceil(Math.random() * numberOfFields)
//   findFields(data, randomIndex)
// },1000)

// function findFields(obj, random, count){
//   if(!count){
//     count = {cnt:0}
//   }
//   var field = 'random!' + Math.random()
//   obj.each((prop,key) => {
//     if(typeof prop.val === 'string'){
//       let cnt = ++count.cnt
//       if(random){
//         if(cnt === random){
//           // console.log(cnt, prop.path)
//           prop.val = field
//         }else if(Math.random() > 0.5){
//           field = prop.val
//         }
//       }
//     }else{
//       findFields(prop,random,count)
//     }
//   })
//   return count.cnt
// }