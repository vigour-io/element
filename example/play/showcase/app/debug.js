var e = require('../../../../e')

var components = {
  bla: {
    type: 'h1',
    css: 'xxxxx',
    text: 'its bla'
  }
}

var app = e({
  components: components,
  bla: {
    type: 'bla',
    order: 0
  },
  xx: {
    type: 'bla',
    text: 'haha this is xx',
    order: 1
  }
})

// setting xx in one go is wrong since there is no event on e.. may need to do something about it
// make event on initial set it everywhere?
app.set({
  DOM: document.body
})
