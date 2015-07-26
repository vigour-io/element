require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' )
)

var thing = new Element( {
  $text: 'balls',
  $css: {
    $val: 'grey-bg',
    $add: ' red-txt '
  },
  $on: {
    click: click
  },
  one: {
    $css: 'grey-bg',
    $text: 'smalls',
    $on: {
      click: click
    },
    two: {
      $css: 'grey-bg',
      $text: 'falls', 
      $on: {
        click: click
      },
      three: {
        $css: 'grey-bg',
        $text: 'walls',
        $on: {
          click: click
        }
      }
    }
  }
} )

app.$set( {
  b: new thing.$Constructor( {
    $text: '?!@#234234234234!@#',
    c: new thing.$Constructor( {
      flups: new thing.$Constructor( {
        $text: 'HIERO',
        $css: 'blue-bg'
      } )
    } )
  } ),
  a: new thing.$Constructor()
} )

// app.a.one.two.three.$val = 'yuzi'

// app.a.one.two.three.on( 'mousemove', function() {
//   this.$node.style.opacity = Math.random()
// })



// app.a.one.two.three.$set({
//   $on: {
//     click: function() {
//       this.$node.style.opacity = Math.random()
//         console.log('???', this.$path)
//     }
//   }
// })


//handle voerwrite in method voor resolvement van context
// app.a.one.two.three.on( 'click', function() {
//   this.$node.style.opacity = Math.random()
// }, 'val')

console.log(app.a)

function click( event, e ) {

  console.log(event.$prevent)
  event.$postponed = null

  this.$text.$val = Math.random()*9999
  // this.$node.style.opacity = Math.random()

  console.log('???', this.$path)
  // this.remove()
}
