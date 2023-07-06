<template>
	<div class="container">
		<n-nav-bar title="Layout 布局" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>
		<section>
			<div class="title">基础用法</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
					</n-row>
				</div>
			</div>
		</section>
		<section>
			<div class="title">列间距（gutter）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row :gutter="20">
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
					</n-row>
				</div>
			</div>
		</section>
		<section>
			<div class="title">列宽（span）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row>
						<n-col :span="4"> <span>span-4</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="12"> <span>span-12</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span></n-col>
					</n-row>
				</div>
			</div>
		</section>
		<section>
			<div class="title">偏移（offset）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row>
						<n-col :span="16" :offset="8"> <span>span-16 offset-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
					</n-row>
				</div>
			</div>
		</section>
		<section>
			<div class="title">对齐方式（justify）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row>
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
					</n-row>
					<n-row justify="flex-end">
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
					</n-row>
					<n-row justify="center">
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
					</n-row>
					<n-row justify="space-between">
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
					</n-row>
					<n-row justify="space-around">
						<n-col :span="8"> <span>span-8</span> </n-col>
						<n-col :span="8"> <span>span-8</span> </n-col>
					</n-row>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.item {
	margin: 0 !important;
}

span {
	width: 100%;
	height: 1.6rem;
	line-height: 1.6rem;
	margin: 4px 0;
	text-align: center;
	font-size: 0.6rem;
	border-radius: 0.2rem;
	background-color: #cccccc;
}
</style>
