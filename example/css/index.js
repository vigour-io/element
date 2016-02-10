'use strict'
require('./style.less')

var Element = require('../../lib')

global.app = new Element({
  DOM: document.body,
  components: {
    child: {
      css: 'testing...'
    }
  },
  child: {
    type: 'child',
    // css: 'nice!',
    text: 'success!'
  }
})
