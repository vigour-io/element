var Element = require('../../lib/element')
var Property = require('../../lib/property')
var Base = require('vjs/lib/observable')
var Observable = require('vjs/lib/observable')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/attributes'),
  require('../../lib/property/transform'),//.extended(),
  require('../../lib/property/backgroundcolor'),
  require('../../lib/property/backgroundImage'),
  require('../../lib/property/text')
)

describe('creating new property',function(){
  var el = new Element({
    $flags:{
      test:new Observable()
    }
  })

  // it('should be able to set el.test to 1',function(){
  //   el.set({
  //     test:1
  //   })
  //   expect(el.test.$val).to.equal(1)
  // })

  it('should be able to set el.test to 0',function(){

    console.error(Observable,Property)

    el.set({
      test:0
    })

    console.log('>>>',el.test.$val)
    expect(el.test.$val).to.equal(0)
  })
})

describe('$x, $y, $z', function() {
  it('should set translate3d property for $x', function () {
    var value = 440

    var elem = new Element({
      $x: value
    })

    expect(elem.$node.style.transform).to.equal('translate3d(' + value + 'px, 0px, 0px)')
  })

  it('should set translate3d property for $y', function () {
    var value = 340

    var elem = new Element({
      $y: value
    })

    expect(elem.$node.style.transform).to.equal('translate3d(0px, ' + value + 'px, 0px)')
  })

  it('should set translate3d property for $z', function () {
    var value = 15

    var elem = new Element({
      $z: value
    })

    expect(elem.$node.style.transform).to.equal('translate3d(0px, 0px, ' + value + 'px)')
  })

  describe('-> together', function() {
    it('should set translate3d property for $x and $y', function () {
      var valueX = 440
      var valueY = 230

      var elem = new Element({
        $x: valueX,
        $y: valueY
      })

      expect(elem.$node.style.transform).to.equal('translate3d(' + valueX + 'px, ' + valueY + 'px, 0px)')
    })

    it('should set translate3d property for $x and $z', function () {
      var valueX = 440
      var valueZ = 12

      var elem = new Element({
        $x: valueX,
        $z: valueZ
      })

      expect(elem.$node.style.transform).to.equal('translate3d(' + valueX + 'px, 0px, ' + valueZ + 'px)')
    })

    it('should set translate3d property for $y and $z', function () {
      var valueY = 221
      var valueZ = 12

      var elem = new Element({
        $y: valueY,
        $z: valueZ
      })

      expect(elem.$node.style.transform).to.equal('translate3d(0px, ' + valueY + 'px, ' + valueZ + 'px)')
    })

    it('should set translate3d property for $x, $y and $z', function () {
      var valueX = 120
      var valueY = 221
      var valueZ = 19

      var elem = new Element({
        $x: valueX,
        $y: valueY,
        $z: valueZ
      })

      expect(elem.$node.style.transform).to.equal('translate3d(' + valueX + 'px, ' + valueY + 'px, ' + valueZ + 'px)')
    })
  })
})

describe('$translate', function() {
  it('should set translate property on the element', function () {
    var value = '20px, 30px'

    var elem = new Element({
      $translate: value
    })

    expect(elem.$node.style.transform).to.equal('translate(' + value + ')')
  })
})

describe('$translate3d', function() {
  it('should set translate3d property on the element', function () {
    var value = '20px, 30px, 0px'

    var elem = new Element({
      $translate3d: value
    })

    expect(elem.$node.style.transform).to.equal('translate3d(' + value + ')')
  })
})

describe('$skew, $skewX and $skewY', function() {
  it('should set skew properties on the element', function () {
    var value = '30deg, 20deg'

    var elem = new Element({
      $skew: value
    })

    expect(elem.$node.style.transform).to.equal('skew(' + value + ')')
  })

  it('should set skew propertiy for only X', function () {
    var value = 11

    var elem = new Element({
      $skewX: value
    })

    expect(elem.$node.style.transform).to.equal('skew(' + value + 'deg, 0deg)')
  })

  it('should set skew property for only Y', function () {
    var value = 44

    var elem = new Element({
      $skewY: value
    })

    expect(elem.$node.style.transform).to.equal('skew(0deg, ' + value + 'deg)')
  })
})

