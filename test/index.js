'use strict'
var e = require('../e')
var fakeDom = {}
var test = require('tape')
var toHTML = require('vdom-to-html')

test('children and text', function (t) {
  t.plan(1)
  var app = e({
    child: {
      child: {
        text: 'text'
      }
    },
    DOM: fakeDom
  })
  t.equal(
    toHTML(app.renderTree),
    '<div><div class="child"><div class="child">text</div></div></div>'
  )
})

test('attributes, types and data', function (t) {
  t.plan(1)
  var Observable = require('vigour-observable')
  var Data = new Observable({
    inject: require('vigour-observable/lib/data')
  }).Constructor
  var app = e({
    components: {
      checkbox: {
        type: 'input',
        attributes: {
          type: { $: 'node-type' },
          checked: {
            $transform () {
              return true
            }
          }
        }
      }
    },
    child: { type: 'checkbox' },
    val: new Data({ 'node-type': 'checkbox' }),
    DOM: fakeDom
  })

  process.nextTick(function () {
    var output = toHTML(app.renderTree)
    t.equal(
      output,
      '<div><input type="checkbox" checked class="child type-checkbox"></div>'
    )
  })
})

test('css compare functionality with complex types', function (t) {
  t.plan(1)
  var app = e({
    components: {
      a1: {
        text: 'hello!',
        css: { s: 'i-a1' }
      },
      b1: {
        css: { inherits: 'i-b1' },
        a1: { type: 'a1' }
      },
      b2: {
        type: 'b1',
        css: { inherits: 'i-b2' },
      },
      p1: { s: { type: 'b1' } },
      p2: { s: { type: 'b2' } }
    },
    posts: { type: 'p1' },
    DOM: fakeDom
  })
  app.set({ posts: { type: 'p2' }})
  process.nextTick(function () {
    var output = toHTML(app.renderTree)
    t.equal(
      output,
      '<div><div class="posts type-p2"><div class="type-b2 s i-b2"><div class="type-a1 a1 i-a1">hello!</div></div></div></div>'
    )
  })
})

test('creating and using cases in element', function (t) {
  t.plan(2)
  // use references to cases check if it works!
  // cases have to be scoped to an app not global on elem, it's annoying to test!
  var app = e({
    cases: { $test: true },
    text: 'nothing',
    child: { text: 'child' },
    $test: {
      text: 'active',
      child: {
        text: {
          val: [ '$', 'cases', '$test' ],
          $transform (val) {
            if(val === true) {
              return '$test'
            }
          }
        }
      }
    },
    DOM: fakeDom
  })
  var output = toHTML(app.renderTree)
  t.equal(output, '<div>nothing<div class="child">$test</div>active</div>')
  app.cases.$test.val = false
  process.nextTick(function () {
    output = toHTML(app.renderTree)
    t.equal(output, '<div><div class="child">child</div>nothing</div>')
  })
})

test('conditional subscription', function (t) {
  t.plan(2)
  var Observable = require('vigour-observable')
  var Data = new Observable({
    inject: require('vigour-observable/lib/data')
  }).Constructor
  var app = e({
    components: {
      title: {
        $: {
          val: true,
          condition (data, event) {
            return data && data.loaded && data.loaded.val
          }
        },
        text: { $: 'title' }
      }
    },
    DOM: fakeDom,
    title: { type: 'title' },
    val: new Data({
      title: 'title'
    })
  })
  var output = toHTML(app.renderTree)
  t.equal(output, '<div></div>')
  app.origin.set({ loaded: true })
  process.nextTick(function () {
    output = toHTML(app.renderTree)
    t.equal(output, '<div><div class="title type-title">title</div></div>')
  })
})
