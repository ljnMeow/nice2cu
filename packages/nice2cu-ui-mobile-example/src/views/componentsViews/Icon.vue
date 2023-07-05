<template>
	<div class="container">
		<n-nav-bar title="Icon 图标" show-left left-text="" :shadow-buttom="true" fixed-top placeholder></n-nav-bar>
		<section>
			<div class="title">图标尺寸（size）</div>
			<div class="content">
				<n-icon icon="n-alarm-sharp" size="1rem" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="1.6rem" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="2.2rem" margin="0 6px"></n-icon>
			</div>
		</section>
		<section>
			<div class="title">图标颜色（color）</div>
			<div class="content">
				<n-icon icon="n-alarm-sharp" size="1rem" color="#3a7afe" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="1.6rem" color="#3a7afe" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="2.2rem" color="#3a7afe" margin="0 6px"></n-icon>
			</div>
		</section>
		<section>
			<div class="title">图标边距（margin）</div>
			<div class="content">
				<n-icon icon="n-alarm-sharp" size="1rem" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="1.6rem" margin="0 6px"></n-icon>
				<n-icon icon="n-alarm-sharp" size="2.2rem" margin="0 6px"></n-icon>
			</div>
		</section>
		<section>
			<div class="title">svg图标（svg）</div>
			<div class="content">
				<n-icon icon="n-grape" svg size="2rem" margin="0 6px 0 0"></n-icon>
				<n-icon icon="n-mushroom" svg size="2rem" margin="0 6px 0 0"></n-icon>
			</div>
		</section>
		<section>
			<div class="title">图标徽章（badge）</div>
			<div class="content">
				<n-icon icon="n-grape" svg size="2rem" badge margin="0 6px 0 0"></n-icon>
				<n-icon icon="n-mushroom" svg size="2rem" badge="9" margin="0 6px 0 0"></n-icon>
			</div>
		</section>
	</div>
</template>
