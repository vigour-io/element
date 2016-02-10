'use strict'
var e = require('../../e')

var app = e([
  require('./todos'),
  {
    components: {
      todos: {
        properties: {
          project: {
            background: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAa0lEQVQYV2NkgIKmQ37/6+w2MYK4xpnX/h9piWDgFL4E54MZhBSdna7FyEiMIpBhYBNxWQcyCWYjTjchKwK5nRGbw9EVga3+/lbvP7LvsCkCGYbiRlyKdtW2QDwD0oFPkbDUMogbCSkCGQYAka1/qtkEIQkAAAAASUVORK5CYII='
          }
        }
      }
    }
  },
  { DOM: document.body }
])

app.set(require('./data'))
