<template>
	<div class="container">
		<section>
			<div class="title">基础用法</div>
			<div class="content">
				<div class="item">
					<n-loading color="#2196f3" text="加载中..."></n-loading>
				</div>
			</div>
		</section>
		<section>
			<div class="title">平行内容（parallel）</div>
			<div class="content">
				<div class="item">
					<n-loading color="#2196f3" parallel text="加载中..."></n-loading>
				</div>
			</div>
		</section>
		<section>
			<div class="title">大小（size）</div>
			<div class="content">
				<div class="item item-align-center">
					<n-loading color="#2196f3" size="mini"></n-loading>
				</div>
				<div class="item item-align-center">
					<n-loading color="#2196f3" size="small"></n-loading>
				</div>
				<div class="item item-align-center">
					<n-loading color="#2196f3"></n-loading>
				</div>
				<div class="item item-align-center">
					<n-loading color="#2196f3" size="large"></n-loading>
				</div>
			</div>
		</section>
		<section>
			<div class="title">其他样式（type）</div>
			<div class="content space-between">
				<div class="item item-align-center">
					<n-loading color="#2196f3" type="time"></n-loading>
				</div>
				<div class="item item-align-center">
					<n-loading color="#2196f3" type="wave"></n-loading>
				</div>
				<div class="item item-align-center">
					<n-loading color="#2196f3" type="point"></n-loading>
				</div>
				<div class="item item-align-center">
					<n-loading color="#2196f3" type="rever"></n-loading>
				</div>
				<div class="item item-align-center">
					<n-loading color="#2196f3" type="bounce"></n-loading>
				</div>
				<div class="item item-align-center">
					<n-loading color="#2196f3" type="battery"></n-loading>
				</div>
			</div>
		</section>
		<section>
			<div class="title">包裹内容</div>
			<div class="content unflex">
				<div class="item">
					<n-button style="margin-bottom: 1rem" type="primary" @click="toggleLoading">{{ loading ? '取消' : '加载' }}</n-button>
					<n-loading color="#2196f3" text="加载中..." :loading="loading">
						<div class="box">
							<h1>Loading组件</h1>
							<p>加载图标，用于表示加载中的过渡状态。</p>
						</div>
					</n-loading>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

let loading = ref(false);

const toggleLoading = () => {
	loading.value = !loading.value;
};
</script>

<style lang="less" scoped>
.item {
	margin: 0.4rem !important;
}
.box {
	height: 10rem;
	padding: 1rem;
	line-height: 1.6rem;
	box-shadow: 0px 0.3px 1.8px rgba(0, 0, 0, 0.038), 0px 0.9px 5px rgba(0, 0, 0, 0.055), 0px 2.1px 12.1px rgba(0, 0, 0, 0.072),
		0px 7px 40px rgba(0, 0, 0, 0.11);

	p {
		font-size: 0.8rem;
		color: #484848;
	}
}
</style>
