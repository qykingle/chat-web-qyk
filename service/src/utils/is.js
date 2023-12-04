export function isNumber(value) {
  return Object.prototype.toString.call(value) === '[object Number]'
}

export function isString(value) {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function isNotEmptyString(value) {
  return typeof value === 'string' && value.length > 0
}

export function isBoolean(value) {
  return Object.prototype.toString.call(value) === '[object Boolean]'
}

export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]'
}
