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
        type: 'icon',
        css: {
          $: 'key',
          $transform (val) {
            val = 'discover'
            return `icon-${val}`
          }
        }
      },
      text: {
        val: 'discover'
      }
    },
    discover: {}
    // div: require('../../app/buttons')
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
