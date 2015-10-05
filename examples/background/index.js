require('./style.less')
var app = require('../../lib/app')
var Element = require('../../lib/element')
var Property = require('../../lib/property')
Property.prototype.inject(require('../../lib/animation'))

var mouse = new Property({
  x: 0,
  y: 0
})

var thing = new Element({
  inject: [
    require('../../lib/property/size'),
    require('../../lib/property/transform')
  ],
  width: 200,
  height: 200,
  // rotate: { val: mouse.y, multiply:0.5,
  //   animation: {
  //     duration: 30
  //   }},
  //
  //  },
  // x: {
  //   val: mouse.x,
  //   // multiply: function() {
  //   //   // console.log(this.parent.key)
  //   //   return this.parent.key/2
  //   // },
  //   animation: {
  //     duration: 30
  //   }
  // },
  background: {
    inject: [
      require('../../lib/property/background/size'),
      require('../../lib/property/background/position')
    // require('../../lib/property/draggable')
    ],
    x: {
      val: mouse.x,
      // multiply: { val: -2.},
      animation: { duration: 200 }
    },
    width: {
      val: 100,
      animation: { duration: 100 }
    },
    y: {
      val: mouse.y,
      animation: { duration: 200 }
    },
    // draggable:true,
    // width: {
    //   val: 300,
    //   animation: { duration: 200 }
    // },
    // height: '300%',
    // size: '10% 20%',
    // position: '-10% 20%',
    val: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQSEhUUEBQVFRUVFxUWFRYXFxQUFRUWFRQYGBQXFBYYHCggGBomHBQUIjEiJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGiwkHCQsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLP/AABEIAKgBKwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYCBwj/xAA7EAABAwIEAwUHAgYCAgMAAAABAAIRAyEEBRIxQVFxBiJhgZEHE6GxwdHwMuEUI0JSYvEVgnKSFzND/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAIDAQQF/8QAIxEAAgICAgIDAQEBAAAAAAAAAAECEQMhEjEEQRMiUWFCMv/aAAwDAQACEQMRAD8A9tQhCYiCEIQAIQhAAhCEACEIQAiJVF2lzk0IDZk8hJvss6O1RaRqJE80kskYumUjilJWjeVKoG/GwXTXA7LHV821DUSl7P58TiDSdEFsgoWSLdB8Uqs2KEJU5MRCVCAEQlQgBEIQgBIRCVC0wSFFx+MFJpcfLxUl7oXn/azOJcYNmpJz4RseEOTodzPOXk3NjsAncpxxDgZnw8FlaWYteLm6jMzLS+x9L+q4vm3yOv49Uez03SARxXUKu7OVC6gwnjdWa707VnE1To4hELqELTDiEQukLQOYSQuiiEWYckJIXUIhbYDqRKkSDCoSIQAqEIQAISIQAqbrvhpPIFdqvz9xFF8cr8bcUGrsxmZY1tQnU4EieO3gspmtQufocO6f0vBuCjPKJnXTM8wYn1F/VUVM1nTIIYAZJPLaF5uSVs9LHClaZcPq1W0g2ZLd4O0KZhM4dLHyTAi8at/DoqzL8SZv3WxzuU1X921v8u7p3F3ajsCBwRxaVpjcb7PbMkzVtamHA3i/VWWteHZBndTD1Ax5ILoMTa/1W3w3azvBp/0unH5UWvtpnFk8dp66N2ClVZhM2Y4C6e/5FnMLpW+iFNExCi/xg5pqrj28Cm4mUyfKQlVDs3aLKLWz9seMLNLtm8GaHWk1hZc5+LX4z8ExW7QQd9/9LOUP0b45Fh2gzYUwRO4Xl2Z42SZO8qx7U5tqdE2287/RZXE1S4/kLg8jLzlS6R14sdIa77jDDBO54jorrJAynDX7ncnn4qnwwIcHDzWs7K5X/FVwD+lt3HwUIq2kuysnS30el9lnE4dsiLkDhIBsQrdc0qYaABsBA8l0vWWkea3bsEIQgUEkJULQEQlQQgDmEQlQgBUIKFhoIQhAAhKhACJUIQAJrEUtTSDxCcQgDybtFlPu6pawEX2cflCoMXgHkd11hu2LSOgW+9ouAqOiowSAINidN5mxHr4LyjG4utJaCOt49F5+aCjI9HA+a7OMSajagNSNJ5G1uFlNwADnkhw0iCRxm8X8j6KE4As0OcHcTI4i6YwFcU3xAg2tIjkSdhdT5aou3qiV2go1S4VWNktAB6Db6+il9l8U19N7qsiqHNg6jtPdEbHZSG40VGRBuPOeAPmE1lOHbLTH9Tj6AR9Uiq+hL1s1+Ax5a2XFTatYktI53WXbUmxMCLnzvv42Vt/HAAfkKsX6ItEjPc/NFoEweqY7M56ar4cZBnnwP+l532szfXV0tvCu+wBJfJPAeo3+iHOfJP0U+NKB6bqGoyOAP0UPEYeXW5Kawg+ig5liQwjnsuibpWznirYy+ltO+5UDF4Ml4jYX9b/ZXWFHvGSu6+HiZ2/ZLXJWF0zAdpMGYmb8OvExyFgs1S1gwR1B+fwXqWOwg0yGyf6ZvHjCxOOwL9UmSfl4ACwUcmOtloTOsvoyLr1D2eZeKdJz+Lj8AvOcDSNhxJhezZHhfd0WN5ASq+LG5X+EfIl9aJ6EIXacgIQhAAhCFpgJClSIAEQgIQB0hIlWGiIQqDtGa9Ee+w5JDb1KYvLeJaDxWN0rNSt0X6JWRyvtV7xocCHA+R8R1V1SzdjhvdEZRl0zXCSLWUijsxALZCcbUTUKOFC4fUATdTFta0kkQN0UA68CLrO5z2ewlQE1GNB/uHdNzKg5n2tuW0myeBWPz01arCXPdIFrx0UJ54JV2Wx4pX3RUdtuyxw4FWg8vpnfvao5b9QspL3NgMMnbkeV+H18Fpsmyxzm66ztDZIGowLdVfMwFNzf5FSm8jgIkxyXE/t9ox0dqlx03ZisG57Q15Bv+ocZET9D16KwoYkNqNbw1PE+AH2Vo+hqcGxt+r1N/KI81YN7LNqQ7VpcGuH/ALU9APkIS49sJsyn/KAwXGBpa4jnIGkRxlzjbwVfm3aQNbYzuPF7uQPIcT9wk7UZLVoO0wYFyW22bEt6AkAc6hM2WSq5VWPeLCGCwiXQBwA35/VdKxR9sk5v0hHVzUdqPEyRw+69E7H4ptNt4Bj62grA4fA1GwWU3EH+qJPUDb83V3gMkr1hMkR1AO4I8CsypaplYu40z02r2mpiwcDY7KpbmD8RUB4BVmC7Oe7HfdO0dLFaHKaQmG+fgoSjOffRn1j0avJhDQFYYkgqmZiNNm3P5upOElx7y6YypcUc7VuzvEYfV05KDVyzVyE/m6vXUuSVtNV42LdFLl2RA1W2s0gk2vGwHJb+lsqKiQ1WNLFK0MaS0Sm2ychMtrSnWuWtUTFQhCw0EIQgwEFCRaAiVIlhACyhCEACCEIWAeedsuzRoOdicGNIJmrTFmn/ADA4HmqfL85FUWMOG7eIK9YqsDgQRINivFe3GRPwdb3lGQDdp8OIPNceeDh949ezswTU/q+zUYbPHNBAI6KXR7UmNBAmLFYHKc3bXFoFQfqbxtxHMKbVd8DI/ZIvImkO8SvaNVjs9dvq8FQ1s1qVO7qJ89wqbHY7mVGw+YAu0g3XPPPOTKxxJI0GHpPDgQJ5qR2rLxhi+m2XNh0dL/ZQ8FU1b1mN85I/LK7wxpEGnUeXtdY2sOirjqicuzw7M86NRzn1qet0AM1ToaOJjn0hTOzoq/xdHSDS1POpgkaQASZBuDbjzheiZj7PsNUJc3EVGTNtIcPQ8ekKDmuSUaT3VnVH1ajmhpLjHBocQ0cSWyT4rqlNKOyaVy0MnNC6tV93+nUBq5ie/p58vNaXLMfOmTwIPzCyWCxABmeg5KNicy928Bh7zidIgmQCLdLrjh3Z0uF6PUK9BmJpQ8AmLG1isPXwD6LpZGniPuftZXHZ7MathUaWAAGZBDjsQCDw8VosVljazNVMiY25rpnj5K0c6fB0zMYGnTqiHNve/wCdVIOXGnZlw6filp4TQ7aPvwVnhmmLwVKH9Gl/CA/LNZGp1hw2T7aTaQhgv0klXNHDWunmYZs7dFbjZPkVmGwTz4fNW2Gw+lPtYnWp4wSFcgaErnQlLk06lKo3+CoadXJtCeouKepURxXb4Gy2MX22DY7RrKfRq2VA6vfuqRTxRGydTT0xHEvDVETyUc5jT/uHqsvmuNqEFoMDjFvis3icXAIbJPHdSnlUekNHFfZtcz7W0qVmy8jlt6qrb2xe6HNawNm7TMkdeCwFTMhJDjdRMDUfUmHQz4nouR+TOzoWCKR7JlvaSlVEk6fU/JXLHhwBBkG4I2IXkGT4kscQvQuy2Y62+7O7RI6SunDm56fZDLi47RfJZSJVcgIlCRCAFSpEIAVZ/tnl4q0HWBcBIWgUTNKIfTcCJBBWNWqGi6aZ8w5tW9zV1MsQfj6K+wOce8YCRB6qsznAH+Je1uwcR8eIUr3YY2DuPH7wvIlXGvZ63ZPdTY679+Uz8FEq1W7NpBwG55DiZn4qAwydiR47jpsn8Tivds+NzMH/AKhKomnT6BnU3+WZ4Hfwjf59FeZXJ3e8G3EDyI4f7VZlNAOOquRH9oMtM9dvRaluNoEBschHPhCdR/pKUhT3Rd7j5qmzClIJMxzMrT1n4ei2ajmt6/CyxvaPto0d2kxxadyBaOiv8GiSmZrMcSWOinv+bKVkLianvahaYa4NBIHetz52FvooNXLHVXNqtBDXG4JF54iCrfK8Afehht+vQQ0SQREzwu34hLSjpFm7Rt8lb7ymW/3NmwIGq8xJOyv+zOIcwe7fwt4z4rOZFTcA0xu1wOr9ZLSdhstXR3BA3F+HwV8crOeYzm9ECpYWN1HwhcDBXXaLF6S0+UqPhsaHCQbhJOuYRviXRqWgKRR8SqqliLSeCkU8SEykK0WrUoUKnWXZr8AqqQlEouCGVVHA5pxi22A+aqj18UAPBN4ok2CZrUbeKyUn0gSQtO9xZTaQsomDZG6mOdCIL2Evwi4mkIM+f+lje0wIFhAuAOJPKAJK2jgSomNwsi0A84kjoskuSNi6PGMfRfq74DbWbsY6KXlOPIsPRX2d5GAXFkkn9T3XPiqnA5Y8OBY0kjzPwXFODTOtSTRZUmVXEXDR4XJW27JBzXgAkkm55BUuV5NWrQGiOdojzK9C7O5L/DtOqC4q+DG+VnPlmqouQlRCRdxxioSIhAAlCRAQAqj449w9E+q/O3RTdeLH8stRq7PEM9Zpq1HuiZPKD5bLM47HX/YK/wC01TvOBdeTPP7rL1WAfqIHjufmvH05bPWj0cHNy0Qxl+c2TVJ1R5l5O/A/kqwZhmFoLTPLguW9zabz42mI+B/JT84rpDJDtPBVnnSwwbc5+Gy2PZzKmUoNVwc/f+6ORMzJ6LLYHE6QdPdP56K97L4rvnUSXczeB+cEkZbEyJtFD7UsY73raYJADf3dHWQPLxWUqVKJZFKk+WgaquoghxO5aJAB23W29oWW6tNfcNgOG/dNifgCszgsEwnTSc55fE06ZJLoMjU3aAQDewXoQejkl2W3YzHVH0K1NxcfdFtRpJO095vTj5q9xxJ93UZMsI1dAQ4HxBg+pUjKcmGCw5D497WMnwB4DwABUBmO0VQP6Zh3Lc/RceaSUy+NXE2mWVAbDeZv4q7oeBkfJVGBDYB4j9vsn8djBTYXDhwVoNKNkXbZUdrMSS08CD8OnFQslxA0hs78eJKr8ZX94152nhuCucHWDGgyGtG+5/0uZy5Oy/GlRqRiLNDnEXjrCnMxAiBt9Fk6ecNc9oG3MjcDlyU2jmIc8gXnjw8AOadToRxNPRxE7KdSqgKgp1dIUunjB8leMybiXbXJ1pVTTxcqZRqqyZNomkrkuXINk0N7rWYkOe9ATdWuoOYYwjYQq+niXE3+ajPJWiih7NFSfI3XFVwG6r6GJjiouJxgBvf1WfIkg4bOMxomsdDfQWHnzV72Z7Mml3i8dAJHqqzJmmrUmIbyG/xW8wrABYQrYoprmJkk46O2UwOAldJUKxzgllIhAHIKWUkIhaAShIUSgBVVZ67+W652O1lZkrJdqc/YA6k3vHZx4BLKairY8ItvR5Lj8I6vVcKYO+/AeJKj18lpUv8A7D7ypvH9PQDc9Vp8TjGtbDbRwbN52kqizZupswGmJguAvwMbAWXlJb0elZVUO84ho9Dp+H7JzG4PbpHGdzfwF+PJRcorGnUIdGk+IN/8W7njYA+S0telJ1O7s/pbYmOBMHfbbmtnja2gU6ZmWUy0hXuU4gC5InnaLc1ArUudp+vFd4M3Anoo2O9ovcyqCowztsdx3eKf7P1KFJs0qbBM3aBc+PM7quzDuU3E8j6rI5fmrmOLf6eA5HirxnOnQnxqRt80xDqtQGbNmen4FQ1qepjncdRA9Su/40+5L+JMKuzDHFrGtbsTJ/PL4qMU5PY610bfIsaS3vch8lXZ/nBa4tH5/pQcoxZtG0LnM6XvCTxCbk6oTiuVsh43EB1I8D0JHWBt5W6LnCYkinFYgnhMO6SOIVbmGrU0N/pvvC1PZ/LG12k1hDBc8/Ll+6eKqKBmcwbX+8Dvdmbgw0xtwHBquMlxRYTrsBJXoDKVLTpA7unRp5gbgniJv5qHjezDSO53Zny4mU8o30Jz/Suw+M1iTITgxclukSJA+/yXdTs6bBxIFtuKnf8AEOvpd0EbdPFLxkjNHOCLzNtv9qyZWe25BVHicfVw8arzsALDry81fZNmLMQ2+/EfaU8Jbq9iyVK60TsJiw5d1Hc0zWw4bcEhdCY3BVlJ9Mm0u0RMewO4fNV5tsAPMKRmeK0j8+pVC/EyZjV8FLK1ZSCLKpXI3UDFV+9+H4Luk/VtIQKQc7mfNRpsfo2HYqhLdRNz+bLZNCzWQFrGAQr9mIC9aEGoJHBkdyH0oTYqhdB62hDtcolCwBJRK4lGpNQHSRc61yXooDO9tc4dRpEUzBcQCbSAd4M26rzh+IJ4+kx5yvS+1GVjEUnNbAdEjqNivLX03sJZVaQ9u/0PKD4Lh8uMlJP0duCuJHxzwBqc4mOA2E8gqPNcZVeCKJFNogF0gASL6nm5cbbTsp+ZP7psspicTA/mEkC4bs0dY4kxt67KWJbLtaFo0HN75e1xGzoAk8xO/wANlt8o0GnrqVNbovtb/G3G682fmGsnXGnYCBDR5g/ALoZgwCG+8/8AcBvkAAumULRz8zdY9wNmjqfFRsMwtIIvH59VjaedvaIbMeJ1fMLQZBnbah01IafncDyueS5MnjyWy8Mqei9xlb3jC3aVjqtAsff8utziMGHC2+ypMVgiCZ4EfhUYycWVi0VlbHGo0NbtEx6rl1QuaQRdsEdIg/JM5jQDbtsdxCfw2JHu5dvzVvScQuifkmMgeI4KxrY0AE8TJjosxha93cPH5JjE48kgztE+l/qiONtiya7HqmL1OJEmTtxHl+fNekdnXAYcbd4GY/LLxv3nenj4L0zs1mWqi1rnEuiCD8p4+atlhxSIqXJmlwGJJcXcJIH/AF3+KtqeYPNQiRpsI5ACST6j0VVhg0N/ON1X4zNnNdppNLnnjwb1KhFuOxqs2dbENf3Z2vPKAo1JzmnYxzVNkNKp7zU47/q8ttPXj0WskVBA3GypH7L+iP6nNXDte3vCQs1WwzqFbVTcyOUua7pc6XfBakvDR9+Cr8wotqtEgSNiIJHSU7ha/oqlRNp1hUYnqF2RyVJgQWCJ4+F/RTXYosa478lsX+mNfhnc6xDi4iWmLH7EKppkz+kN6EKxx1d1R0tpzPAi46Hkm6OQVXmQ4tHLb7KcoOT0PGSS2d06pjh5qZgcE97gYHWZVllvZiLvv+clqcDlobsFfF40v9E55V6IuXZe8C5VvSwhHFSKVKE+Au6+OkczdjDaHinAxOQugErkKNhq6XaFlgcQuYTkJIRYDRam3sUjSkLFqkaQKjFnO0GQNr96IeNnfQ8wte6mVFr4Rx2I9CmlxmqkbGTTtHjWbZTUp2qNtz+oP3jzWdxWStcDAJB6R6jbZe3Y/s6+qINQD/rP1WUxvsmZUMmu9p/xEfVcMvFaf1OuOdVs8oqdmmzJcxo8SLxveVPxWX0nUHtoljngRDdMibCAP39VuHexGlv/ABNaejEU/Y1ovSxlRpII/QziITfBP9MeWBi8PlFLC0h76C8xtxJEQOKqcZgqdTv0xtMxa45x+XXoOI9jD3XOMeTa5bJttxTNP2O12GWYsz/4WPUSlfjzu0assaozWS5mWBrah1CLHiOo48laYtzX3BF+PAhWdf2T4g7V2+TCPqmB7LMc39OIbHLR+6m/Gm/Q3yx/TIZnTEQeHJUVWWGxlp9PH5r0l3stxx3rMP8A1/dMn2Q4o71Wen7pseCcfQzzR/Tz0VO73b8+Y6jl4qur1JK9VZ7Gq3GtHQJ3/wCG3H9daTz039Qb+cq8cTXolPKn0ePqxyzHlkCePkvSansbj/8AZ3o1VWP9ltRl2VCeo+y2UG1tE4yp6JeUZ417Q0mCSGjkT+fFaHLGMAuZJvPOfwrzg9nMVRcDpJ07QrrK8ZXa0NfTPdMeMGFwyx8Xo6btG2q42J0T5KyyTFODmzJ1eH5CzGFxVQxFPl4dVdYVmLcIaxo8b/RbCDuxZNUXuZ4xrXED0/Y7rPYvHMJAbaDvFp8DtKed2SxVb9VQgch+fngn8L7N37uqO8b2Pkuh45v0SUor2c4HFB/d/OoWiwWCkXuucD2LazdxK0GFyoM4lVx4q/6ElNeiLRyxvIKZTwQHBS2UYTgC6LS6JWMMoBOimu0JW2ZYAJYShKlswQBKhKsARCWEIASEJUIAEkIQgBIXJCELQEhJpSIWgLpQWpELbAIQGoQgA0o0oQg0NKNCEIsBHtgTE9N02T/ifS/H7fFCFlsDkgH+h3HgPz/abdhWHdh9Ov2+IQhbyYEWrktJxgsPWLKO7srS4BCFnZqkxWdmWDZTcPlIbsShCLroHJlhTownA1CFjYoulEIQsAIRpQhABCIQhAAlQhACIQhAAhCEAf/Z'
  },
  on: {
    click: function ( event ) {
      this.background.width.val += 100
    }
  }
})

var Img = new Element({
  background: {
    inject: require('../../lib/property/background/position')
  }
}).Constructor

var holder = new Element({})

for (var i = 0; i < 10; i++) {
  var t = new thing.Constructor({
    x: {
      val: mouse.x,
      animation: {
        duration: i / 16
      }
    }
  })
  holder.setKey(i, t)
}

app.set({
  holder: holder,
  on: {
    move: function (e, event) {
      mouse.x.val = e.pageX
      mouse.y.val = e.pageY
    },
    down: function (e, event) {
      mouse.x.val = e.pageX
      mouse.y.val = e.pageY
    }
  }
})
