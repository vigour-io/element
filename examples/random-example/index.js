require('./style.less')
  // var app = require('../../lib/app')
var Observable = require('vjs/lib/observable')
var Element = require('../../')

Observable.prototype.inject(require('vjs/lib/operator/add'))
Observable.prototype.inject(require('vjs/lib/operator/subscribe'))
Element.prototype.inject(require('../../lib/property/text'))

var Item = new Element({
  titleField: {
    text: {
      $: 'upward.title'
    }
  },
  subtitleField: {
    nested: {
      nested: {
        text: {
          $: 'upward.subtitle'
        }
      }
    }
  },
  desc: {
    nested: {
      nested: {
        text: {
          $: 'upward.description'
        }
      }
    }
  }
}).Constructor

var data = new Observable({
  content: {
    one: {
      title: 'one',
      subtitle: 'studje',
      description: 'loremipsum'
    },
    two: {
      title: 'two',
      subtitle: 'nerdje',
      description: 'loremipsum'
    },
    three: {
      title: 'three',
      subtitle: 'mannetje',
      description: 'loremipsum'
    },
    four: {
      title: 'four',
      subtitle: 'gek',
      description: 'loremipsum'
    }
  }
})

var app = new Element({
  node: document.body,
  val: data,
  info1: {
    holder: {
      ChildConstructor: Item,
      $: 'upward.content'
    }
  }
})

setInterval(() => {
  var numberOfFields = findFields(data)
  var randomIndex = Math.ceil(Math.random() * numberOfFields)
  findFields(data, randomIndex)
},1000)

function findFields(obj, random, count){
  if(!count){
    count = {cnt:0}
  }
  var field = 'random!' + Math.random()
  obj.each((prop,key) => {
    if(typeof prop.val === 'string'){
      let cnt = ++count.cnt
      if(random){
        if(cnt === random){
          // console.log(cnt, prop.path)
          prop.val = field
        }else if(Math.random() > 0.5){
          field = prop.val
        }
      }
    }else{
      findFields(prop,random,count)
    }
  })
  return count.cnt
}

// findField(data)
