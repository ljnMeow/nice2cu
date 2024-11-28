---
layout: doc
---

# nCell 单元格组件

## 介绍

提供单个展示项和一些快捷方法

## 引入

```
import { nCell } from 'nice2cu-ui';
```

## 演示

### 基础使用

```
<n-cell title="单元格"></n-cell>
<n-cell title="单元格" description="单元格描述信息"></n-cell>
<n-cell title="单元格" description="单元格描述信息" border></n-cell>
```

### 展示图标
通过 icon / extra 配置左右两侧图标

```
<n-cell title="单元格" description="单元格描述信息" icon="n-alarm-sharp" extra="n-cloud-upload-sharp"></n-cell>
```

### 最右侧箭头
单元格最右侧展示箭头，支持参数 <font color=#1677b3>right、up、down</font>

```
<n-cell title="单元格" description="单元格描述信息" show-arrow="right"></n-cell>
<n-cell title="单元格" description="单元格描述信息" show-arrow="up"></n-cell>
<n-cell title="单元格" description="单元格描述信息" show-arrow="down"></n-cell>
```

### 页面跳转
通过 url/link 制定页面跳转，link 一般是 vue 中定义的路由 name

```
<n-cell title="loading" description="跳转到loading" link="loading"></n-cell>
<n-cell title="百度" description="跳转到百度" url="https://www.baidu.com"></n-cell>
```

### 插槽方面
组件暴漏 4 个插槽，方面定制开发，<font color=#1677b3>default、icon、description、extra</font>

```
<n-cell>
    <template #icon>
        <n-icon icon="n-mushroom" svg></n-icon>
    </template>
    <p>默认插槽</p>
    <template #description>
        <p>description插槽</p>
    </template>
    <template #extra>
        <n-icon icon="n-close-circle-sharp"></n-icon>
    </template>
</n-cell>
```

## props
| 属性 | 说明 | 类型 | 默认值 |
| :--- | :---- | :---: | :--: |
| title | 单元格标题 | string、number | - |
| description | 单元格下方描述 | string、number | - |
| icon | 单元格左侧图标 | string | - |
| extra | 单元格右侧图标 | string | - |
| iconPrefix | 图标类名，类似 icon 组件中的 classPrefix | string | nice2cu-icon |
| iconSize | 图标大小 | string、 number | 16 |
| showArrow | 是否展示箭头，可选值：<font color=#1677b3>right、up、down</font> | string | - |
| border | 展示边框 | boolean | false |
| iconClass | 左侧图标拓展类名，方面自定义样式 | string[] | - |
| titleClass | 标题拓展类名，方面自定义样式 | string[] | - |
| descriptionClass | 下方描述拓展类名，方面自定义样式 | string[] | - |
| extraClass | 右侧图标拓展类名，方面自定义样式 | string[] | - |
| isRipple | 单元格点击波纹特效 | boolean | false |
| url | 跳转路径 | String | - |
| link | 跳转路由名称 | String | - |
| onClick | 单元格点击事件 | event: Event | - |

## slots
| 名称 | 说明 |
| :--- | :---- |
| default | 自定义标题内容 |
| description | 自定义下方说明内容 |
| icon | 自定义左侧内容 |
| extra | 自定义右侧内容 |