require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../')

Observable.prototype.inject(require('vigour-js/lib/operator/add'))
Observable.prototype.inject(require('vigour-js/lib/operator/subscribe'))
Observable.prototype.inject(require('vigour-js/lib/operator/transform'))
Element.prototype.inject(require('../../lib/property/text'))

var Item = new Element({
  key: 'original',
  text: {
    $: '../title'
  },
  nested: {
    text: {
      $: '../../subtitle'
    }
  },
  powertitle: {
    text: {
      $: '../../power'
    }
  }
}).Constructor

var data = new Observable()

var count = 1
while (count <= 10) {
  let key = 'el' + count
  data.setKey(key, {
    title: key + '-title',
    subtitle: key + '-subtitle',
    power: key + '-powertitle'
  })
  count++
}

var app = new Element({
  node: document.body,
  ChildConstructor: Item,
  $transform: data
})

// setInterval(function(){
//   data.each(function(prop, key){
//     prop.set({
//       title:key + '-title:' + Math.random(),
//       subtitle:key + '-subtitle:' + Math.random(),
//       power:key + '-powertitle:' + Math.random()
//     })
//   })
// },200)

// require('./style.less')
//   // var app = require('../../lib/app')
// var Observable = require('vjs/lib/observable')
// var Element = require('../../')

// Observable.prototype.inject(require('vjs/lib/operator/add'))
// Observable.prototype.inject(require('vjs/lib/operator/subscribe'))
// Element.prototype.inject(require('../../lib/property/text'))

// var Item = new Element({
//   key:'original',
//   titleField: {
//     text: {
//       $: 'upward.title'
//     }
//   }//,
//   // subtitleField: {
//   //   nested: {
//   //     nested: {
//   //       text: {
//   //         $: 'upward.subtitle'
//   //       }
//   //     }
//   //   }
//   // },
//   // desc: {
//   //   nested: {
//   //     nested: {
//   //       text: {
//   //         $: 'upward.description'
//   //       }
//   //     }
//   //   }
//   // }
// }).Constructor

// var data = new Observable({
//   content: {
//     one: {
//       title: 'one',
//       subtitle: 'studje',
//       description: 'loremipsum'
//     },
//     two: {
//       title: 'two',
//       subtitle: 'nerdje',
//       description: 'loremipsum'
//     },
//     three: {
//       title: 'three',
//       subtitle: 'mannetje',
//       description: 'loremipsum'
//     },
//     four: {
//       title: 'four',
//       subtitle: 'gek',
//       description: 'loremipsum'
//     }
//   }
// })
