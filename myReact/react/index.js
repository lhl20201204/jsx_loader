
const MyComponment = require("./MyComponment")

class VDOM {
  constructor(el, props, cc) {
    this.el = el
    this.props = props
    this.children = cc
  }
}



module.exports = class MyReact {
  static MyComponment = MyComponment
  static cache = new Map()
  static id = 0
  static createElement = function (tag, props, children, options) {
    props = props || {}
    children = children || []
    if (typeof tag !== 'string') {
      // props && console.log(props.id)
      // if (props && props.id && !MyReact.cache.has(props.id)) {
      //   MyReact.cache.set(props.id, new tag({ props }))
      // }
      let vm
      if (options && options.childComps && options.updataing) {
        vm = options.childComps.shift()
      } else {
        vm = new tag({ props })
      }
      vm.props = props
      // console.log(vm.props)
      console.log(tag)
      // const vm = new tag({ props })
      let vdom = vm.render()
      vm.options.render = true
      if (options) {
        if (!options.childComps) {
          options.childComps = []
        }
        options.childComps.push(vm)
      }
      vm.vdom = vdom
      return vm.vdom
    }
    let el = window.document.createElement(tag)
    for (var x in props) {
      if (x === 'className') {
        el.setAttribute('class', props[x])
      } else if (x === 'onClick') {
        el.addEventListener('click', props[x])
      } else {

        el.setAttribute(x, props[x])
      }

    }
    let cc = []
    for (var x of children) {
      if (x && (x instanceof VDOM)) {
        el.appendChild(x.el)
        cc.push(x)
      } else {
        if (Array.isArray(x) && x.every(v => v instanceof VDOM)) {
          for (var ttt of x) {
            el.appendChild(ttt.el)
            cc.push(ttt)
          }
        } else {
          let textn = document.createTextNode(x)
          el.appendChild(textn)
          cc.push(new VDOM(textn, {}, x))//这里待定
        }
      }
    }
    return new VDOM(el, props, cc)
  }
}