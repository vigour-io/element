var Element = require('../../../../lib/element')
var App = require('../../../../lib/app')
var platforms = require('../../../../lib/events/nav/platforms')
var documentBody = document.implementation.createHTMLDocument('test').body
var spy

var app = new App({
  key:'app',
  node:documentBody
})

describe('When using arrow Up event', function () {
  before(function () {
    app.set({
      elem: new Element({
        on: {
          arrowUp () {
          }
        }
      })
    })
  })

  it('document body should have a listener for arrowUp', function () {
    expect(app.elem._on.arrowUp).to.be.ok
  })

  it('document body should have a samsung tv listener for arrowUp', function () {
    expect(platforms.up[29460]).to.be.equals("samsungUp")
  })

})
