'use strict'

exports.discover = {
  type: 'page',
  list: {
    $collection: 'items',
    Child: {
      order: { $: 'order' },
      type: 'list-discover',
      title: null,
      header: {
        title: {
          type: 'title'
        },
        rowcount: {
          text: '2/20'
        },
        button: {
          $: 'link',
          type: 'button',
          text: { $prepend: 'All ', $: 'title' },
          css: { size: 'big' },
          on: {
            click () {
              this.state.data.getRoot().state.app.val = this.state.data
            }
          }
          // { $: 'moreButton' } [true/false or a category]
        }
      },
      hr: {
        order: 1,
        type: 'hr'
      }
    },
    properties: {
      carousel: {
        type: 'carousel'
      },
      posters: {
        list: { Child: { type: 'item-poster' } }
      },
      continue: {
        list: { Child: { type: 'item-video' } }
      },
      videos: {
        list: { Child: { type: 'item-video' } }
      },
      channels: {
        list: { Child: { type: 'item-channel' } }
      }
    }
  }
}
