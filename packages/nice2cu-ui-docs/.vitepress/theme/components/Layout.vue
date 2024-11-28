<script setup>
import { ref, watch, nextTick } from 'vue';
import { useData, useRouter } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import path from '../path';

const { frontmatter, page } = useData();
const router = useRouter();
const { Layout } = DefaultTheme;
const moblieIframe = ref();
const mobliePathEnd = ref();

const getMobliePath = () => {
	const pcPath = page.value.filePath;
	const cur = path.find((p) => p.pcPath.includes(pcPath.split('.md')[0]));
	return cur.mobliePath;
};

const getPcPath = (mobliePath) => {
	console.log("mobliePathmobliePath", mobliePath)
	const cur = path.find((p) => p.mobliePath.includes(mobliePath));
	if (cur) {
		const pcPath = cur.pcPath;
		router.go(pcPath);
	}
};

watch(
	() => page.value.filePath,
	() => {
		nextTick(() => {
			console.log(mobliePathEnd.value !== getMobliePath(), mobliePathEnd.value , getMobliePath())
			if (mobliePathEnd.value !== getMobliePath()) {
				moblieIframe.value.contentWindow.postMessage({ type: 'mobliePath', path: getMobliePath() }, '*');
			}
		});
	},
	{ immediate: true }
);

window.addEventListener('message', (e) => {
	const data = e.data;
	if (data.type === 'changePath') {
		const path = data.path;
		mobliePathEnd.value = path;
		getPcPath(path);
	}
});
</script>

<template>
	<Layout>
		<template #nav-bar-content-after>
			<div v-if="frontmatter.layout === 'doc'" class="iframe-wrapper">
				<iframe ref="moblieIframe" src="http://localhost:5173/#/homeIndex" frameborder="0" sandbox="allow-same-origin allow-forms allow-scripts"></iframe>
			</div>
		</template>
	</Layout>
</template>

<style lang="less" scoped>
.iframe-wrapper {
	position: fixed;
	top: 100px;
	right: 50px;
	width: 360px;
	height: 640px;
	z-index: -1;
	background-color: #fff;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

	iframe {
		display: block;
		width: 100%;
		height: 640px;
	}
}
</style>
