<template>
	<div class="container">
		<n-nav-bar title="NavBar 导航栏" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-nav-bar title="基础用法"></n-nav-bar>
			</div>
		</section>
		<section>
			<div class="title">底部阴影（shadowBottom）</div>
			<div class="content unflex">
				<n-nav-bar title="底部阴影" shadow-buttom></n-nav-bar>
			</div>
		</section>
		<section>
			<div class="title">阴影颜色（shadowColor）</div>
			<div class="content unflex">
				<n-nav-bar title="阴影颜色" shadow-buttom shadow-color="#eea2a4"></n-nav-bar>
			</div>
		</section>
		<section>
			<div class="title">自定义背景色/文字颜色（backgroundColor / textColor）</div>
			<div class="content unflex">
				<n-nav-bar title="自定义颜色" background="#eea2a4" text-color="#ffffff"></n-nav-bar>
			</div>
			<div class="content unflex">
				<n-nav-bar title="渐变色" background="linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 50%, #afe5fb 100%)" text-color="#ffffff"></n-nav-bar>
			</div>
		</section>
		<section>
			<div class="title">左侧（showLeft / leftIcon / leftText / leftSlot）</div>
			<div class="content unflex">
				<n-nav-bar title="展示左侧" show-left></n-nav-bar>
			</div>
			<div class="content unflex">
				<n-nav-bar title="左侧图标/文字" show-left left-icon="n-arrow-undo-sharp" left-text="回退"></n-nav-bar>
			</div>
			<div class="content unflex">
				<n-nav-bar title="左侧插槽" show-left>
					<template #left>
						<n-button type="primary">左侧</n-button>
					</template>
				</n-nav-bar>
			</div>
		</section>
		<section>
			<div class="title">右侧（showRight / rightIcon / rightText / rightSlot）</div>
			<div class="content unflex">
				<n-nav-bar title="展示右侧" show-right></n-nav-bar>
			</div>
			<div class="content unflex">
				<n-nav-bar title="右侧图标/文字" show-right right-icon="n-search" right-text="搜索"></n-nav-bar>
			</div>
			<div class="content unflex">
				<n-nav-bar title="右侧插槽" show-right>
					<template #right>
						<n-button type="primary">右侧</n-button>
					</template>
				</n-nav-bar>
			</div>
		</section>
	</div>
</template>
