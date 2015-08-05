var Element = require('../../lib/element')
var Observable = require('vjs/lib/observable')

// var expect = chai.expect

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/attributes'),
  require('../../lib/property/transform'),//.extended(),
  require('../../lib/property/backgroundcolor'),
  require('../../lib/property/backgroundImage'),
  require('../../lib/property/text'),
  require('vjs/lib/methods/lookUp')
)

describe('Properties', function() {
  // var a = new Element({
  //  $backgroundcolor: 'red',
  //  $text: 'simple text',
  //  $css: 'test',
  //  $width: 100,
  //  $height: 100,
  //  $attributes: {
  //    draggable:true
  //  }
  // })

  // var customImage = new Observable({
  //  $val: "/test.jpg"
  // })

  // var b = new Element({
  //  $backgroundImage:{
  //    $val: customImage,
  //    $on:{
  //      $error:function (argument) {
  //        this.$loadError = "error"
  //      }
  //    }
  //  }
  // })

  describe('Transform', function() {

    describe('$x, $y, $z', function() {

      it('should set translate3d property for $x', function () {
        var value = 440

        var thing = new Element({
          $x: value
        })

        expect(thing.$node.style.transform).to.equal('translate3d(' + value + 'px, 0px, 0px)')
      })

      it('should set translate3d property for $y', function () {
        var value = 340

        var thing = new Element({
          $y: value
        })

        expect(thing.$node.style.transform).to.equal('translate3d(0px, ' + value + 'px, 0px)')
      })

      it('should set translate3d property for $z', function () {
        var value = 15

        var thing = new Element({
          $z: value
        })

        expect(thing.$node.style.transform).to.equal('translate3d(0px, 0px, ' + value + 'px)')
      })

      describe('-> together', function() {

        it('should set translate3d property for $x and $y', function () {
          var valueX = 440
          var valueY = 230

          var thing = new Element({
            $x: valueX,
            $y: valueY
          })

          expect(thing.$node.style.transform).to.equal('translate3d(' + valueX + 'px, ' + valueY + 'px, 0px)')
        })

        it('should set translate3d property for $x and $z', function () {
          var valueX = 440
          var valueZ = 12

          var thing = new Element({
            $x: valueX,
            $z: valueZ
          })

          expect(thing.$node.style.transform).to.equal('translate3d(' + valueX + 'px, 0px, ' + valueZ + 'px)')
        })

        it('should set translate3d property for $y and $z', function () {
          var valueY = 221
          var valueZ = 12

          var thing = new Element({
            $y: valueY,
            $z: valueZ
          })

          expect(thing.$node.style.transform).to.equal('translate3d(0px, ' + valueY + 'px, ' + valueZ + 'px)')
        })

        it('should set translate3d property for $x, $y and $z', function () {
          var valueX = 120
          var valueY = 221
          var valueZ = 19

          var thing = new Element({
            $x: valueX,
            $y: valueY,
            $z: valueZ
          })

          expect(thing.$node.style.transform).to.equal('translate3d(' + valueX + 'px, ' + valueY + 'px, ' + valueZ + 'px)')
        })

      })

    })

    describe('$translate', function() {

      it('should set translate property on the element', function () {
        var value = '20px, 30px'

        var thing = new Element({
          $translate: value
        })

        expect(thing.$node.style.transform).to.equal('translate(' + value + ')')
      })

    })

    describe('$translate3d', function() {

      it('should set translate3d property on the element', function () {
        var value = '20px, 30px, 0px'

        var thing = new Element({
          $translate3d: value
        })

        expect(thing.$node.style.transform).to.equal('translate3d(' + value + ')')
      })

    })

    describe('$skew, $skewX and $skewY', function() {

      it('should set skew properties on the element', function () {
        var value = '30deg, 20deg'

        var thing = new Element({
          $skew: value
        })

        expect(thing.$node.style.transform).to.equal('skew(' + value + ')')
      })

      it('should set skew propertiy for only X', function () {
        var value = 11

        var thing = new Element({
          $skewX: value
        })

        expect(thing.$node.style.transform).to.equal('skew(' + value + 'deg, 0deg)')
      })


      it('should set skew property for only Y', function () {
        var value = 44

        var thing = new Element({
          $skewY: value
        })

        expect(thing.$node.style.transform).to.equal('skew(0deg, ' + value + 'deg)')
      })

    })

    describe('$scale', function() {

      it('should set scale property on the element', function () {
        var value = '1.1, 1.4'

        var thing = new Element({
          $scale: value
        })

        expect(thing.$node.style.transform).to.equal('scale(' + value + ')')
      })

      it('should set scale propertiy for only X', function () {
        var value = 1.5

        var thing = new Element({
          $scaleX: value
        })

        expect(thing.$node.style.transform).to.equal('scale(' + value + ', 0)')
      })


      it('should set scale property for only Y', function () {
        var value = 1.8

        var thing = new Element({
          $scaleY: value
        })

        expect(thing.$node.style.transform).to.equal('scale(0, ' + value + ')')
      })

    })

    describe('$rotate', function() {

      it('should set rotate property on the element', function () {
        var value = '180deg'

        var thing = new Element({
          $rotate: value
        })

        expect(thing.$node.style.transform).to.equal('rotate(' + value + ')')
      })

    })

    describe('-> together', function() {

      it('should set x, y, rotate and scaleY properties together', function () {
        var x = 150,
            y = 440,
            rotate = '15deg',
            scaleY = 2.4

        var thing = new Element({
          $x: x,
          $y: y,
          $rotate: rotate,
          $scaleY: scaleY
        })

        expect(thing.$node.style.transform).to.equal(
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

        var thing = new Element({
          $x: x,
          $z: z,
          $skewX: skewX,
          $scaleX: scaleX
        })

        expect(thing.$node.style.transform).to.equal(
          'translate3d(' + x + 'px, 0px, '+ z + 'px) ' +
          'skew(' + skewX + 'deg, 0deg) ' +
          'scale(' + scaleX + ', 0)'
        )
      })

      it('should set translate, rotate and scale properties together', function () {
        var translate = '330px, 40px',
            rotate = '15deg',
            scale = '0.8, 1.7'

        var thing = new Element({
          $translate: translate,
          $rotate: rotate,
          $scale: scale
        })

        expect(thing.$node.style.transform).to.equal(
          'rotate(' + rotate + ') ' +
          'translate(' + translate + ') ' +
          'scale(' + scale + ')'
        )
      })

    })

  })

  describe('$opacity', function() {

    it('should set opacity on the element', function () {
      var value = 0.4

      var thing = new Element({
        $opacity: value
      })

      expect(thing.$node.style.opacity).to.equal(value.toString())
    })

  })



  describe('$css', function() {

    // it( 'elem now has key \'elemKey\'', function () {
    //  elem.set({$key:'elemKey'})
    //  expect(elem._$key).to.equal('elemKey');
    // })

    // it( 'elem now has a path [\'elemKey\']', function () {
    //  expect(elem.$path).to.deep.equal(['elemKey']);
    // })

    // it( 'elem still has no context', function () {
    //  expect(elem._$context).to.not.be.ok;
    // })

  })




  // it( 'Set background-color on an element', function (done) {
  //  expect(a.$node.style.backgroundColor).to.equal("red")
  //  done()
  // })

  // it( 'Set a css class on an element', function (done) {
  //  expect(a.$node.className).to.equal("test")
  //  done()
  // })

  // it( 'Set a custom text on an element', function (done) {
  //  expect(a.$node.textContent).to.equal("simple text")
  //  done()
  // })

  // it( 'Change the width and the height of an element', function (done) {
  //  expect(a.$node.style.width).to.equal("100px")
  //  expect(a.$node.style.height).to.equal("100px")
  //  done()
  // })
  // it( 'Set any attributes on an element', function (done) {
  //  expect(a.$node.draggable).to.be.true
  //  done()
  // })
})

// describe( 'Background Image property' ,function () {
//  it( 'Trigger erro event if an error occours when loading an image', function (done) {
//    expect(b.$backgroundImage.$loadError).to.equal('error')
//    done()
//  })
//  it( 'Trigger load event if the image loads with succed', function (done) {
//    // expect(b.$backgroundImage.$success).to.be.equal('true')
//    done()
//  })
// })
