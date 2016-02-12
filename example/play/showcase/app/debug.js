var e = require('../../../../e')

var components = {
  bla: {
    type: 'h1',
    css: 'xxxxx',
    text: 'its bla'
  }
}

e({
  components: components,
  bla: { type: 'bla' },
  DOM: document.body
})
