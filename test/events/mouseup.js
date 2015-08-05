var Element = require( '../../lib/element' )
var app = require( '../../lib/app' )
var fireEvent = require('./util').fireEvent
var mouseupPath
var spy
var elemInstance
var elem

//add mouseup listener to original
describe('Add mouseup listener',function(){

	before(function(){
		if(app.elem){
			app.elem.remove()
		}
		elem = new Element()
		app.set({elem:elem})
	})

	it('app.elem.set({ $on:{ mouseup:function(){ mouseupPath = this.$path } } })',function(){
		elem.set({ $on:{ mouseup:function(){ mouseupPath = this.$path } } })
	})

	it( 'elem now has a mouseup listener', function () {
		expect(elem.$on.mouseup).to.be.ok
	})

	it( 'mouseupPath is undefined', function () {
		expect(mouseupPath).to.equal(void 0)
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

	it( 'elemInstance inherited mouseup listener', function () {
		expect(elemInstance.$on.mouseup).to.be.ok
	})

	it( 'mouseupPath is undefined', function () {
		expect(mouseupPath).to.equal(void 0)
	})
})

//Fire mouseup on elem
describe('Emit mouseup on elem',function(){
	
	before(function(){
		spy = sinon.spy( elem.$on.mouseup.$fn, 'val' )
		mouseupPath = void 0
	})

	it('elem.$emit(\'mouseup\')',function(){
		elem.$emit('mouseup')
	})	

	it('elem.$on.mouseup fired once',function(){
		expect(spy.calledOnce).to.be.ok
	})

	it("mouseupPath === ['app','elem']",function(){
		expect(mouseupPath).to.deep.equal(['app','elem'])
	})

})

//Fire mouseup on elem
describe('Trigger mouseup on document.body',function(){
	
	before(function(){
		mouseupPath = void 0
		spy.reset()
		fireEvent( document.body, 'mouseup')
	})

	it('elem.$on.mouseup is not fired',function(){
		expect(spy.called).to.not.be.ok
	})

})

//Fire mouseup on elem
describe('Trigger mouseup on elem node',function(){
	
	before(function(){
		mouseupPath = void 0
		spy.reset()
		fireEvent( elem.$node, 'mouseup')
	})

	it('elem.$on.mouseup fired once',function(){
		expect(spy.calledOnce).to.be.ok
	})

	it("mouseupPath === ['app','elem']",function(){
		expect(mouseupPath).to.deep.equal(['app','elem'])
	})

})

//Fire mouseup on elem
describe('Trigger mouseup on elemInstance node',function(){
	
	before(function(){
		mouseupPath = void 0
		spy.reset()
		fireEvent( elemInstance.$node, 'mouseup')
	})

	it('elemInstance.$on.mouseup fired once',function(){
		expect(spy.calledOnce).to.be.ok
	})

	it("mouseupPath === ['app','elemInstance']",function(){
		expect(mouseupPath).to.deep.equal(['app','elemInstance'])
	})

})