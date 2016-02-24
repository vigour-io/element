'use strict'
var e = require('../e')
var fakeDom = {}
var test = require('tape')
var toHTML = require('vdom-to-html')

test('children and text', function (t) {
  var app = e({
    child: {
      child: {
        text: 'text'
      }
    },
    DOM: fakeDom
  })
  t.plan(1)
  t.equal(
    toHTML(app.renderTree),
    '<div><div class="child"><div class="child">text</div></div></div>'
  )
})

test('attributes and types', function (t) {
  var app = e({
    components: {
      checkbox: {
        type: 'input',
        attributes: {
          type: 'checkbox',
          checked: {
            $transform () {
              return true
            }
          }
        }
      }
    },
    child: {
      type: 'checkbox'
    },
    DOM: fakeDom
  })
  t.plan(1)
  var output = toHTML(app.renderTree)
  t.equal(
    output,
    '<div><input type="checkbox" checked class="child type-checkbox"></div>'
  )
})