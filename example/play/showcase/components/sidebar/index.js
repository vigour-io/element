'use strict'

var data = require('../../data')

exports.sidebar = {
  logo: {
    type: 'logo',
    on: {
      click () {
        data.state.app.val = data.discover
      }
    }
  },

  menu: {
    Child: {
      type: 'row',
      icon: {
        $: true,
        type: 'icon',
        css: { $prepend: 'icon-', $: 'icon' }
      },
      text: { $: 'title' },
      on: {
        click () {
          this.state.data.getRoot().state.app.val = this.state.data
        }
      }
    },
    $collection: 'menu'
  },

  meta: {
    links: {

    },
    user: {
      buttons: {

      },
      info: {
        profile: {

        },
        icons: {
          settings: {

          },
          cast: {

          }
        }
      }
    }
  }
}
