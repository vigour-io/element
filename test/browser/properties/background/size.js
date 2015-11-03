var Element = require('../../../../lib/element')

describe('size', function () {
  var element

  beforeEach(function () {
    element = new Element({
      inject: require('../../../../lib/property/background/'),
      background: {
        inject: [
          require('../../../../lib/property/background/size'),
        ],
        width: 100,
        height: 100,
      }
    })
  })

  it('should have backgroundSize property in element node', function () {
    expect(element.node.style.backgroundSize).to.be.eql('100px 100px')
  })

  describe('remove property', function () {
    xit('should not have backgroundSize when properties set to null', function () {
      // TODO: vigour-js still broken to run this test.
      element.background.set({
        width: null,
        height: null
      })

      expect(element.node.style.backgroundSize).to.be.not.ok
    })

    xit('should not have backgroundSize when remove background', function () {
      element.background.remove()
      expect(element.node.style.backgroundSize).to.be.not.ok
    })

  })

})
