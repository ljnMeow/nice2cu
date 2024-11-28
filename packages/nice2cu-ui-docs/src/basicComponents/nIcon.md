---
layout: doc
---

# nIcon 图标组件

## 介绍

基于字体的图标集，可通过组件使用

## 引入

```
import { nIcon } from 'nice2cu-ui';
```

## 演示
### 图标 icon
通过 icon 属性指定使用的图标，该组件库内置一套常用图标，可在右边 demo 查看

```
<n-icon icon="n-alarm-sharp"></n-icon>
```

### 图标间距 margin
通过 margin 属性配置图标间距

```
<n-icon icon="n-alarm-sharp" margin="0 6px"></n-icon>
```

### 图标大小 size
通过 size 属性配置图标大小，支持 px、em、rem 等单位

```
<n-icon icon="n-alarm-sharp" size="2.2rem"></n-icon>
```

### 图标颜色 color
通过 color 属性配置图标颜色，注意多色图标不生效

```
<n-icon icon="n-alarm-sharp" color="#3a7afe"></n-icon>
```

### 图标徽章 badge
通过 badge 属性配置图标右上角徽章

```
<n-icon icon="n-grape" badge></n-icon>
<n-icon icon="n-grape" badge="9"></n-icon>
```

### svg图标
svg 图标支持多色图标

```
<n-icon icon="n-grape" svg></n-icon>
```

### 自定义图标
在现有图标的基础上拓展更多图标，可以引入 [iconfont](https://www.iconfont.cn/) 等第三方图标库对应的字体文件和 css 文件，之后通过 classPrefix 属性配置后可直接使用

```
/* 引入第三方或自定义字体图标样式 */
@font-face {
  font-family: "your-icon";
  src: url('../font/nice2cuUI-icon.woff2') format('woff2'),
       url('../font/nice2cuUI-icon.woff') format('woff'),
       url('../font/nice2cuUI-icon.ttf') format('truetype');
}

.your-icon {
  font-family: "your-icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.your-icon-error:before {
  content: "\e7f9";
}
```
```
// 多色 svg 图标需要引入 Symbol 格式

<script src='./yourIcon.js'></script>
```
具体字体图标格式之间的区别可在这篇文章查看，[传送门](https://blog.csdn.net/qq_40685439/article/details/116003406)

```
<n-icon icon="your-icon-error" classPrefix="your-icon"></n-icon>
```

## props
| 属性 | 说明 | 类型 | 默认值 |
| :--- | :---- | :---: | :--: |
| icon | 图标 | string | - |
| classPrefix | 拓展字体图标 class | string | nice2cu-icon | 
| margin | 图标间距 | string、number | - |
| badge | 图标徽章 | boolean、number、string | - |
| svg | svg 图标 | boolean | - |
| color | 图标颜色 | string | - |
| size | 图标大小 | string、number | - |
