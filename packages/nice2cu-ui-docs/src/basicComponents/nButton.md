---
layout: doc
---

# nButton 按钮组件

## 介绍

基础按钮，用于触发某个操作

## 引入

```
import { nButton } from 'nice2cu-ui';
```

## 演示

### 按钮类型 type

按钮类型支持 **default、primary、success、info、warning、danger** ，默认为 default

```
<n-button type="primary">主要按钮</n-button>
<n-button type="success">成功按钮</n-button>
<n-button type="info">信息按钮</n-button>
<n-button type="warning">提示按钮</n-button>
<n-button type="danger">危险按钮</n-button>
<n-button>默认按钮</n-button>
```

### 按钮大小 size

按钮大小支持 **mini、small、default、large**，默认 default

```
<n-button type="primary" size="mini">迷你按钮</n-button>
<n-button type="info" size="small">小型按钮</n-button>
<n-button type="success">普通按钮</n-button>
<n-button type="warning" size="large">大号按钮</n-button>
```

### 边框按钮 border

通过 border 属性配置边框按钮，背景为白色，边框颜色跟文字颜色一致

```
<n-button type="primary" border>主要按钮</n-button>
<n-button type="success" border>成功按钮</n-button>
<n-button type="info" border>信息按钮</n-button>
<n-button type="warning" border>提示按钮</n-button>
<n-button type="danger" border>危险按钮</n-button>
<n-button border>默认按钮</n-button>
```

### 按钮形状 shape

按钮形状默认是圆角按钮，可通过 **square、round** 设置为方形或圆形按钮

```
<n-button type="success" shape="square">方形按钮</n-button>
<n-button type="info" shape="round">圆形按钮</n-button>
```

### 按钮禁用 disabled

通过 disabled 设置按钮禁用状态，禁用后不可触发事件

```
<n-button type="primary" disabled>禁用状态</n-button>
<n-button type="warning" border disabled>禁用状态</n-button>
```

### 按钮加载状态 loading

通过 loading 属性设置按钮加载状态，并且通过 loadingType 属性配置加载动画，目前支持 **time、wave、point、rever、bounce、battery** 几种动画，也可以通过 loadingText 属性设置加载文字

详情可见右边 demo

```
<n-button type="primary" loading></n-button>
<n-button type="primary" loading loading-type="time"></n-button>
<n-button type="primary" loading loading-type="wave"></n-button>
<n-button type="primary" loading loading-type="point"></n-button>
<n-button type="primary" loading loading-type="rever"></n-button>
<n-button type="primary" loading loading-type="bounce"></n-button>
<n-button type="primary" loading loading-type="battery"></n-button>
<n-button type="primary" loading loading-text="加载中..."></n-button>
<n-button type="primary" :loading="loading" loading-text="加载中..." @click="startLoading">点击加载</n-button>

<script lang="ts" setup>
import { ref } from 'vue';

let loading = ref(false);

const startLoading = () => {
  loading.value = true;
	setTimeout(() => {
    loading.value = false;
	}, 2000);
};
</script>
```

### 块级按钮 block
通过 block 属性设置为块级元素，默认按钮是行内块级元素

```
<n-button type="primary" block>块级按钮</n-button>
```

### 波纹按钮 is-ripple
通过 is-ripple 属性配置按钮点击特效

```
<n-button type="primary" is-ripple>主要按钮</n-button>
<n-button type="info" border is-ripple>信息按钮</n-button>
<n-button type="primary" disabled is-ripple>禁用状态</n-button>
```

### 自定义背景色和文字颜色 bgcColor/textColor
通过 bgcColor/textColor 属性配置按钮 背景色/文字颜色

```
<n-button bg-color="#e77c8e" text-color="#2e317c">背景/文字</n-button>
<n-button bg-color="linear-gradient(135deg, #00DBDE 0%, #FC00FF 50%, #131150 89%)" text-color="#ffffff">渐变背景</n-button>
```

## props
| 属性 | 说明 | 类型 | 默认值 |
| :--- | :---- | :---: | :--: |
| type | 按钮类型，可选值：<font color=#1677b3>default、primary、info、success、warning、danger</font> | string | default |
| size | 按钮大小，可选值：<font color=#1677b3>mini、small、default、large</font> | string | default |
| border | 边框按钮 | boolean | false |
| shape | 按钮形状，可选值：<font color=#1677b3>square、round</font> | string | - |
| disabled | 按钮禁用 | boolean | false |
| block | 块级按钮 | boolean | false |
| isRipple | 按钮点击水波动画 | boolean | false |
| loading | 按钮加载状态 | boolean | false |
| loadingText | 按钮加载状态文字 | string | - |
| loadingSize | 按钮加载状态图标大小，可选值：<font color=#1677b3>normal、mini、small、large</font> ｜ string | small |
| loadingType | 按钮加载状态图标动画，可选值：<font color=#1677b3>time、wave、point、rever、bounce、battery</font> | string | - |
| bgColor | 按钮背景颜色 | string | - |
| textColor | 按钮文字颜色 | string | - |
| onClick | 按钮点击事件 | event: Event | - |
