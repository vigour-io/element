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
    // Child: {
    // }
    div: require('../../app/buttons')
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
