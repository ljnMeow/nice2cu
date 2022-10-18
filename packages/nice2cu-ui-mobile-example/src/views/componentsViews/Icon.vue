<template>
	<div class="icon-container">
		<section>
			<div class="title">图标尺寸（size）</div>
			<div class="content">
				<n-icon icon="n-alarm-sharp" size="1rem" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="1.6rem" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="2.2rem" margin="0 6px"></n-icon>
			</div>
		</section>
		<section>
			<div class="title">图标颜色（color）</div>
			<div class="content">
				<n-icon icon="n-alarm-sharp" size="1rem" color="#3a7afe" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="1.6rem" color="#3a7afe" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="2.2rem" color="#3a7afe" margin="0 6px"></n-icon>
			</div>
		</section>
		<section>
			<div class="title">图标边距（margin）</div>
			<div class="content">
				<n-icon icon="n-alarm-sharp" size="1rem" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="1.6rem" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="2.2rem" margin="0 6px"></n-icon>
			</div>
		</section>
		<section>
			<div class="title">svg图标（svg）</div>
			<div class="content">
				<n-icon icon="n-grape" svg size="2rem" margin="0 6px 0 0"></n-icon>
				<n-icon icon="n-mushroom" svg size="2rem" margin="0 6px 0 0"></n-icon>
			</div>
		</section>
		<section>
			<div class="title">图标徽章（badge）</div>
			<div class="content">
				<n-icon icon="n-grape" multicolor size="2rem" badge margin="0 6px 0 0"></n-icon>
				<n-icon icon="n-mushroom" multicolor size="2rem" badge="9" margin="0 6px 0 0"></n-icon>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.icon-container {
	margin: 0.6rem;
	section {
		margin-bottom: 1.4rem;
		.title {
			font-size: 0.9rem;
			color: #aaaaaa;
		}
		.content {
			margin: 0.8rem 0;
		}
	}
}
</style>
