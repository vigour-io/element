'use strict'
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')

document.body.appendChild(render({
  key: 'app',
  rotated: {
    text: 'rotate!',
    style: {
      rotate: 45
    }
  },
  scaled: {
    text: 'scale!',
    style:{
      scale: 3
    }
  },
  xd: {
    text: 'x!',
    style:{
      x: 100
    }
  },
  yd:{
    text: 'y!',
    style:{
      y: 100
    }
  },
  everything:{
    text: 'everything!',
    style:{
      y: 100,
      x: 100,
      scale: 3,
      rotate: 45
    }
  }
}))