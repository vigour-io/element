var Element = require('../../lib/element')
var Property = require('../../lib/property')
var Base = require('vjs/lib/observable')
var Observable = require('vjs/lib/observable')
var ua = require('../../lib/ua')
var transform = ua.prefix+'Transform'

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/attributes'),
  require('../../lib/property/transform'),
  require('../../lib/property/opacity'),
  require('../../lib/property/text')
)

describe('creating new property', function(){
  var el = new Element({
    $flags: {
      test: new Observable()
    }
  })

  it('should be able to set new property to 0',function(){
    el.set({
      test: 0
    })

    expect(el.test.$val).to.equal(0)
  })

  it('should be able to set new property to 1',function(){
    el.set({
      test: 1
    })

    expect(el.test.$val).to.equal(1)
  })
})

describe('$x, $y', function() {
  it('should set translate3d property for $x', function () {
    var value = 440

    var elem = new Element({
      $x: value
    })

    console.log('???', elem.$node.style,  elem.$node.style['-webkit-transform'])

    expect(elem.$node.style[transform]).to.equal('translate3d(' + value + 'px, 0px, 0px)')
  })

  it('should set translate3d property for $y', function () {
    var value = 340

    var elem = new Element({
      $y: value
    })

    expect(elem.$node.style[transform]).to.equal('translate3d(0px, ' + value + 'px, 0px)')
  })

  describe('-> together', function() {
    it('should set translate3d property for $x and $y', function () {
      var valueX = 440
      var valueY = 230

      var elem = new Element({
        $x: valueX,
        $y: valueY
      })

      expect(elem.$node.style[transform]).to.equal('translate3d(' + valueX + 'px, ' + valueY + 'px, 0px)')
    })
  })
})


describe('$scale', function() {
  it('should set scale property on the element', function () {
    var value = 1.2

    var elem = new Element({
      $scale: value
    })

    expect(elem.$node.style[transform]).to.equal('scale(' + value + ')')
  })
})

describe('$rotate', function() {
  it('should set rotate property on the element', function () {
    var value = 180

    var elem = new Element({
      $rotate: value
    })

    expect(elem.$node.style[transform]).to.equal('rotate(' + value + 'deg)')
  })
})

describe('-> together', function() {
  it('should set x, y, rotate and scale properties together', function () {
    var x = 150,
        y = 440,
        rotate = 15,
        scale = 2.4

    var elem = new Element({
      $x: x,
      $y: y,
      $rotate: rotate,
      $scale: scale
    })

    expect(elem.$node.style[transform]).to.equal(
      'translate3d(' + x + 'px, ' + y + 'px, 0px) ' +
      'rotate(' + rotate + 'deg) ' +
      'scale(' + scale + ')'
    )
  })
})

describe('$opacity', function() {
  it('should set opacity on the element', function () {
    var value = 0.4

    var elem = new Element({
      $opacity: value
    })

    expect(elem.$node.style.opacity).to.equal(value.toString())
  })
})


describe('adding transforms', function () {
  var valueX = 100
  var valueY = 270
  var scale = 1.7

  var elem = new Element({
    $x: valueX
  })

  it('should add transform on defined element', function () {
    expect(elem.$node.style[transform]).to.equal('translate3d(' + valueX + 'px, 0px, 0px)')

    elem.set({
      $y: valueY
    })

    expect(elem.$node.style[transform]).to.equal('translate3d(' + valueX + 'px, ' + valueY + 'px, 0px)')

    elem.set({
      $scale: scale
    })

    expect(elem.$node.style[transform]).to.equal(
      'translate3d(' + valueX + 'px, ' + valueY + 'px, 0px) ' +
      'scale(' + scale + ')'
    )
  })
})


describe('removing transforms', function () {
  var valueX = 100
  var scale = 2.3

  var elem = new Element({
    $x: valueX,
    $scale: scale
  })

  it('should remove property on defined element', function () {
    expect(elem.$node.style[transform]).to.equal('translate3d(' + valueX + 'px, 0px, 0px) scale(' + scale + ')')

    elem.$x.remove()

    expect(elem.$node.style[transform]).to.equal('scale(' + scale + ')')

    elem.$scale.remove()

    expect(elem.$node.style[transform]).to.equal('')
  })
})
