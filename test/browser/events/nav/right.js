var Element = require('../../../../lib/element')
var App = require('../../../../lib/app')
var fireEvent = require('../../util/util').fireEvent
var platforms = require('../../../../lib/events/nav/platforms')

var app = new App({
  key:'app',
  node: document.body
})

describe('Add arrowRight listener', () => {

  before(function () {
    app.set({
      on:{
        arrowRight (e) {
        }
      }
    })
  })

  it('document body should have a listener for arrowRight', () => {
    expect(app._on.arrowRight).to.be.ok

  })

  it('document body should have a samsung tv listener for arrowRight', () => {
    expect(platforms.right[5]).to.be.equals("samsungRight")
  })

})
