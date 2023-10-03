<template>
	<div class="container">
		<n-nav-bar title="Card 卡片" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>
		<section>
			<div class="title">基本使用</div>
			<div class="content">
				<n-card
					title="nice2cu-UI Card组件"
					description="基于Vue3.0 + vite构建的移动端组件库，最初的目的是为了方面自己开发，设计方面参考各大网红组件库的设计，现已开源，供大家使用，后面也会不断完善组件库并加入自己的设计，不足之处请各位大佬多多指教"
				></n-card>
			</div>
		</section>
		<section>
			<div class="title">副标题（subtitle）</div>
			<div class="content">
				<n-card
					title="nice2cu-UI Card组件"
					subtitle="基于Vue3.0 + vite构建的移动端组件库"
					description="基于Vue3.0 + vite构建的移动端组件库，最初的目的是为了方面自己开发，设计方面参考各大网红组件库的设计，现已开源，供大家使用，后面也会不断完善组件库并加入自己的设计，不足之处请各位大佬多多指教"
				></n-card>
			</div>
		</section>
		<section>
			<div class="title">外边框（outline）</div>
			<div class="content">
				<n-card
					outline
					title="nice2cu-UI Card组件"
					subtitle="基于Vue3.0 + vite构建的移动端组件库"
					description="基于Vue3.0 + vite构建的移动端组件库，最初的目的是为了方面自己开发，设计方面参考各大网红组件库的设计，现已开源，供大家使用，后面也会不断完善组件库并加入自己的设计，不足之处请各位大佬多多指教"
				></n-card>
			</div>
		</section>
		<section>
			<div class="title">展示图片（src）</div>
			<div class="content">
				<n-card
					src="https://bu.dusays.com/2023/07/03/64a289689b496.jpg"
					title="nice2cu-UI Card组件"
					subtitle="基于Vue3.0 + vite构建的移动端组件库"
					description="基于Vue3.0 + vite构建的移动端组件库，最初的目的是为了方面自己开发，设计方面参考各大网红组件库的设计，现已开源，供大家使用，后面也会不断完善组件库并加入自己的设计，不足之处请各位大佬多多指教"
				></n-card>
			</div>
		</section>
		<section>
			<div class="title">footer插槽</div>
			<div class="content">
				<n-card
					src="https://bu.dusays.com/2023/07/03/64a289689b496.jpg"
					title="nice2cu-UI Card组件"
					subtitle="基于Vue3.0 + vite构建的移动端组件库"
					description="基于Vue3.0 + vite构建的移动端组件库，最初的目的是为了方面自己开发，设计方面参考各大网红组件库的设计，现已开源，供大家使用，后面也会不断完善组件库并加入自己的设计，不足之处请各位大佬多多指教"
				>
					<template #footer>
						<n-space justify="flex-end">
							<n-button type="primary">确认</n-button>
							<n-button type="danger">取消</n-button>
						</n-space>
					</template>
				</n-card>
			</div>
		</section>
		<section>
			<div class="title">横向布局</div>
			<div class="content">
				<n-card
					layout="horizontal"
					src="https://bu.dusays.com/2023/07/03/64a289689b496.jpg"
					title="nice2cu-UI Card组件"
					subtitle="基于Vue3.0 + vite构建的移动端组件库，最初的目的是为了方面自己开发，设计方面参考各大网红组件库的设计，现已开源，供大家使用"
					is-subtitle-ellipsis
				>
					<template #footer>
						<n-space justify="flex-end">
							<n-button type="primary">确认</n-button>
							<n-button type="danger">取消</n-button>
						</n-space>
					</template>
				</n-card>
			</div>
		</section>
	</div>
</template>
