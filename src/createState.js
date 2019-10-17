/*
 * Copyright (c) [2019] Zhang Yansen.All rights reserved.
 *
 * t-store is licensed under the Mulan PSL v1.
 * You can use this software according to the terms and conditions of the Mulan PSL v1.
 * You may obtain a copy of Mulan PSL v1 at:
 *
 *     http://license.coscl.org.cn/MulanPSL
 *
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR
 * FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v1 for more details.
 */

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
