'use strict'
var e = require('../../e')

var app = e([
  require('./todos'),
  {
    components: {
      todos: {
        properties: {
          project: {
            background: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAP0lEQVQYV42Q0QoAIAgDz///aMPAKKeQb26HTg0tB6zKVUhI4Bus5tMn2K4Djh7gBGXM7Uvo5riQ/BfUNwwTWfn+CgiQkAMbAAAAAElFTkSuQmCC'
          }
        }
      }
    }
  },
  { DOM: document.body }
])

app.set(require('./data'))
