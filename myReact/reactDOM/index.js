module.exports = class MyReactDOM {

  static render = function (Ctor, el) {
    if (Ctor.el) {//直接传vdom
      console.log(Ctor)
      return el.appendChild(Ctor.el)
    }
    const vm = new Ctor()//直接传构造函数
    let vdom = vm.render()
    vm.vdom = vdom

    el.appendChild(vdom.el)
  }
}