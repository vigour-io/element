var Element = require('../../../../lib/element')
var App = require('../../../../lib/app')
var fireEvent = require('../../util/util').fireEvent
var platforms = require('../../../../lib/events/nav/platforms')

var app = new App({
  key:'app',
  node: document.body
})

describe('When using arrow Left event', () => {

  before(function () {
    app.set({
      on:{
        arrowLeft (e) {
        }
      }
    })
  })

  it('document body should have a listener for arrowLeft', () => {
    expect(app._on.arrowLeft).to.be.ok
  })

  it('document body should have a samsung tv listener for arrowLeft', () => {
    expect(platforms.left[4]).to.be.equals("samsungLeft")
  })

})
