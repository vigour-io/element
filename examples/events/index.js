require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')

// Element.prototype.inject( require('vjs/lib/methods/setWithPath') )


//BUG? path is shared?
var thing = new Element({
  // $text:'whut',
  $on:{
    click:click
  },
  one:{
    // $text:'dicks',
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
  b:new thing.$Constructor({
    c:new thing.$Constructor({
      
    })
  })
})

function click(event, e){
  event.$prevent = true
  // var node = this.$node

  // node.style.border = Math.ceil(Math.random() *10) + 'px solid blue'

  // this.remove()

  // var str =  Math.random() * 10 + ' ' + this.$path
  // if(!this.$text) this.$set({$text:str})
  // else this.$text.$val = str

  // e.$prevent = true

  this.remove()
}