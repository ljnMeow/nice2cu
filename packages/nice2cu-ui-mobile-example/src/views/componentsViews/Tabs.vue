<template>
	<div class="container">
		<n-nav-bar title="Tab 标签页" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-tabs v-model:active="active1">
					<n-tab-item title="标签1">
						<div class="wrapper">内容1</div>
					</n-tab-item>
					<n-tab-item title="标签2">
						<div class="wrapper">内容2</div>
					</n-tab-item>
					<n-tab-item title="标签3">
						<div class="wrapper">内容3</div>
					</n-tab-item>
				</n-tabs>
			</div>
		</section>
		<section>
			<div class="title">名称匹配（name）</div>
			<div class="content unflex">
				<n-tabs v-model:active="active2">
					<n-tab-item title="标签1" name="tab1">
						<div class="wrapper">内容1</div>
					</n-tab-item>
					<n-tab-item title="标签2" name="tab2">
						<div class="wrapper">内容2</div>
					</n-tab-item>
					<n-tab-item title="标签3" name="tab3">
						<div class="wrapper">内容3</div>
					</n-tab-item>
				</n-tabs>
			</div>
		</section>
		<section>
			<div class="title">禁用选项（disabled）</div>
			<div class="content unflex">
				<n-tabs v-model:active="active3">
					<n-tab-item title="标签1">
						<div class="wrapper">内容1</div>
					</n-tab-item>
					<n-tab-item title="标签2" :disabled="true">
						<div class="wrapper">内容2</div>
					</n-tab-item>
					<n-tab-item title="标签3">
						<div class="wrapper">内容3</div>
					</n-tab-item>
				</n-tabs>
			</div>
		</section>
		<section>
			<div class="title" @click="() => (scroll = !scroll)">多标签滚动（scroll）/ 触摸切换（touchable）</div>
			<div class="content unflex">
				<n-tabs v-model:active="active4" :scroll="scroll" touchable>
					<n-tab-item v-for="item in 10" :key="item" :title="`标签${item}`">
						<div class="wrapper">{{ `内容${item}` }}</div>
					</n-tab-item>
				</n-tabs>
			</div>
		</section>
		<section>
			<div class="title">垂直布局（vertical）</div>
			<div class="content unflex">
				<n-tabs v-model:active="active4" scroll touchable :left-width="80" vertical>
					<n-tab-item v-for="item in 10" :key="item" :title="`标签${item}`">
						<div class="wrapper">{{ `内容${item}` }}</div>
					</n-tab-item>
				</n-tabs>
			</div>
		</section>
		<section>
			<div class="title">面板高度（wrapperHeight）默认160px，不需要展示面板可以设置成0，注意垂直布局不能设置为0，否则组件高度计算错误不展示</div>
			<div class="content unflex">
				<n-tabs v-model:active="active5" :wrapper-height="0">
					<n-tab-item title="标签1">
						<div class="wrapper">内容1</div>
					</n-tab-item>
					<n-tab-item title="标签2">
						<div class="wrapper">内容2</div>
					</n-tab-item>
					<n-tab-item title="标签3">
						<div class="wrapper">内容3</div>
					</n-tab-item>
				</n-tabs>
			</div>
		</section>
		<section>
			<div class="title">自定义图标（icon）/ 标点（dot）/ 微标（badge）</div>
			<div class="content unflex">
				<n-tabs v-model:active="active6" :wrapper-height="0">
					<n-tab-item title="标签1" icon="n-alarm-sharp">
						<div class="wrapper">内容1</div>
					</n-tab-item>
					<n-tab-item title="标签2" dot>
						<div class="wrapper">内容2</div>
					</n-tab-item>
					<n-tab-item title="标签3" :badge="10">
						<div class="wrapper">内容3</div>
					</n-tab-item>
				</n-tabs>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active1 = ref(0);
const active2 = ref('tab1');
const active3 = ref(0);
const active4 = ref(0);
const active5 = ref(0);
const active6 = ref(0);
const scroll = ref(true);
</script>

<style lang="less" scoped>
.wrapper {
	width: 100%;
	height: 100%;
	padding: 20px;
	background-color: #ffffff;
}
</style>
