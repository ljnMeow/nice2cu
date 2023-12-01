<template>
	<div class="container">
		<n-nav-bar title="Dialog 对话框" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基本用法</div>
			<div class="content unflex">
				<div class="item">
					<!-- <n-button type="primary" block @click="showToast()">文字提示</n-button> -->
					<n-dialog></n-dialog>
				</div>
			</div>
		</section>
	</div>
</template>
