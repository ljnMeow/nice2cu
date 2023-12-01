<template>
	<div class="container">
		<n-nav-bar title="Popup 弹出层" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基本用法</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="visible = true">文字提示</n-button>
					<n-popup v-model:visible="visible" position="bottom" round>
						<div style="width: 200px; height: 140px; background-color: #ffffff; line-height: 140px; text-align: center">123123</div>
					</n-popup>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
