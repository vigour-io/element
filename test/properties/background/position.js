var Element = require('../../../lib/element')

describe('position', function() {
  var element

  beforeEach(function() {
    element = new Element({
      $inject: require('../../../lib/property/background/'),
      $background: {
        $inject: [
          require('../../../lib/property/background/position'),
        ],
        $x: 50,
        $y: 100,
      }
    })
  })

  it('should have backgroundPosition property in element node', function() {
    expect(element.$node.style.backgroundPosition).to.be.eql("50px 100px")
  })

  describe('remove property', function() {

    xit('should not have backgroundPosition when properties set to null', function() {
      //TODO: vjs still broken to run this test.
      element.$background.set({
        $x: null,
        $y: null
      })

      expect(element.$node.style.backgroundPosition).to.be.not.ok
    })

    xit('should not have backgroundPosition when remove background', function() {
      element.$background.remove()
      expect(element.$node.style.backgroundPosition).to.be.not.ok
    })

  })

})
