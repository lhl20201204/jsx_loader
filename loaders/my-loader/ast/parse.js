function getProps (arr) {
  let obj = {}
  for (var key of arr) {
    let m = key.indexOf("=")
    var t = [key.slice(0, m), key.slice(m + 1)]
    obj[t[0]] = t[1]
  }
  return obj
}

function checkPropsHasArrow (template) {//解决< div onClick={()=>    {}}> 提前闭合
  var len = template.length
  var count = 0
  var i = 0
  while (i < len) {
    if (template[i] === '{') {
      count++
    } else if (template[i] === '}') {
      count--
    }
    if (count === 0 && template[i] === '>') {
      let match = template.slice(0, i + 1)
      return [match, match.slice(1, -1)]
    }
    i++
  }

}


function parseTag (tag) {
  let arr = []
  var i = 0
  let len = tag.length
  let count = 0
  while (i < len) {
    let t = ""
    while (i < len && (tag[i] != ' ' || count > 0)) {
      if (tag[i] === "{") {
        count++
      }
      if (tag[i] === "}") {
        count--
      }
      t = t + tag[i]
      i++
    }
    t && arr.push(t)
    i++
  }

  let ret = []
  ret.push(arr.shift())
  let need = 0
  let cache = ""
  for (var i = 0; i < arr.length; i++) {
    let ei = arr[i].indexOf('=')
    if (need === 0) {
      if (ei === -1) {
        cache = cache + arr[i]
        need = 1
      } else if (ei === arr[i].length - 1) {
        cache = cache + arr[i]
        need = 2
      } else {
        cache = cache + arr[i]
        ret.push(cache)
        cache = ""
        need = 0
      }
    } else if (need === 1) {
      if (arr[i].length === 1) {
        cache = cache + arr[i]
        need = 2
      } else {
        cache = cache + arr[i]
        ret.push(cache)
        cache = ""
        need = 0
      }
    } else {
      cache = cache + arr[i]
      ret.push(cache)
      cache = ""
      need = 0
    }
  }
  return ret
}

module.exports = function (template) {
  //<div className="parent" ><div onClick={this.change}>{this.state.count1}</div><div>{this.state.count2}</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div></div>
  // var match = template.match(/\<.*?\>/g)
  // console.log(match)
  var ast = { tag: null, props: {}, children: [] }
  let stack = [ast]
  var cur = stack[stack.length - 1].children
  var isInBrackets = 0
  while (template.length) {
    let open = template.indexOf("<")
    let close = template.indexOf("</")
    if (open === -1 && close === -1) {
      break
    }
    if (close === 0) {
      let match = template.match(/\<(.*?)\>/)
      //console.log('闭合', match[0])
      if (match) {
        stack.pop()
        cur = stack[stack.length - 1].children
        template = template.slice(match[0].length)
      }
    } else if (open === 0) {
      let match = checkPropsHasArrow(template)
      if (match) {
        let item = parseTag(match[1])
        //console.log(item)
        let obj = { tag: item[0], props: getProps(item.slice(1)), children: [] }
        stack.push(obj)
        cur.push(obj)
        cur = stack[stack.length - 1].children
      }
      template = template.slice(match[0].length)
    } else {
      var i = 0;
      var text = ""
      while ((template[i] !== '<' || isInBrackets > 0) && i < template.length) {
        if (template[i] === '\r') {
          i++
          continue
        }
        if (template[i] === '{') {
          isInBrackets++
        } else if (template[i] === '}') {
          isInBrackets--
        }
        text = text + template[i]
        i++
      }
      text && cur.push(text)
      template = template.slice(i)
    }
  }
  return ast.children[0]
}