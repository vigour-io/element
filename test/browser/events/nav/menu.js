var Element = require('../../../../lib/element')
var App = require('../../../../lib/app')
var fireEvent = require('../util').fireEvent
var platforms = require('../../../../lib/events/nav/platforms')

var app = new App({
  key:'app',
  node: document.body
})

describe('Add menuButton listener', () => {

  before(function () {
    app.set({
      on:{
        menuButton (e) {
        }
      }
    })
  })

  it('document body should have a listener for menuButton', () => {
    expect(app._on.menuButton).to.be.ok
  })

  it('document body should have a samsung tv listener for menuButton', () => {
    expect(platforms.menu[75]).to.be.equals("samsungMenu")
  })

})
