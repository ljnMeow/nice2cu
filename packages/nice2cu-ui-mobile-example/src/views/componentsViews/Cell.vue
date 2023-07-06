<template>
	<div class="container">
		<n-nav-bar title="Cell 单元格" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>
		<section>
			<div class="title">基础用法</div>
			<div class="content">
				<n-cell title="单元格"></n-cell>
			</div>
		</section>
		<section>
			<div class="title">描述信息（description）</div>
			<div class="content">
				<n-cell title="单元格" description="单元格描述信息"></n-cell>
			</div>
		</section>
		<section>
			<div class="title">展示边框（border）</div>
			<div class="content">
				<n-cell title="单元格" description="单元格描述信息" border></n-cell>
			</div>
		</section>
		<section>
			<div class="title">图标（icon/extra）</div>
			<div class="content">
				<n-cell title="单元格" description="单元格描述信息" icon="n-alarm-sharp" extra="n-cloud-upload-sharp"></n-cell>
			</div>
		</section>
		<section>
			<div class="title">展示右边箭头（showArrow）</div>
			<div class="content">
				<n-cell title="单元格" description="单元格描述信息" show-arrow="right"></n-cell>
				<n-cell title="单元格" description="单元格描述信息" show-arrow="up"></n-cell>
				<n-cell title="单元格" description="单元格描述信息" show-arrow="down"></n-cell>
			</div>
		</section>
		<section>
			<div class="title">开启水波纹点击反馈（isRipple）</div>
			<div class="content">
				<n-cell title="单元格" description="单元格描述信息" is-ripple></n-cell>
			</div>
		</section>
		<section>
			<div class="title">页面跳转（url/link）</div>
			<div class="content">
				<n-cell title="loading" description="跳转到loading" link="loading"></n-cell>
				<n-cell title="百度" description="跳转到百度" url="https://www.baidu.com"></n-cell>
			</div>
		</section>
		<section>
			<div class="title">插槽（default/icon/description/extra）</div>
			<div class="content">
				<n-cell>
					<template #icon>
						<n-icon icon="n-mushroom" svg></n-icon>
					</template>
					<p>默认插槽</p>
					<template #description>
						<p>description插槽</p>
					</template>
					<template #extra>
						<n-icon icon="n-close-circle-sharp"></n-icon>
					</template>
				</n-cell>
			</div>
		</section>
	</div>
</template>
