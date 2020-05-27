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

import { isFunction, isEvent, getValueOfEvent, noop } from './utils';

export default function createState(initialValue) {
  let currentState = getValue(initialValue);
  let listeners = [];

  function getValue(v) {
    let val = null;
    if (isEvent(v)) {
      val = getValueOfEvent(v);
    }

    return val === null ? v : val;
  }

  function update(newValue) {
    const preState = currentState;
    currentState = getValue(newValue);
    notify(currentState, preState);
  }

  function subscribe(listener) {
    if (isFunction(listener)) {
      listeners.push(listener)

      return unSubscribe(listener)
    }

    return noop;
  }

  function unSubscribe(listener) {
    return function() {
      const inx = listeners.indexOf(listener);
      if (inx > -1) {
        listeners.splice(inx, 1);
      }
    }
  }

  function notify(cur, prev) {
    listeners.forEach(f => f(cur, prev));
  }

  return function(listener) {
    if (isFunction(listener)) {
      subscribe(listener);

      // 立即执行一次
      listener(currentState);
      return [currentState, update, subscribe, unSubscribe(listener)];
    }

    return [currentState, update, subscribe];
  }
}
