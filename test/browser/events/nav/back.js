var Element = require('../../../../lib/element')
var App = require('../../../../lib/app')
var fireEvent = require('../util').fireEvent
var platforms = require('../../../../lib/events/nav/platforms')

var app = new App({
  key:'app',
  node: document.body
})

describe('Add button back listener', () => {

  before(function () {
    app.set({
      on:{
        backButton (e) {
        }
      }
    })
  })

  it('document body should have a listener for backButton', () => {
    expect(app._on.backButton).to.be.ok
  })

  it('document body should have a samsung tv listener for backButton', () => {
    expect(platforms.back[88]).to.be.equals("samsungReturn")
  })

  it('document body should have a web os tv listener for backButton', () => {
    expect(platforms.back[1537]).to.be.equals("lgWebos")
  })
})
