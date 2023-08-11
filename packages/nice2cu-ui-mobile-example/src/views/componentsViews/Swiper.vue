<template>
	<div class="container">
		<n-nav-bar title="Swipe 轮播" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-swiper class="swipe-container" :has-director="true" :init-index="2">
					<n-swiper-item>
						<div class="box" style="background: red">1</div>
					</n-swiper-item>
					<n-swiper-item>
						<div class="box" style="background: blue">2</div>
					</n-swiper-item>
					<n-swiper-item>
						<div class="box" style="background: green">3</div>
					</n-swiper-item>
				</n-swiper>
			</div>
		</section>
	</div>
</template>

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
