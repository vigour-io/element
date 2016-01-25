var Element = require('../../../../lib/element')
Element.prototype.inject(
  require('../../../../lib/events/nav/right')
)
var spy
var fireEvent = require('../util').fireEvent
var App = require('../../../../lib/app')
var fireEvent = require('../util').fireEvent
var platforms = require('../../../../lib/events/nav/platforms')
var eventObj
var focusCount = 0

var app = new App({
  key:'app',
  node: document.body,
  text1: {
    node:'textarea',
    on:{
      arrowRight () {
      }
    }
  },
  text2:{
    node:'textarea',
    on:{
      focus () {
        focusCount ++
      }
    }
  }
})

describe('Navigating through arrows', () => {
  it('Changing from text1 to text2', () => {
    eventObj = document.createEvent("Events");
    eventObj.initEvent("keydown", true, true);
    eventObj.keyCode = 39;
    app.text1.node.dispatchEvent(eventObj);
    expect(focusCount).to.be.equals(1)
  })
  afterEach(() => {
    app.text1.remove()
    app.text2.remove()
  })
})
