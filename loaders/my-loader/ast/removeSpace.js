module.exports = function (template) {
  template = template.split("")
  var len = template.length
  var isInTag = 0
  var isInBrackets = 0
  var index = 0
  var newTemplate = ''
  while (index < len) {
    if ((!isInBrackets && !isInTag && template[index] === " ") || template[index] === "\n") {
      index++
      continue
    }
    if (!isInBrackets) {
      if (template[index] === "<") {
        isInTag++
      } else if (template[index] === ">") {
        isInTag--
      }
    }
    if (template[index] === "{") {
      isInBrackets++
    }
    if (template[index] === "}") {
      isInBrackets--
    }

    newTemplate = newTemplate + (template[index])

    index++
  }
  return newTemplate
}