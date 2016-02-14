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
  buttons: {
    Child: {
      row: {
        type: 'row',
        icon: {
          type: 'icon'
        }
      }
    },
    left: {
      row: {
        icon: {
          css: 'icon-left',
          order: -1
        },
        title: {
          text: 'Previous'
        }
      },
      on: {
        down (e, event) {
          this.parent.parent.container.previous()
        }
      }
    },
    right: {
      row: {
        icon: {
          css: 'icon-right'
        },
        title: {
          text: 'Next'
        }
      },
      on: {
        down (e, event) {
          this.parent.parent.container.next()
        }
      }
    }
  }
  // buttonLeft: {
  //   text: 'left',
  //   on: {
  //     down (e, event) {
  //       this.parent.container.previous()
  //     }
  //   }
  // },
  // buttonRight: {
  //   text: 'right',
  //   on: {
  //     down (e, event) {
  //       this.parent.container.next()
  //     }
  //   }
  // }
}



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
