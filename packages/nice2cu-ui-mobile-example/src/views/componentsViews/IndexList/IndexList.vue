<template>
	<n-nav-bar title="IndexList 索引列表" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>
	<div class="content">
		<n-index-list :index-list="list" height="calc(100vh - 46px)" title-sticky @change="indexListChange" @list-click="handlerListClick"></n-index-list>
	</div>
</template>

<script lang="ts" setup>
import { Toast } from 'nice2cu-ui';
import { ref } from 'vue';
import { cityList } from './cityList';

const list = ref(JSON.parse(JSON.stringify(cityList)));

const indexListChange = (index: number) => {
	Toast.showToast({
		content: String(index),
	});
};

const handlerListClick = (item: any) => {
	Toast.showToast({
		content: JSON.stringify(item),
	});
};
</script>
