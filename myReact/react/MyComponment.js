
class MyComponment {
  constructor(config) {
    this.config = config
    this.props = config ? config.props || {} : {}
    this.state = config ? config.state || {} : {}
  }
  setState = function (obj) {
    for (var key in obj) {
      if (this.state.hasOwnProperty(key)) {
        this.state[key] = obj[key]
      }
    }
    let old = this.vdom.el
    this.options.updataing = true
    this.vdom = this.render()
    this.options.updataing = false
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
  //相比之前加了个配置项，可作为配置处理
  options = {}
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