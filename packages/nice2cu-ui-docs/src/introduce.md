---
layout: doc
outline: deep
---

<div :class="[$style.container, $style['flex-wrapper']]">
  <img :class="$style.logo" src="/static/img/logo.png" />
  <div :class="[$style['flex-column-wrapper']]">
    <div :class="$style.title">Nice2CU</div>
    <div>基于 vite + vue3 实现的轻量、可定义的移动端业务组件库</div>
  </div>
</div>

<div :class="$style.container">
  <div :class="$style.title2">基本介绍</div>
  <div :class="$style.text">nice2cu 是一个轻量、可定制、自用、功能丰富的业务组件库，构建初心是因为工作中使用到的一些组件库所暴漏的一些功能不太适合自己的业务，所以在空余时间整理了一个组件库，并且把之前一些二开的功能集成进去</div>
</div>

<div :class="$style.container">
  <div :class="$style.title2">组件特性</div>
  <div :class="$style.text">
    <ul>
      <li>🔥 提供多种基础组件和高阶组件</li>
      <li>🔨 组件轻量且支持按需安装</li>
      <li>🔨 typescript 实现，拥有完整的类型体系</li>
      <li>💪 单元测试覆盖率高，保证组件可用性</li>
      <li>📖 完整的说明文档和后期维护</li>
      <li>🎆 全局主题变量，可根据需要定制</li>
      <li>🌍 国际化（待实现）</li>
      <li>🎆 深色模式（待实现）</li>
    </ul>
  </div>
</div>

<div :class="$style.container">
  <div :class="$style.title2">开源协议</div>
  <div :class="$style.text">
    本项目基于 <a href='https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89' target="_blank"> MIT </a>协议
  </div>
</div>

<style module>
.container {
  width: 100%;
  padding: 40px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: var(--vp-c-bg-soft);
}

.flex-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-column-wrapper {
  display: flex;
  flex-direction: column;
}

.logo {
  width: 88px;
  margin-right: 20px;
}

.title {
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 10px;
}

.title2 {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.text {
  font-size: 14px;
}
</style>
