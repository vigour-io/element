var Element = require('../../../../lib/element')

var element
var childElement

describe('--> backgroundImage', function () {
  beforeEach(function () {
    element = new Element({
      inject: require('../../../../lib/property/background'),
      background: {
        inject: require('../../../../lib/property/background/image'),
        image: './mouse.png'
      }
    })

    childElement = new element.Constructor()
  })

  it('should set the backgound image for element', function (done) {
    var elementImage = element.node.style.backgroundImage.indexOf('mouse.png')
    expect(elementImage).to.not.be.equal(-1)
    done()
  })

  // it('childElement should inherit the background image from element', function (done) {
  //   var elementImage = childElement.node.style.backgroundImage.indexOf('mouse.png')
  //   expect(elementImage).to.not.be.equal(-1)
  //   done()
  // })

  // it('childElement background image changes should not change element background image', function (done) {
  //   childElement.set({
  //     background: {
  //       image: './anotherImage.png'
  //     }
  //   })

  //   var elementImage = element.node.style.backgroundImage.indexOf('mouse.png')
  //   expect(elementImage).to.not.be.equal(-1)
  //   done()
  // })

  // it('childElement background image changes should change only itself', function (done) {
  //   childElement.set({
  //     background: {
  //       image: './anotherImage.png'
  //     }
  //   })

  //   var elementImage = childElement.node.style.backgroundImage.indexOf('anotherImage.png')
  //   expect(elementImage).to.not.be.equal(-1)
  //   done()
  // })

  // it('remove childElement background Image' , function () {
  //   childElement.background.image.remove()
  //   expect(childElement.node.style.backgroundImage).to.be.equals('')
  // })

// it('remove element background Image should remove childElement background Image' , function () {
//   element.background.image.remove()
//   expect(childElement.node.style.backgroundImage).to.be.equals('')
// })
})
