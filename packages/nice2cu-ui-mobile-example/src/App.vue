<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style lang="less">
html {
	background-color: #eff2f5;
}
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
.container {
	margin: 0.6rem;
	section {
		margin-bottom: 1.4rem;
		.title {
			font-size: 0.9rem;
			color: #aaaaaa;
		}
		.content {
			display: flex;
			flex-flow: row wrap;
			justify-content: flex-start;
			margin: 0.8rem 0;

			&.space-between {
				justify-content: space-between;
			}

			.item {
				margin: 0.8rem 0.4rem 0.4rem 0;

				&.item-align-center {
					display: flex;
					align-items: center;
				}
			}
		}
	}
}
.unflex {
	display: block !important;
}
</style>
