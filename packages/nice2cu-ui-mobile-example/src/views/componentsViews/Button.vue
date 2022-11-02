<template>
	<div class="button-container">
		<section>
			<div class="title">按钮类型（type）</div>
			<div class="content">
				<div class="item">
					<n-button type="primary">主要按钮</n-button>
				</div>
				<div class="item">
					<n-button type="success">成功按钮</n-button>
				</div>
				<div class="item">
					<n-button type="info">信息按钮</n-button>
				</div>
				<div class="item">
					<n-button type="warning">提示按钮</n-button>
				</div>
				<div class="item">
					<n-button type="danger">危险按钮</n-button>
				</div>
				<div class="item">
					<n-button>默认按钮</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">按钮大小（size）</div>
			<div class="content">
				<div class="item">
					<n-button type="primary" size="mini">迷你按钮</n-button>
				</div>
				<div class="item">
					<n-button type="info" size="small">小型按钮</n-button>
				</div>
				<div class="item">
					<n-button type="success">普通按钮</n-button>
				</div>
				<div class="item">
					<n-button type="warning" size="large">大号按钮</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">镂空按钮（border）</div>
			<div class="content">
				<div class="item">
					<n-button type="primary" border>主要按钮</n-button>
				</div>
				<div class="item">
					<n-button type="success" border>成功按钮</n-button>
				</div>
				<div class="item">
					<n-button type="info" border>信息按钮</n-button>
				</div>
				<div class="item">
					<n-button type="warning" border>提示按钮</n-button>
				</div>
				<div class="item">
					<n-button type="danger" border>危险按钮</n-button>
				</div>
				<div class="item">
					<n-button border>默认按钮</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">按钮形状（shape）</div>
			<div class="content">
				<div class="item">
					<n-button type="primary">圆角按钮</n-button>
				</div>
				<div class="item">
					<n-button type="success" shape="square">方形按钮</n-button>
				</div>
				<div class="item">
					<n-button type="info" shape="round">圆形按钮</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">禁用状态（disabled）</div>
			<div class="content">
				<div class="item">
					<n-button type="primary" disabled>禁用状态</n-button>
				</div>
				<div class="item">
					<n-button type="warning" border disabled>禁用状态</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">块级按钮（block）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-button type="primary" block>块级按钮</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">水波纹按钮（is-ripple）</div>
			<div class="content">
				<div class="item">
					<n-button type="primary" is-ripple>主要按钮</n-button>
				</div>
				<div class="item">
					<n-button type="success" is-ripple>成功按钮</n-button>
				</div>
				<div class="item">
					<n-button type="info" border is-ripple>信息按钮</n-button>
				</div>
				<div class="item">
					<n-button type="warning" border is-ripple>提示按钮</n-button>
				</div>
				<div class="item">
					<n-button type="primary" disabled is-ripple>禁用状态</n-button>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.button-container {
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
			.item {
				margin: 0.8rem 0.4rem 0.4rem 0;
			}
		}
	}
}
</style>
