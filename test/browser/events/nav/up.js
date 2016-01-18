var Element = require('../../../../lib/element')
var App = require('../../../../lib/app')
var fireEvent = require('../util').fireEvent
var platforms = require('../../../../lib/events/nav/platforms')

var app = new App({
  key:'app',
  node: document.body
})

describe('Add arrowUp listener', () => {

  before(function () {
    app.set({
      on:{
        arrowUp (e) {
        }
      }
    })
  })

  it('document body should have a listener for arrowUp', () => {
    expect(app._on.arrowUp).to.be.ok
  })

  it('document body should have a samsung tv listener for arrowUp', () => {
    expect(platforms.up[29460]).to.be.equals('samsungUp')
  })

})
