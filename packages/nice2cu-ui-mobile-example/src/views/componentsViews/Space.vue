<template>
	<div class="container">
		<n-nav-bar title="Space 间距" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-space>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">不换行（wrap）</div>
			<div class="content unflex">
				<n-space :wrap="false">
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">垂直（direction）</div>
			<div class="content unflex">
				<n-space direction="column">
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">间隔（size: [‘水平’, ‘垂直’]）</div>
			<div class="content unflex">
				<n-space :size="['20px', 10]">
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
					<n-button type="primary">item</n-button>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">排列方式（justify）</div>
			<div class="content unflex">
				<n-space justify="flex-start">
					<n-button type="primary">flex-start</n-button>
					<n-button type="primary">flex-start</n-button>
					<n-button type="primary">flex-start</n-button>
				</n-space>
				<n-space justify="flex-end">
					<n-button type="primary">flex-end</n-button>
					<n-button type="primary">flex-end</n-button>
					<n-button type="primary">flex-end</n-button>
				</n-space>
				<n-space justify="center">
					<n-button type="primary">center</n-button>
					<n-button type="primary">center</n-button>
					<n-button type="primary">center</n-button>
				</n-space>
				<n-space justify="space-between">
					<n-button type="primary">space-between</n-button>
					<n-button type="primary">space-between</n-button>
				</n-space>
				<n-space justify="space-around">
					<n-button type="primary">space-around</n-button>
					<n-button type="primary">space-around</n-button>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">对齐方式（align）</div>
			<div class="content unflex">
				<n-space align="flex-start">
					<n-button type="primary">item</n-button>
					<div class="box">flex-start</div>
				</n-space>
				<n-space align="flex-end">
					<n-button type="primary">item</n-button>
					<div class="box">flex-end</div>
				</n-space>
				<n-space align="center">
					<n-button type="primary">item</n-button>
					<div class="box">center</div>
				</n-space>
				<n-space align="baseline">
					<n-button type="primary">center</n-button>
					<div class="box">baseline</div>
				</n-space>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.box {
	width: 100px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	background: #cccccc;
}
</style>
