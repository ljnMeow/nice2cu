<template>
	<div class="container">
		<n-nav-bar title="Sticky 粘性布局" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-sticky top="46">
					<n-button type="primary" size="small">基本使用</n-button>
				</n-sticky>
			</div>
		</section>
		<section>
			<div class="title">吸顶距离（top）</div>
			<div class="content unflex">
				<n-sticky top="100">
					<n-button type="primary" size="small">吸顶距离100px</n-button>
				</n-sticky>
			</div>
		</section>
		<section>
			<div class="title">局部吸顶（container）</div>
			<div class="content unflex height">
				<div ref="scroll" class="scroll">
					<n-sticky top="20">
						<n-button type="primary" size="small">局部吸顶</n-button>
					</n-sticky>
					<div style="height: 400px"></div>
					<n-sticky position="bottom" bottom="20">
						<n-button type="primary" size="small">局部吸底</n-button>
					</n-sticky>
				</div>
			</div>
		</section>
		<section>
			<div class="title">吸附位置（position）</div>
			<div class="content unflex">
				<div style="height: 200px"></div>
				<n-sticky position="bottom" bottom="50">
					<n-button type="primary" size="small">吸附位置</n-button>
				</n-sticky>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const scroll = ref();
</script>

<style lang="less" scoped>
.container {
	height: calc(100vh * 3);
}
.height {
	height: 300px;
	background-color: #e2e2e2;
	overflow-y: scroll;

	.scroll {
		height: 500px;
	}
}
</style>
