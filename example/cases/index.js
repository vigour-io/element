'use strict'
const app = {
  holder: {
    text: {
      val: 'defaultText',
      $add: 'addThis',
      $ios: {
        $add: 'magic'
      },
      $android: 'androidText',
      $transform: function (val) {
        return val + '!'
      }
    }
  }
}

// little testing
function c (target, cases) {
  let overwrite
  let otherProps
  for (let i in target) {
    if (typeof target[i] === 'object') {
      target[i] = c(target[i], cases)
    }
    if (cases[i] !== void 0) {
      if (cases[i] === true) {
        overwrite = target[i]
      }
      delete target[i]
    } else if(!otherProps && i !== 'val') {
      otherProps = true
    }
  }
  if (overwrite) {
    if (otherProps) {
      const targetval = target.val
      if (typeof overwrite === 'object' && typeof targetval === 'object') {
        for (let i in overwrite) {
          targetval[i] = overwrite[i]
        }
      } else if (typeof targetval === 'object') {
        targetval.val = overwrite
      } else {
        target.val = overwrite
      }
    } else {
      target = overwrite
    }
  }
  return target
}

// function merge

const parsed = c(app, {
  $ios: true,
  $android: false,
  $phone: true,
  $tablet: false
})

console.log(JSON.stringify(parsed, function (key, val) {
  return typeof val === 'function' ? val.toString() : val
}, 2))
// ios
// app = {
//   holder: {
//     text: {
//       val: 'iosText',
//       $transform (val) {
//         return val + '!'
//       }
//     }
//   }
// }

