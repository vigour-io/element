require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')

// Element.prototype.inject( require('vjs/lib/methods/setWithPath') )


//BUG? path is shared?
var thing = new Element({
  $on:{
    click:click
  },
  one:{
    $on:{
      click:click
    },
    two:{
      $on:{
        click:click
      },
      three:{
        four:{},
        // $on:{
        //   click:click
        // }
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