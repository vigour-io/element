
var Element = require('../../../lib/element')
var Property = require('../../../lib/property')
var Switcher = require('../../../lib/switcher')
var switcher
var spy
var spyAnimation
var secondContainer
var firstContainer
Property.prototype.inject(
  require('../../../lib/animation')
)

Element.prototype.inject(
  require('../../../lib/property/css'),
  require('../../../lib/property/transform'),
  require('../../../lib/property/opacity'),
  require('../../../lib/property/text'),
  require('../../../lib/property/transition'),
  require('../../../lib/property/css'),
  require('../../../lib/property/draggable'),
  require('../../../lib/property/size'),
  require('../../../lib/events/drag'),
  require('../../../lib/animation')
)

describe('--> Switcher' , () => {

  switcher = new Switcher

  firstContainer = new Element({
    key:1,
    x:{
      val:0,
      $animation: {

      }
    },
    y:{
      val:0,
      $animation: {

      }
    }
  })

  secondContainer = new Element({
    key:2,
    x:{
      val:0,
      $animation: {

      }
    },
    y:{
      val:0,
      $animation: {

      }
    }
  })

  switcher.emit('add',[null,{'1': firstContainer}])

  it('Emiting switchto event', () => {
    spy = sinon.spy(switcher._on.switchto.fn, 'animate')
    switcher.emit('switchto',[firstContainer, secondContainer,'left', 50])
    expect(spy.calledOnce).to.be.ok
  })

  it('should add the second container on the receiver', () => {
    expect(switcher.node.children.length).to.be.equals(2)
  })
  it('should insert the second container before the firstContainer', () =>{
    expect(switcher.node.children[0].base.key).to.be.equals('2')
  })
  it('should have the transation end event', () => {
    spyAnimation = sinon.spy(switcher[1]._on.transitionEnd.fn, 'val')
    expect(spyAnimation).to.be.ok
  })
})
