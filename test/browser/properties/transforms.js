describe('Element Properties',function () {
  var Element = require('../../../lib/element/')
  var ua = require('../../../lib/ua')
  var transform = ua.prefix + 'Transform'
  var elem
  var value
  Element.prototype.inject(
  require('../../../lib/property/css'),
  require('../../../lib/property/size'),
  require('../../../lib/property/attributes'),
  require('../../../lib/property/transform'),
  require('../../../lib/property/opacity'),
  require('../../../lib/property/text')
)
  beforeEach(function () {
    elem = new Element()
    value = 440
  })
  context('when using transform3d', function () {
    beforeEach(function () {
      elem = new Element({
        x: value
      })
    })

    it('should use x as a translate3d property', function () {
      expect(elem.node.style[transform]).to.equal('translate3d(' + value + 'px, 0px, 0px)')
    })

    it('should use y as a translate3d property', function () {
      elem.set({y:value})
      expect(elem.node.style[transform]).to.equal('translate3d(' + value + 'px, ' + value + 'px, 0px)')
    })
  })

  context('when using scale',function() {

    beforeEach(function () {
      elem.set({scale:value})
    })

    it('should set scale property on the element', function () {
      expect(elem.node.style[transform]).to.equal('scale(' + value + ')')
    })

    it('should be able to remove the element scale property', function () {
      elem.scale.remove()
      expect(elem.node.style[transform]).to.equal('')
    })
  })

  context('when using rotate',function() {

    beforeEach(function () {
      elem.set({rotate:value})
    })

    it('should set rotate property on the element', function () {
      expect(elem.node.style[transform]).to.equal('rotate(' + value + 'deg)')
    })

    it('should be able to remove the element rotate property', function () {
      elem.rotate.remove()
      expect(elem.node.style[transform]).to.equal('')
    })

  })

  context('when using opacity',function() {

    beforeEach(function () {
      elem.set({opacity:value})
    })

    it('should set opacity property on the element', function () {
      expect(elem.node.style.opacity).to.equal(value.toString())
    })

    it('should be able to remove the element opacity property', function () {
      elem.opacity.remove()
      expect(elem.node.style.opacity).to.equal('')
    })
  })

  context('when using everything together',function() {
    var x = 150,
        y = 440,
        rotate = 15,
        scale = 2.4

    var elem = new Element({
      x: x,
      y: y,
      rotate: rotate,
      scale: scale
    })
    it('should have everything on the element', function () {
      elem.set({together:value})
       expect(elem.node.style[transform]).to.equal(
        'translate3d(' + x + 'px, ' + y + 'px, 0px) ' +
        'rotate(' + rotate + 'deg) ' +
        'scale(' + scale + ')'
      )
    })
  })
})

