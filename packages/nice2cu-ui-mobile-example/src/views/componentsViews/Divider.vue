<template>
	<div class="container">
		<n-nav-bar title="Divider 分割线" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基本用法</div>
			<div class="content">
				<n-divider></n-divider>
			</div>
		</section>
		<section>
			<div class="title">虚线（dashed）</div>
			<div class="content">
				<n-divider dashed></n-divider>
			</div>
		</section>
		<section>
			<div class="title">文本 / 文本位置（slots.default / contentPosition）</div>
			<div class="content">
				<n-divider>中间</n-divider>
				<n-divider content-position="left">左侧</n-divider>
				<n-divider content-position="right">右侧</n-divider>
			</div>
		</section>
		<section>
			<div class="title">垂直（vertical）</div>
			<div class="content">
				<span>文本1</span>
				<n-divider vertical></n-divider>
				<span>文本2</span>
				<n-divider vertical></n-divider>
				<span>文本3</span>
			</div>
		</section>
		<section>
			<div class="title">自定义样式（customStyle）</div>
			<div class="content">
				<n-divider :custom-style="{ borderColor: 'blue', color: 'red' }">文本</n-divider>
			</div>
		</section>
		<section>
			<div class="title">0.5px细线（hairline）</div>
			<div class="content">
				<n-divider hairline></n-divider>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.content {
	span {
		font-size: 14px;
		color: #909ca4;
	}
}
</style>
