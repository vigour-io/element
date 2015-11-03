require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/attributes' ),
  require( 'vigour-js/lib/methods/lookUp')
)
//val, event, parent, key

var bla = new Element( void 0, void 0, void 0, 'nika' )

console.log( bla, bla.node )

var Post = new Element({
  css:'post',
  text:'random post',
  attributes: {
    draggable: true
  },
  define: {
    andrew: function( val ) {
      console.log('!!! fire andrew', val)
    }
  },
  x:{},
  : {
    each:function(property) {
      console.log('!', property)
    },
    andrew: false
  },
  buttons: {
    // css:'buttons',
    removeBtn: {
      // node:'button',
      text:'remove it!',
      on: {
        mousemove: function() {
          this.node.style.opacity = Math.random()
        },
        click: function() {
          // alert('?')

          this.parent.parent.set({
            attributes: {
              draggable:null
            }
          })

          this.parent.parent.node.style.border = '100px solid blue'
          
          var post = this.lookUp("2")
          console.log(post.path)
          post.text.val = 'no way!'

          // this.parent.parent.remove()
        }
      }
    }
  }
}).Constructor

var holder = new Element()

var arr = []

function shared() {

}

var Observable = require('vigour-js/lib/observable')

var Event = require('vigour-js/lib/event')

var props = window.props = new Observable()

if( window.gaston ) {
  window.gaston.performance(function() {

    var event = new Event(app)
    event.block = true
    for(var i = 0; i < 1000;i ++) {

      // props.setKey( i, new Observable(i), false )

      // var obj = {}
      // obj[i] = new Post()
      holder.setKey( i, new Post({}, event), event )
    }

    event.block = false
    app.set({ posts: holder }, event)
  })
}

// perf(function() {

//   for(var i = 100-1; i>-1; i--) {
//     props[i].val = 100-i
//   }

// })
