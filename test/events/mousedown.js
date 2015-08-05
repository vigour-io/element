var Element = require( '../../lib/element' )
var app = require( '../../lib/app' )
var fireEvent = require('./util').fireEvent
var mousedownPath
var spy
var elemInstance
var elem

//add mousedown listener to original
describe('Add mousedown listener',function(){

	before(function(){
		if(app.elem){
			app.elem.remove()
		}
		elem = new Element()
		app.set({elem:elem})
	})

	it('app.elem.set({ $on:{ mousedown:function(){ mousedownCount++ } } })',function(){
		elem.set({ $on:{ mousedown:function(){ mousedownPath = this.$path } } })
	})

	it( 'elem now has a mousedown listener', function () {
		expect(elem.$on.mousedown).to.be.ok
	})

	it( 'mousedownPath is undefined', function () {
		expect(mousedownPath).to.equal(void 0)
	})
})

//Create instance of elem
describe('Create instance of elem',function(){

	before(function(){
		if(app.elemInstance){
			app.elemInstance.remove()
		}
	})

	it('app.elemInstance = new elem.$Constructor()',function(){
		elemInstance = new elem.$Constructor()
		app.set({elemInstance:elemInstance})
	})

	it( 'elemInstance inherited mousedown listener', function () {
		expect(elemInstance.$on.mousedown).to.be.ok
	})

	it( 'mousedownPath is undefined', function () {
		expect(mousedownPath).to.equal(void 0)
	})
})

//Fire mousedown on elem
describe('Emit mousedown on elem',function(){
	
	before(function(){
		spy = sinon.spy( elem.$on.mousedown.$fn, 'val' )
		mousedownPath = void 0
	})

	it('elem.$emit(\'mousedown\')',function(){
		elem.$emit('mousedown')
	})	

	it('elem.$on.mousedown fired once',function(){
		expect(spy.calledOnce).to.be.ok
	})

	it("mousedownPath === ['app','elem']",function(){
		expect(mousedownPath).to.deep.equal(['app','elem'])
	})

})

//Fire mousedown on elem
describe('Trigger mousedown on document.body',function(){
	
	before(function(){
		mousedownPath = void 0
		spy.reset()
		fireEvent( document.body, 'mousedown')
	})

	it('elem.$on.mousedown is not fired',function(){
		expect(spy.called).to.not.be.ok
	})

})

//Fire mousedown on elem
describe('Trigger mousedown on elem node',function(){
	
	before(function(){
		mousedownPath = void 0
		spy.reset()
		fireEvent( elem.$node, 'mousedown')
	})

	it('elem.$on.mousedown fired once',function(){
		expect(spy.calledOnce).to.be.ok
	})

	it("mousedownPath === ['app','elem']",function(){
		expect(mousedownPath).to.deep.equal(['app','elem'])
	})

})

//Fire mousedown on elem
describe('Trigger mousedown on elemInstance node',function(){
	
	before(function(){
		mousedownPath = void 0
		spy.reset()
		fireEvent( elemInstance.$node, 'mousedown')
	})

	it('elemInstance.$on.mousedown fired once',function(){
		expect(spy.calledOnce).to.be.ok
	})

	it("mousedownPath === ['app','elemInstance']",function(){
		expect(mousedownPath).to.deep.equal(['app','elemInstance'])
	})

})