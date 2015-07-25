require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')

Element.prototype.inject( require('vjs/lib/methods/setWithPath') )

//BUG? path is shared?
var thing = new Element({
  one:{
    $on:{
      click:click
    },
    two:{
      $on:{
        click:click
      },
      three:{
        $on:{
          click:click
        }
      }
    }
  }
})

// thing.one.two.$remove()

app.$set({
  a:new thing.$Constructor({
    $text:'a',
  }),
  b:new thing.$Constructor({
    $text:'b',
  }),
  c:new thing.$Constructor({
    $text:'c',
  }),
  d:new thing.$Constructor({
    $text:'d',
  })
})

function click(event, e){
  // var str =  Math.random() * 10 + ' ' + this.$path
  // if(!this.$text) this.$set({$text:str})
  // else this.$text.$val = str
  e.$prevent = true

  this.$remove()
}