<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style lang="less">
@media (max-width: 479px) {
	html {
		font-size: 16px;
	}
}
@media (min-width: 480px) and (max-width: 767px) {
	html {
		font-size: 32px;
	}
}
@media (min-width: 768px) {
	html {
		font-size: 48px;
	}
}
</style>
