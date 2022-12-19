<template>
	<div class="container">
		<section>
			<div class="title">基础用法</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-image src="https://varlet.gitee.io/varlet-ui/cat.jpg"></n-image>
				</div>
			</div>
		</section>
		<section>
			<div class="title">设置宽高圆角（width/height/radius）</div>
			<div class="content">
				<div class="item">
					<n-image width="100" height="100" radius="10" src="https://varlet.gitee.io/varlet-ui/cat.jpg"></n-image>
				</div>
				<div class="item">
					<n-image width="100" height="100" radius="50%" src="https://varlet.gitee.io/varlet-ui/cat.jpg"></n-image>
				</div>
			</div>
		</section>
		<section>
			<div class="title">填充模式（fit）</div>
			<div class="content">
				<div class="item">
					<n-image width="100" height="100" radius="10" src="https://varlet.gitee.io/varlet-ui/cat.jpg"></n-image>
				</div>
				<div class="item">
					<n-image width="100" height="100" radius="10" fit="contain" src="https://varlet.gitee.io/varlet-ui/cat.jpg"></n-image>
				</div>
				<div class="item">
					<n-image width="100" height="100" radius="10" fit="cover" src="https://varlet.gitee.io/varlet-ui/cat.jpg"></n-image>
				</div>
				<div class="item">
					<n-image width="100" height="100" radius="10" fit="none" src="https://varlet.gitee.io/varlet-ui/cat.jpg"></n-image>
				</div>
				<div class="item">
					<n-image width="100" height="100" radius="10" fit="scale-down" src="https://varlet.gitee.io/varlet-ui/cat.jpg"></n-image>
				</div>
			</div>
		</section>
		<section>
			<div class="title">懒加载（lazy）</div>
			<div class="content">
				<div class="item">
					<n-image src="https://picsum.photos/536/354" lazy></n-image>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.content {
	margin: 0 !important;
}
</style>
