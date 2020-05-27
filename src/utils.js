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

export function noop() {}

 /**
  * 是否函数
  * @param {*} fn 
  */
export function isFunction (fn) { return typeof fn === 'function' }

// 微信小程序特有属性
const wechatEventProps = ['detail']

/**
 * 是否标准事件对象
 * 如果包含 3 个及以上的标准属性，则认为是
 * @param {*} extendProps
 * @param {*} e 
 */
export function isEvent (e, extendProps, num = 3) {
  if (!e || typeof e !== 'object') return false;

  const standProps = [
    'bubbles',
    'cancelable',
    'currentTarget',
    'eventPhase',
    'target',
    'timeStamp',
    'type',
  ]

  const props = standProps.concat(extendProps || wechatEventProps);
  let count = 0;
  for (let key in e) {
    if (props.indexOf(key) > -1) {
      count += 1;
    }
  }

  return count >= num;
}

/**
 * 简易版本的事件内容读取
 * @param {*} e 
 */
export function getValueOfEvent(e) {
  const { target, detail } = e || {};
  const element = target || detail;
  if (element === undefined) return null;

  const {
    // radio
    checked,
    // input text
    value,
    // select
    selectedIndex,
  } = target;

  if (checked !== undefined) return checked;
  if (selectedIndex !== undefined) {
    return target.options[selectedIndex].value;
  }

  return value;
}
