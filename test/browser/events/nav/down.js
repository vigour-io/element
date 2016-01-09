var Element = require('../../../../lib/element')
var App = require('../../../../lib/app')
var fireEvent = require('../util').fireEvent
var platforms = require('../../../../lib/events/nav/platforms')

var app = new App({
  key:'app',
  node: document.body
})

describe('Add arrowDown listener', () => {

  before(function () {
    app.set({
      on:{
        arrowDown (e) {
        }
      }
    })
  })

  it('document body should have a listener for arrowDown', () => {
    expect(app._on.arrowDown).to.be.ok

  })

  it('document body should have a samsung tv listener for arrowDown', () => {
    expect(platforms.down[29461]).to.be.equals('samsungDown')
  })

})
