<template>
	<div class="container">
		<n-nav-bar title="Ellipsis 文本省略" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-ellipsis :content="text"></n-ellipsis>
			</div>
		</section>
		<section>
			<div class="title">展示多行（rows）</div>
			<div class="content unflex">
				<n-ellipsis :content="text" :rows="3"></n-ellipsis>
			</div>
		</section>
		<section>
			<div class="title">省略位置（direction）</div>
			<div class="content unflex">
				<n-ellipsis :content="text" direction="start"></n-ellipsis>
			</div>
			<div class="content unflex">
				<n-ellipsis :content="text" direction="center"></n-ellipsis>
			</div>
			<div class="content unflex">
				<n-ellipsis :content="text" direction="end"></n-ellipsis>
			</div>
		</section>
		<section>
			<div class="title">展开收起（showExpand）</div>
			<div class="content unflex">
				<n-ellipsis :content="text" show-expand :rows="3" direction="start"></n-ellipsis>
			</div>
			<div class="content unflex">
				<n-ellipsis :content="text" show-expand :rows="3" direction="center"></n-ellipsis>
			</div>
			<div class="content unflex">
				<n-ellipsis :content="text" show-expand :rows="3" direction="end"></n-ellipsis>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref(
	'先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也'
);
</script>
