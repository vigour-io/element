require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')

// Element.prototype.inject( require('vjs/lib/methods/setWithPath') )


//BUG? path is shared?
var thing = new Element({
  $text:'balls',
  $on:{
    click:click
  },
  one:{
    $text:'smalls',
    $on:{
      click:click
    },
    two:{
      $text:'falls',
      $on:{
        click:click
      },
      three:{
        $text:'walls',
        four:{},
        $on:{
          click:click
        }
      }
    }
  }
})

// thing.one.two.three

// thing.one.two.$remove()
app.$set({
  b:new thing.$Constructor({
    c:new thing.$Constructor({
      
    })
  }),
  a:new thing.$Constructor()
})

console.log('------')


app.a.one.two.three.$val = 'yuzi'

console.log(app.a)

function click(event, e){
  event.$prevent = true
  this.remove()
}