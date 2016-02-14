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
    Child: {},
    prerender (props, children) {
      var hash = this.state.data.focus.val
      for (var i = children.length - 1; i >= 0; i--) {
        let child = children[i]
        let state = child.state
        if (state.data.origin.hash === hash) {
          if (!state.props) {
            state.props = {
              properties: {
                className: 'active'
              }
            }
          } else {
            state.props.properties.className = 'active'
          }
        }
      }
    },
    $collection: 'items'
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
