'use strict'
var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib')
var app = global.app = new Element({
  DOM: document.body
})

require('./bla.less')

var a = new Observable({
  a1: {
    a1_child1: {
      title: '1.1'
    },
    a1_child2: {
      title: '1.2'
    }
  },
  a2: {
    a2_child1: {
      title: '2.1'
    },
    a2_child2: {
      title: '2.2'
    }
  }
})


var NestCol = new Element({
  $collection: true,
  Child: {
    bla: {
      text: {
        $: 'title'
      },
      on: {
        click () {
          console.log('xxx', this.path)
          this.set({
            img: {
              type: 'img',
              src: 'http://i.kinja-img.com/gawker-media/image/upload/s--EZbiZdfA--/188rsl48yzg3tjpg.jpg'
            }
          })
          // console.log('---resolved force patch---')
          console.log('result:')
          console.log('keys on app.col', app.col.keys())
          console.log('keys on ChildConstructor [1]', app.col.Child.prototype.keys())
          console.log('keys on ChildConstructor [2]', app.col.Child.prototype.Child.prototype.keys())
          // so key is resolved o the CConstr -- allways wrong of course
          // app.patch()
        }
      }
    }
  }
}).Constructor

var Col = new Element({
  $collection: true,
  Child: new NestCol()
}).Constructor

var Context = new Element({
  a: {
    b: {
      on: {
        click () {
          console.log('xxx', this.path)
          this.set({
            img: {
              type: 'img',
              src: 'http://i.kinja-img.com/gawker-media/image/upload/s--EZbiZdfA--/188rsl48yzg3tjpg.jpg'
            }
          })
          console.log('---resolved---')
          // app.patch()
        }
      }
    }
  }
}).Constructor

app.set({
  key: 'app',
  // text: 'xxx',
  col: new Col(a),
  // on: {
    // down () {
      // console.log('haha')
    // }
  // }
})

//// ws://37.48.93.68:5051

