<template>
	<div class="container">
		<n-nav-bar title="Tab 标签页" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title" @click="add">基础用法</div>
			<div class="content unflex">
				<n-tabs v-model:active="active1" shadow-bottom scroll :wrapper-animated="false">
					<n-tab-item v-for="item in list" :key="item" :title="item">
						<div class="wrapper">{{ item }}</div>
					</n-tab-item>
				</n-tabs>
			</div>
		</section>
		<!-- <section>
			<div class="title" @click="changeDisable()">基础用法</div>
			<div class="content unflex">
				<n-tabs v-model:active="active2" shadow-bottom scroll>
					<n-tab-item title="标签1" name="tab1" icon="n-grape" dot badge-color="blue"> </n-tab-item>
					<n-tab-item title="标签2" :disabled="disabled" :badge="123" badge-color="green"> </n-tab-item>
					<n-tab-item title="标签3"> </n-tab-item>
				</n-tabs>
			</div>
		</section> -->
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active1 = ref(0);
const active2 = ref(1);
const disabled = ref(false);
const list = ref(['标签1', '标签2', '标签3']);

const add = () => {
	list.value.push(`标签${list.value.length + 1}`);
};

const changeDisable = () => {
	disabled.value = !disabled.value;
};
</script>

<style lang="less" scoped>
.wrapper {
	width: 100%;
	height: 200px;
	padding: 20px;
	background-color: #ffffff;
}
</style>
