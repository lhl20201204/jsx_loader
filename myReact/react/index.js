
const MyComponment = require("./MyComponment")

class VDOM {
  constructor(el) {
    this.el = el
  }
}



module.exports = class MyReact {
  static MyComponment = MyComponment
  static cache = new Map()
  static id = 0
  static createElement = function (tag, props, children) {
    if (typeof tag !== 'string') {
      if (props && props.id && !MyReact.cache.has(props.id)) {
        MyReact.cache.set(props.id, new tag({ props }))
      }
      const vm = props && props.id ? MyReact.cache.get(props.id) : new tag({ props })
      vm.props = props
      //console.log(tag, props, children)
      // const vm = new tag({ props })
      let vdom = vm.render()
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
    for (var x of children) {
      if (x && (x.el instanceof HTMLElement)) {
        el.appendChild(x.el)
      } else {
        if (Array.isArray(x) && x.every(v => v instanceof VDOM)) {
          for (var ttt of x) {
            el.appendChild(ttt.el)
          }
        } else {
          el.appendChild(document.createTextNode(x))
        }
      }
    }
    return new VDOM(el)
  }
}