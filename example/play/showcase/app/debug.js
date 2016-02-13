var e = require('../../../../e')

var components = {
  bla: {
    type: 'h1',
    css: 'xxxxx',
    text: 'its bla'
  }
}

var app = e({
  Child: {
    css: 'xxxxx',
    title: {
      text: '---------------',
      order: -1
    }
  },
  components: components
})

// setting xx in one go is wrong since there is no event on e.. may need to do something about it
// make event on initial set it everywhere?
app.set({
  2: {
    bla: {
      type: 'bla',
      order: 1
    },
    xx: {
      type: 'bla',
      text: 'haha this is xx',
      order: 0
    }
  },
  3: {
    bla: {
      type: 'bla',
      order: 1
    },
    gurk: {
      type: 'bla',
      order: 2,
      text: 'gurk'
    },
    xx: {
      type: 'bla',
      text: 'haha this is xx',
      order: 0
    }
  },
  4: {
    bla: {
      type: 'bla',
      order: 1,
      text: 'bla 1'
    },
    gurk: {
      type: 'bla',
      order: 2,
      text: 'gurk 2'
    },
    blax: {
      type: 'bla',
      order: 3,
      text: 'blax 3'
    },
    xx: {
      type: 'bla',
      text: 'haha this is xx 0',
      order: 0
    }
  },
  DOM: document.body
})
