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