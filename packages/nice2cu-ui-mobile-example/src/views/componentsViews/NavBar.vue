<template>
	<div class="container">
		<n-nav-bar title="NavBar 导航栏" show-left left-text="" :shadow-buttom="true" fixed-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-nav-bar title="基础用法"></n-nav-bar>
			</div>
		</section>
		<section>
			<div class="title">底部阴影（shadowButtom）</div>
			<div class="content unflex">
				<n-nav-bar title="底部阴影" shadow-buttom></n-nav-bar>
			</div>
		</section>
		<section>
			<div class="title">阴影颜色（shadowColor）</div>
			<div class="content unflex">
				<n-nav-bar title="阴影颜色" shadow-buttom shadow-color="#eea2a4"></n-nav-bar>
			</div>
		</section>
		<section>
			<div class="title">自定义背景色/文字颜色（backgroundColor / textColor）</div>
			<div class="content unflex">
				<n-nav-bar title="自定义颜色" background="#eea2a4" text-color="#ffffff"></n-nav-bar>
			</div>
			<div class="content unflex">
				<n-nav-bar title="渐变色" background="linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 50%, #afe5fb 100%)" text-color="#ffffff"></n-nav-bar>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
const leftClickFun = () => {
	console.log('left-click');
};
const rightClickFun = () => {
	console.log('right-click');
};
</script>
