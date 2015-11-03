require('./style.less')
  // var app = require('../../lib/app')
var Observable = require('vjs/lib/observable')
var Element = require('../../')

Observable.prototype.inject(require('vjs/lib/operator/add'))
Observable.prototype.inject(require('vjs/lib/operator/transform'))
Observable.prototype.inject(require('vjs/lib/operator/subscribe'))
Element.prototype.inject(require('../../lib/property/text'))

var Item = new Element({
  key:'original',
  text:{
    $:'upward.title'
  },
  nested:{

  }
}).Constructor

var data = new Observable({
  one:{
    title:'blurf'
  },
  two:{
    title:'smurt'
  }
})

var app = new Element({
  node:document.body,
  ChildConstructor:Item,
  $transform:data
})

console.log('one:data-title',app._cache.one.val.title.val)
console.log('one:text',app._cache.one.text.val)
console.log('one:node',app._cache.one.node)
console.log('one:node',app._cache.one.node.base === app._cache.one)

console.log('two:data-title',app._cache.two.val.title.val)
console.log('two:text',app._cache.two.text.val)
console.log('two:node',app._cache.two.node)
console.log('two:node',app._cache.two.node.base === app._cache.two)

console.log(app._cache.one.text === app._cache.two.text)

console.log('---->',app._cache.one.nested.node)

// app._cache.two.val.title.val = 'TEST ON TWO'
// setInterval(function(){
//   data.two.title.set('two' + Math.random())
// },500)

// setInterval(function(){
//   data.one.title.set('one' + Math.random())
// },1000)