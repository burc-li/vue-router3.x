# vue-router

### 介绍
本仓库用于学习 Vue Router 设计思想和理念，手写部分核心源码
### 安装
```
npm install
```
### 启动
```
npm run serve
``` 

### 介绍
#### vue-router/v1

主要实现一个简易的 Vue Router 中的install方法

- 要将 main.js中 根实例注入的 router属性 共享给每个组件
- 代理 this.$router 和 this.$route 属性
- 注册全局组件 router-link 和 router-view

#### vue-router/v2
实现 Vue Router 中的跳转逻辑

#### vue-router/v3
实现 Vue Router 中的响应式原理

#### vue-router/v4
实现 Vue Router 中的钩子函数