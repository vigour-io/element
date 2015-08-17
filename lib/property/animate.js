"use strict";

var Property = require('./')
var easing = require('./easing')

var moveAnim
function animate (event, $element, $settings, css) {
  var duration = $settings.$time
  var $element = $element
  var $node = $element.$node

  if (css) {
    $settings.$easing = $settings.$easing.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    $settings.$time += 'ms'
    $settings.$delay += 'ms'

    $element.set({
      $transition: $settings.$time + ' ' + $settings.$easing + ' all ' + $settings.$delay,
      $x: $settings.$x,
      $y: $settings.$y,
      $opacity: $settings.$opacity
    })

    $node.addEventListener('webkitTransitionEnd', $settings.$callback );

    console.log($settings.$time + ' ' + $settings.$easing + ' all ' + $settings.$delay)

    return
  }

  cancelAnimationFrame(moveAnim)

  var current = {
    x: $element.$x ? $element.$x.$val : $node.getBoundingClientRect().left,
    y: $element.$y ? $element.$y.$val : $node.getBoundingClientRect().top,
    opacity: $element.$opacity ? $element.$opacity.$val : $node.style.opacity
  }

  var distanceX = $settings.$x - current.x,
    distanceY = $settings.$y - current.y,
    speedX = distanceX / duration,
    speedY = distanceY / duration,
    start = null;

  var moveActually = function (timestamp) {
    if (!start) start = timestamp;

    var progressTime = timestamp - start

    var moveTo = {
      x: current.x + (speedX * progressTime * easing[$settings.$easing](progressTime, duration)),
      y: current.y + (speedY * progressTime * easing[$settings.$easing](progressTime, duration))
    };

    $element.set({
      $x: moveTo.x,
      $y: moveTo.y
    })

    console.log(moveTo.x)

    if (progressTime < duration) {
      moveAnim = requestAnimationFrame(moveActually);
    } else {
      if($settings.$callback) {
        $settings.$callback(event)
      }
    }
  }

  if ($settings.$delay)
    console.info('animation delayed for', $settings.$delay, 'ms')

  setTimeout(function() {
    moveAnim = requestAnimationFrame(moveActually);
  }, $settings.$delay)
}

exports.$flags = {
  /**
   * CSS3 Animation with javascript callback
   * @type {object}
   * @memberOf Property
   *
   * @example
   * var a = new Element( {
   *   $x: 100,
   *   $y: 200,
   *
   *   $animate: {
   *     $duration: 600,
   *     $x: 500,
   *     $y: 600,
   *     $opacity: 0.2,
   *     $easing: 'easeInOut',
   *     $time: 600
   *   }
   * })
   *
   */

  $animate: new Property({
    $on: {
      $change: function( event, removed ) {
        var $element = this.$parent
        var $node = $element.$node
        var $val = this.$val

        this.$test = 'test'

        var $settings = {
          $x: this.$x ? this.$x.$val : 0,
          $y: this.$y ? this.$y.$val : 0,
          $opacity: this.$opacity ? this.$opacity.$val : 0,
          $easing: this.$easing ? this.$easing.$val : 'linear',
          $time: this.$time ? this.$time.$val : 400,
          $delay: this.$delay ? this.$delay.$val : 0,
          $callback: this.$callback ? this.$callback._$val : 0
        }

        animate(event, $element, $settings, false)

        this.set(null, event)
      }
    }
  })
}