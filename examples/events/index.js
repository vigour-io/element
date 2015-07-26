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

app.a.one.two.three.$val = 'yuzi'

function click( event, e ) {
  event.$prevent = true
  this.remove()
}
