
class MyComponment {
  constructor(options) {
    this.options = options
    this.props = options ? options.props || {} : {}
    this.state = options ? options.state || {} : {}
  }
  setState = function (obj) {
    for (var key in obj) {
      if (this.state.hasOwnProperty(key)) {
        this.state[key] = obj[key]
      }
    }
    let old = this.vdom.el
    this.vdom = this.render()
    //有待diff,这里直接替换
    old.parentNode.insertBefore(this.vdom.el, old)
    old.parentNode.removeChild(old)

  }

  _s = function (s) {
    //后续加点东西备用
    return s + ''
  }

  _v = function (s) {
    //后续加点东西备用
    return s
  }
}

MyComponment.prototype = {
  $s: function (s) {
    //后续加点东西备用
    return s + ''
  },

  $v: function (s) {
    //后续加点东西备用
    return s
  }
}
module.exports = MyComponment