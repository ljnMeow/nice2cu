<template>
	<div class="container">
		<section>
			<div class="title">基础用法</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
					</n-row>
				</div>
			</div>
		</section>
		<section>
			<div class="title">列间距（gutter）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row :gutter="10">
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
					</n-row>
				</div>
			</div>
		</section>
		<section>
			<div class="title">列宽（span）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row>
						<n-col :span="4"> span-4 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="12"> span-12 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
					</n-row>
				</div>
			</div>
		</section>
		<section>
			<div class="title">偏移（offset）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row>
						<n-col :span="16" :offset="8"> span-16 offset-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
					</n-row>
				</div>
			</div>
		</section>
		<section>
			<div class="title">对齐方式（justify）</div>
			<div class="content">
				<div class="item" style="flex: 1">
					<n-row>
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
					</n-row>
					<n-row justify="flex-end">
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
					</n-row>
					<n-row justify="center">
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
					</n-row>
					<n-row justify="space-between">
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
					</n-row>
					<n-row justify="space-around">
						<n-col :span="8"> span-8 </n-col>
						<n-col :span="8"> span-8 </n-col>
					</n-row>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.n-col {
	justify-content: center;
	align-items: center;
	height: 1.6rem;
	line-height: 1.6rem;
	margin-bottom: 0.6rem;
	text-align: center;
	font-size: 0.6rem;
	background-color: #cccccc;
}
</style>
