'use strict'
var merge = require('lodash/object/merge')

exports.carousel = {
  container: merge(require('../../../../../lib/carousel'), {
    items: {
      $collection: 'items',
      Child: {
        type: 'item-carousel'
      }
    }
  }),
  indicator: {
    Child: {}
  },
  buttonLeft: {
    text: 'left',
    on: {
      down (e, event) {
        this.parent.container.previous()
      }
    }
  },
  buttonRight: {
    text: 'right',
    on: {
      down (e, event) {
        this.parent.container.next()
      }
    }
  }
}



// merge(require('../../../../../lib/carousel'), {
//   items: {
//     $collection: 'items',
//     Child: {
//       type: 'item-carousel'
//     }
//   },
//   indicator: {
//     Child: {}
//   },
//   buttonLeft: {
//     text: 'left',
//     on: {
//       down (e, event) {
//         this.parent.previous()
//       }
//     }
//   },
//   buttonRight: {
//     text: 'right',
//     on: {
//       down (e, event) {
//         this.parent.next()
//       }
//     }
//   }
// })

exports['item-carousel'] = {
  type: 'item',
  img: {
    img: { src: { $: 'img.spotlight' } }
  },
  title: {
    img: {
      type: 'thumb',
      img: { src: { $: 'img.spotlight' } }
    }
  }
}
