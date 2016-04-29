'use strict'
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')

document.body.appendChild(render({
  key: 'app',
  transformed: {
    text: 'transform!',
    style: {
      transform: 'rotate(7deg) skewX(10deg)'
    }
  },
  // rotated: {
  //   text: 'rotate!',
  //   style: {
  //     transform: {
  //       rotate: 45
  //     }
  //   }
  // },
  // scaled: {
  //   text: 'scale!',
  //   style:{
  //     transform: {
  //       scale: 1.2
  //     }
  //   }
  // },
  // xd: {
  //   text: 'x!',
  //   style:{
  //     transform: {
  //       x: 100
  //     }
  //   }
  // },
  // yd:{
  //   text: 'y!',
  //   style:{
  //     transform: {
  //       y: 100,
  //       x: 50
  //     }
  //   }
  // },
  everything:{
    text: 'everything!',
    style:{
      transform: {
        y: 100,
        x: 100,
        scale: 3,
        rotate: 45
      }
    }
  }
}))