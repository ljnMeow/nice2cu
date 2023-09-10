<template>
	<div class="container">
		<n-nav-bar title="Tag 标签" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">标签类型（type）</div>
			<div class="content unflex">
				<n-space>
					<n-tag type="primary">主要类型</n-tag>
					<n-tag type="success">成功类型</n-tag>
					<n-tag type="danger">危险类型</n-tag>
					<n-tag type="warning">提醒类型</n-tag>
					<n-tag>默认类型</n-tag>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">标签大小（size）</div>
			<div class="content unflex">
				<n-space>
					<n-tag type="success" size="mini">迷你尺寸</n-tag>
					<n-tag type="danger" size="small">小号尺寸</n-tag>
					<n-tag type="primary" size="normal">默认尺寸</n-tag>
					<n-tag type="warning" size="large">大型尺寸</n-tag>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">自定义背景/字体颜色（color）</div>
			<div class="content unflex">
				<n-space>
					<n-tag color="#ed9db2">背景颜色</n-tag>
					<n-tag color="linear-gradient(45deg, #D9AFD9 0%, #97D9E1 100%)">渐变颜色</n-tag>
					<n-tag text-color="#de1c31">文字颜色</n-tag>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">圆形标签（round）</div>
			<div class="content unflex">
				<n-space>
					<n-tag type="primary" round>主要类型</n-tag>
					<n-tag type="success" round>成功类型</n-tag>
					<n-tag type="danger" round>危险类型</n-tag>
					<n-tag type="warning" round>提醒类型</n-tag>
					<n-tag round>默认类型</n-tag>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">空心标签（plain）</div>
			<div class="content unflex">
				<n-space>
					<n-tag type="primary" plain>主要类型</n-tag>
					<n-tag type="success" plain>成功类型</n-tag>
					<n-tag type="danger" plain>危险类型</n-tag>
					<n-tag type="warning" plain>提醒类型</n-tag>
					<n-tag plain>默认类型</n-tag>
					<n-tag color="#ed9db2" plain>背景颜色</n-tag>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">可关闭标签（closeable）/ 自定义图标（closeType）</div>
			<div class="content unflex">
				<n-space>
					<n-tag v-for="(item, index) in tagList" :key="index" closeable close-type="n-close-circle-sharp" @close="handlerTagClose($event, index)">
						{{ item }}
					</n-tag>
				</n-space>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tagList = ref(['标签1', '标签2', '标签3']);

const handlerTagClose = (e: any, index: number) => {
	tagList.value.splice(index, 1);
};
</script>
