'use strict'

// var Player = require('../../../lib/player/')
var app = require('../../../lib/app')
var Element = require('../../../lib/element')

Element.prototype.inject(require('../../../lib/events/render'))

var Property = require('../../../lib/property')

var Observable = require('vigour-js/lib/observable')

var Player = new Element({
  play: new Observable(),
  time: new Observable(),
  duration: new Observable(),
  src: new Observable()
}).Constructor

var Html5Player = new Player({
  node: 'video',
  on: {
    render () {
      console.error('heyo')
    }
  },
  play: {
    on: {
      data (data) {
        console.log('data has been changed in Implementation', data)
        var node = this.parent.node
        var key = 'autoplay'
        var val = this.val

        if (val) {
          node.play()
        } else {
          node.pause()
        }
      }
    }
  },
  src: {
    on: {
      data (data) {
        console.log('SRC changed on implementation')
        var node = this.parent.node
        var key = this.key
        var val = this.val

        if (val) {
          node.setAttribute(key, val)
        } else {
          node.removeAttribute(key)
        }
      }
    }
  }
}).Constructor

var myPlayer = new Html5Player({
  play: false,
  src: 'http://localhost:8000/rahh.mov'
})

app.set({
  player: myPlayer
})

// myPlayer.emit('render')

setTimeout(function () {
  myPlayer.play.val = true
}, 2000)

setTimeout(function () {
  myPlayer.play.val = false
}, 4000)

// var Html5Player = new Element({
//   node: 'video',
//   properties: {
//     play: new Property({
//       on: {
//         data: function (data) {
//           var node = this.parent.node
//           var key = 'autoPlay'
//           var val = this.val
//
//           if (val) {
//             node.setAttribute(key, val)
//           } else {
//             node.removeAttribute(key)
//           }
//         }
//       }
//     }),
//
//     src: new Property({
//       on: {
//         data: function (data) {
//           var node = this.parent.node
//           var key = this.key
//           var val = this.val
//
//           if (val) {
//             node.setAttribute(key, val)
//           } else {
//             node.removeAttribute(key)
//           }
//         }
//       }
//     })
//   }
// }).Constructor
