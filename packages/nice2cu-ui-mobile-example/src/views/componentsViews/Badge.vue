<template>
	<div class="container">
		<n-nav-bar title="Badge 徽标" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>
		<section>
			<div class="title">基础用法</div>
			<div class="content">
				<div class="item">
					<n-badge content="0" />
				</div>
				<div class="item">
					<n-badge content="badge" />
				</div>
				<div class="item">
					<n-badge content="徽标" />
				</div>
			</div>
		</section>
		<section>
			<div class="title">颜色（color）</div>
			<div class="content">
				<div class="item">
					<n-badge content="0" color="#8076a3" />
				</div>
				<div class="item">
					<n-badge content="0" color="#126bae" />
				</div>
				<div class="item">
					<n-badge content="0" color="#1ba784" />
				</div>
				<div class="item">
					<n-badge content="0" color="#d2d97a" />
				</div>
				<div class="item">
					<n-badge content="0" color="#f0ada0" />
				</div>
			</div>
		</section>
		<section>
			<div class="title">原点（dot）</div>
			<div class="content">
				<div class="item">
					<n-badge dot />
				</div>
			</div>
		</section>
		<section>
			<div class="title">最大值（max-value）</div>
			<div class="content">
				<div class="item">
					<n-badge content="90" :max-value="99" />
				</div>
				<div class="item">
					<n-badge content="100" :max-value="99" />
				</div>
			</div>
		</section>
		<section>
			<div class="title">位置（position）</div>
			<div class="content">
				<div class="item mr">
					<n-badge content="10" position="right-top">
						<div class="box"></div>
					</n-badge>
				</div>
				<div class="item mr">
					<n-badge content="10" position="right-bottom">
						<div class="box"></div>
					</n-badge>
				</div>
				<div class="item mr">
					<n-badge content="10" position="left-top">
						<div class="box"></div>
					</n-badge>
				</div>
				<div class="item mr">
					<n-badge content="10" position="left-bottom">
						<div class="box"></div>
					</n-badge>
				</div>
			</div>
		</section>
		<section>
			<div class="title">徽标隐藏（hidden）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-badge content="90" :hidden="hiddenStatus">
						<n-button type="primary" size="small" @click="toggleHiddenStatus">改变状态</n-button>
					</n-badge>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const hiddenStatus = ref(false);

const toggleHiddenStatus = () => {
	hiddenStatus.value = !hiddenStatus.value;
};
</script>

<style lang="less" scoped>
.box {
	width: 3rem;
	height: 3rem;
	background-color: #cccccc;
	border-radius: 4px;
}

.item {
	margin-top: 0 !important;
	margin-bottom: 0 !important;
}

.mr {
	margin-right: 1.2rem !important;
}
</style>
