describe('Element Cases',function () {
  const phoneSize = 300
  const desktopSize = 800
  var spy
  var elem

  var Element = require('../../../lib/element/')
  Element.prototype.inject(
  require('../../../lib/property/css'),
  require('../../../lib/property/text'))
  var App = require('../../../lib/app')
  var cases = require('../../../lib/cases')
  var documentBody = document.implementation.createHTMLDocument('test').body

  beforeEach(function () {
    elem = new Element()
    app = new App({
      node: documentBody
    })
  })

  context('When using cases on an Element', function () {
    beforeEach(function () {

      cases.set({
        normalScreen: {
          val: desktopSize,
          inject: require('vigour-js/lib/operator/transform'),
          $transform: function (val, event) {
            return val > 400
          }
        },
        smallScreen: {
          val: phoneSize,
          inject: require('vigour-js/lib/operator/transform'),
          $transform: function (val, event) {
            return val < 400
          }
        }
      })

      elem.set({
        css: {
          val: 'class1',
          $desktop: {
            normalScreen: 'class2'
          }
        },
        text: {
          val: 'text 1',
          $desktop: {
            val: 'bla',
            normalScreen: 'text 2'
          },
          $phone: {
            val: 'text 1 mobile',
            smallScreen: 'text 2 mobile'
          },
          $tv: {
            val: 'text 1 tv',
            smallScreen: 'text 2 tv'
          },
          $tv: {
            val: 'text 1 chromecast',
            smallScreen: 'text 2 chromecast'
          },
          $mac: {
            val: 'text 1 mac',
            smallScreen: 'text 2 mac'
          }
        }
      })
    })

    afterEach(function() {
      cases.$phone.val = false
      cases.$desktop.val = false
      elem.text.val = ''
    })
    //This must be refactored.
    it.skip('should change the element text to desktop if desktop', function () {
      cases.$desktop.val = false
      expect(elem.text.val).to.be.equal('text 2')
    })

    it.skip('should change the element text to phone if phone', function () {
      cases.$phone.val = true
      expect(elem.text.val).to.be.equal('text 2 mobile')
    })

    it.skip('should change the element text to tv if tv', function () {
      cases.$tv.val = true
      expect(elem.text.val).to.be.equal('text 2 tv')
    })

    it.skip('should change the element text to chromecast if chromecast', function () {
      cases.$chromecast.val = true
      expect(elem.text.val).to.be.equal('text 2 chromecast')
    })

    it.skip('should change the element text to mac if mac', function () {
      cases.$mac.val = true
      expect(elem.text.val).to.be.equal('text 2 mac')
    })

    it.skip('should use the default text if the platform doesnt mach', function () {
      expect(elem.text.val).to.be.equal('text 1')
    })
  })
})
