---
layout: doc
---

# 快速上手

本章您可以了解到关于 **nice2cu** 的安装方式和基本使用

## 通过 npm 安装

```
# 在 vue3 项目中通过 npm 安装 nice2cu
npm install nice2cu-ui

#也可以通过 pnpm、yarn 等安装
pnpm install nice2cu-ui

yarn add nice2cu-ui
```

## 使用方式
### 全局注册
全局注册组件库后，您可以在 app 下任意组件中使用注册的组件

```
import { createApp } from 'vue';
import App from './App.vue';
import nice2cuUI from 'nice2cu-ui';

const app = createApp(App);
app.use(nice2cuUI);

app.mount('#app');
```

### 局部注册
```
<script lang="ts" setup>
import { nCell } from 'nice2cu-ui';
</script>

<template>
  <n-cell></n-cell>
</template>
```
关于 vue3 注册组件的方法详细可前往 [官方文档](https://cn.vuejs.org/guide/components/registration)了解