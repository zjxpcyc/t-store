import { isFunction } from './utils'

export default function createState(value) {
  let currentState = isFunction(value) ? value() : value
  let listeners = []

  function setter(value) {
    const nextState = isFunction(value) ? value() : value
    listeners.forEach(listen => listen(nextState))
    currentState = nextState
  }

  function unSubscribe(listener) {
    return function() {
      if (isFunction(listener)) {
        const inx = listeners.indexOf(listener)
        listeners.splice(inx, 1)
      }
    }
  }

  return function(listener) {
    if (isFunction(listener)) {
      listeners.push(listener)

      // 立即执行一次
      listener(currentState)
    }

    return [currentState, setter, unSubscribe(listener)]
  }
}
