<template>
	<div class="icon-container">
		<section>
			<div class="title">图标尺寸（size）</div>
			<div class="content">
				<m-icon icon="m-alarm-sharp" size="16" margin="0 6px"></m-icon>
				<m-icon icon="m-alarm-sharp" size="22" margin="0 6px"></m-icon>
				<m-icon icon="m-alarm-sharp" size="28" margin="0 6px"></m-icon>
			</div>
		</section>
		<section>
			<div class="title">图标颜色（color）</div>
			<div class="content">
				<m-icon icon="m-alarm-sharp" size="16" color="#3a7afe" margin="0 6px"></m-icon>
				<m-icon icon="m-alarm-sharp" size="22" color="#3a7afe" margin="0 6px"></m-icon>
				<m-icon icon="m-alarm-sharp" size="28" color="#3a7afe" margin="0 6px"></m-icon>
			</div>
		</section>
		<section>
			<div class="title">图标边距（margin）</div>
			<div class="content">
				<m-icon icon="m-alarm-sharp" size="16" margin="0 6px"></m-icon>
				<m-icon icon="m-alarm-sharp" size="22" margin="0 6px"></m-icon>
				<m-icon icon="m-alarm-sharp" size="28" margin="0 6px"></m-icon>
			</div>
		</section>
		<section>
			<div class="title">多色图标（multicolor）</div>
			<div class="content">
				<m-icon icon="m-grape" multicolor size="30" margin="0 6px 0 0"></m-icon>
				<m-icon icon="m-mushroom" multicolor size="30" margin="0 6px 0 0"></m-icon>
			</div>
		</section>
		<section>
			<div class="title">图标徽章（badge）</div>
			<div class="content">
				<m-icon icon="m-grape" multicolor size="30" badge margin="0 6px 0 0"></m-icon>
				<m-icon icon="m-mushroom" multicolor size="30" badge="9" margin="0 6px 0 0"></m-icon>
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
