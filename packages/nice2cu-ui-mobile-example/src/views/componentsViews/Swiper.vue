<template>
	<div class="container">
		<n-nav-bar title="Swipe 轮播" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-swiper ref="swiper" v-model:active="active" class="swipe-container" :has-director="true" dot-color="red">
					<n-swiper-item v-for="item in list" :key="item">
						<div class="box">{{ item }}</div>
					</n-swiper-item>
				</n-swiper>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

const active = ref(1);
const swiper = ref(null);
const list = ref([1, 2, 3]);

const add = () => {
	list.value.push(list.value.length + 1);
};

watch(active, () => {
	console.log(active.value);
});
</script>

<style lang="less">
.swipe-container {
	height: 200px;
}
.box {
	width: 100%;
	height: 200px;
	line-height: 200px;
	text-align: center;
	background-color: #ffffff;
}
.swipe-example-indicators {
	position: absolute;
	bottom: 0;
	width: 100%;
	text-align: center;
	padding: 4px 0;
	color: #fff;
	font-size: 14px;
	background: rgba(0, 0, 0, 0.6);
}
</style>
