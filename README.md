# t-store

这是一个简易版的类 `redux` 库, 同时也受到 `react` `hook` 的部分启发，提供一个函数式的 微型 store 管理。

## 安装

`npm install t-store -S`

## 适用对象

* 小型业务系统, 对 store 管理要求不高

* 模块 data 或 state 管理. 比如 微信小程序 globaldata 不适用的情况下

## 使用

```javascript
import createState from 't-store'

// 类似 react hook 写法
// 返回值是一个函数
const useFoo = createState({foo: 'bar'})

// 取值, 改变值统一使用 changeFoo 函数
const [value, changeFoo] = useFoo()

// 如果想监控值的改变, 传入一个监控函数即可
// 监控函数会立即执行一次
const [value, changeFoo, unSubscribe] = useFoo((val) => { /* 这里可以监控 val 的改变, 比如进行 setState */ })

// 后面再修改值就会被监控到
changeFoo({foo: 'updated'})

// 如果想取消监控
unSubscribe()

```

# 特性

* [x] 轻量, 无 `action` `reducer` 等概念

* [x] 支持订阅

* [ ] 支持类 `redux` `store` 概念

* [ ] 支持扩展

* [ ] 提供扩展辅助函数
