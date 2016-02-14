'use strict'
var merge = require('lodash/object/merge')

exports.carousel = merge(require('../../../../../lib/carousel'), {
  items: {
    $collection: 'items',
    Child: {
      type: 'item-carousel'
    }
  },
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
          this.parent.parent.previous()
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
          this.parent.parent.next()
        }
      }
    }
  }
})

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
