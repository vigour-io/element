'use strict'

var Observable = require('vigour-js/lib/observable')
var e = require('../../../../e')

// var data = require('../data')
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../../../lib/subscription/stamp'),
  properties: {
    video: {
      $transform: 'https://s3-eu-west-1.amazonaws.com/sbsvigour/output/111700_794541d68c8c4fbe47407aaaaa70ceef/{type}s/111700.{type}'
    }
  },
  Child: 'Constructor'
}).Constructor

var data = new Data()

var xxx = data.set({
  discover: {
    items: {
      discChannels: {
        link: [ '$', 'channels' ],
        items: [
          [ '$', 'channels', 'items', 'bla' ],
          // [ '$', 'channels', 'items', 'bla2' ],
          // [ '$', 'channels', 'items', 'bla3' ]
        ]
      }
    }
  },
  channels: {
    items:  {
      bla: {
        title: 'its the bla channel'
      }
    }
  }
}, false)

var somethingelse = e({
  text: 'bla',
  inject: {
    properties: {
      xx: Observable
    },
    gurkens: {
      text: ' ---> hello'
    }
  }
})

// can also add order to props maybe
var app = e({ //eslint-disable-line
  components: {
    bla: somethingelse
  },
  bla: {
    type: 'bla',
    lildifference: {
      text: 'x'
    }
  },
  DOM: document.body
})

console.log(data)