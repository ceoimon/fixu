export function getOffset (element) {
  let offsetLeft = element.offsetLeft
  let offsetTop = element.offsetTop
  if (element.offsetParent != null) {
    offsetLeft += getOffset(element.offsetParent).offsetLeft
    offsetTop += getOffset(element.offsetParent).offsetTop
  }
  return {
    offsetLeft,
    offsetTop
  }
}
