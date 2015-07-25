require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')
Element.prototype.inject( require('vjs/lib/methods/setWithPath') )
//-------- example implementation----------

var a = new Element({
  $key:'a'
})

a.setWithPath('b.c.d.e.f',
{ $on:{
    click:function(){
      console.error('burn')
    }
  }
})

a.setWithPath('1.2.3',
{ $on:{
    click:function(){
      console.error('numbergame')
    }
  }
})

app.$set({
  a:a,
  b: new a.$Constructor()
})