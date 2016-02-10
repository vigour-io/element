'use strict'
var e = require('../../e')

var pattern = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAa0lEQVQYV2NkgIKmQ37/6+w2MYK4xpnX/h9piWDgFL4E54MZhBSdna7FyEiMIpBhYBNxWQcyCWYjTjchKwK5nRGbw9EVga3+/lbvP7LvsCkCGYbiRlyKdtW2QDwD0oFPkbDUMogbCSkCGQYAka1/qtkEIQkAAAAASUVORK5CYII='
var cat = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdKm2-geWbwC7nj42C2psIPnRzhxNSlmWtkHYH50SnYtmToidU'

var app = e([
  require('./todos'),
  {
    components: {
      todos: {
        properties: {
          project: { background: pattern }
        }
      },
      project: {
        background: cat,
        gurk: {
          type: 'h1',
          text: 'its gurk again!'
        }
      }
    }
  },
  { DOM: document.body }
])

app.set(require('./data'))