describe('$scale', function() {
  it('should set scale property on the element', function () {
    var value = '1.1, 1.4'

    var elem = new Element({
      $scale: value
    })

    expect(elem.$node.style.transform).to.equal('scale(' + value + ')')
  })

  it('should set scale propertiy for only X', function () {
    var value = 1.5

    var elem = new Element({
      $scaleX: value
    })

    expect(elem.$node.style.transform).to.equal('scale(' + value + ', 0)')
  })

  it('should set scale property for only Y', function () {
    var value = 1.8

    var elem = new Element({
      $scaleY: value
    })

    expect(elem.$node.style.transform).to.equal('scale(0, ' + value + ')')
  })
})

describe('$rotate', function() {
  it('should set rotate property on the element', function () {
    var value = '180deg'

    var elem = new Element({
      $rotate: value
    })

    expect(elem.$node.style.transform).to.equal('rotate(' + value + ')')
  })
})

describe('-> together', function() {
  it('should set x, y, rotate and scaleY properties together', function () {
    var x = 150,
        y = 440,
        rotate = '15deg',
        scaleY = 2.4

    var elem = new Element({
      $x: x,
      $y: y,
      $rotate: rotate,
      $scaleY: scaleY
    })

    expect(elem.$node.style.transform).to.equal(
      'rotate(' + rotate + ') ' +
      'translate3d(' + x + 'px, ' + y + 'px, 0px) ' +
      'scale(0, ' + scaleY + ')'
    )
  })

  it('should set x, z, skewX and scaleX properties together', function () {
    var x = 330,
        z = 4,
        skewX = 15,
        scaleX = 1.7

    var elem = new Element({
      $x: x,
      $z: z,
      $skewX: skewX,
      $scaleX: scaleX
    })

    expect(elem.$node.style.transform).to.equal(
      'translate3d(' + x + 'px, 0px, '+ z + 'px) ' +
      'skew(' + skewX + 'deg, 0deg) ' +
      'scale(' + scaleX + ', 0)'
    )
  })

  it('should set translate, rotate and scale properties together', function () {
    var translate = '330px, 40px',
        rotate = '15deg',
        scale = '0.8, 1.7'

    var elem = new Element({
      $translate: translate,
      $rotate: rotate,
      $scale: scale
    })

    expect(elem.$node.style.transform).to.equal(
      'rotate(' + rotate + ') ' +
      'translate(' + translate + ') ' +
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
  var skewX = 15
  var scaleX = 1.7

  var elem = new Element({
    $x: valueX
  })

  it('should add transform on defined element', function () {
    expect(elem.$node.style.transform).to.equal('translate3d(' + valueX + 'px, 0px, 0px)')

    elem.set({
      $y: valueY
    })

    expect(elem.$node.style.transform).to.equal('translate3d(' + valueX + 'px, ' + valueY + 'px, 0px)')

    elem.set({
      $skewX: skewX,
      $scaleX: scaleX
    })

    expect(elem.$node.style.transform).to.equal(
      'translate3d(' + valueX + 'px, ' + valueY + 'px, 0px) ' +
      'skew(' + skewX + 'deg, 0deg) ' +
      'scale(' + scaleX + ', 0)'
    )
  })
})


describe('removing transforms', function () {
  var valueX = 100
  var valueY = 270
  var opacity = 1.6
  var skewY = '30deg'

  var elem = new Element({
    $x: valueX
  })

  it('should remove property on defined element', function () {
    expect(elem.$node.style.transform).to.equal('translate3d(' + valueX + 'px, 0px, 0px)')

    elem.$x.remove()

    expect(elem.$node.style.transform).to.equal('translate3d(0px, 0px, 0px)')
  })
})