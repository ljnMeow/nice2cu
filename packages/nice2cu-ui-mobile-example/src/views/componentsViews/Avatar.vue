<template>
	<div class="container">
		<n-nav-bar title="Avatar 头像" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-space align="center">
					<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">尺寸（size）</div>
			<div class="content unflex">
				<n-space align="center">
					<n-avatar size="mini" src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar size="small" src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar size="large" src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar size="80" src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">形状（round）</div>
			<div class="content unflex">
				<n-space align="center">
					<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar :round="false" src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">边框/边框颜色（bordered / borderColor）</div>
			<div class="content unflex">
				<n-space align="center">
					<n-avatar bordered src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar bordered border-color="rgb(33, 150, 243)" src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">填充模式（fit）</div>
			<div class="content unflex">
				<n-space align="center">
					<n-space direction="column" align="center">
						<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp" fit="fill"></n-avatar>
						<span>fill</span>
					</n-space>
					<n-space direction="column" align="center">
						<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp" fit="contain"></n-avatar>
						<span>contain</span>
					</n-space>
					<n-space direction="column" align="center">
						<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp" fit="cover"></n-avatar>
						<span>cover</span>
					</n-space>
					<n-space direction="column" align="center">
						<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp" fit="none"></n-avatar>
						<span>none</span>
					</n-space>
					<n-space direction="column" align="center">
						<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp" fit="scale-down"></n-avatar>
						<span>scale-down</span>
					</n-space>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">文字模式 / 背景颜色（color）</div>
			<div class="content unflex">
				<n-space align="center">
					<n-avatar color="#e3b4b8">NICE2CU</n-avatar>
					<n-avatar color="#c08eaf">卡利斯</n-avatar>
				</n-space>
			</div>
		</section>
		<section>
			<div class="title">头像分组</div>
			<div class="content unflex">
				<n-avatar-group>
					<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar color="#c08eaf">卡利斯</n-avatar>
					<n-avatar color="#e3b4b8">NICE2CU</n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg"></n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg"></n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg"></n-avatar>
				</n-avatar-group>
			</div>
		</section>
		<section>
			<div class="title">最大展示（maxLength）</div>
			<div class="content unflex">
				<n-avatar-group :max-length="5">
					<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar color="#c08eaf">卡利斯</n-avatar>
					<n-avatar color="#e3b4b8">NICE2CU</n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg"></n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg"></n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg"></n-avatar>
				</n-avatar-group>
			</div>
		</section>
		<section>
			<div class="title">纵向展示（vertical）</div>
			<div class="content unflex">
				<n-avatar-group vertical>
					<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar color="#c08eaf">卡利斯</n-avatar>
					<n-avatar color="#e3b4b8">NICE2CU</n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg"></n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg"></n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg"></n-avatar>
				</n-avatar-group>
			</div>
		</section>
		<section>
			<div class="title">间距（offset）</div>
			<div class="content unflex">
				<n-avatar-group offset="10">
					<n-avatar src="https://bu.dusays.com/2023/06/04/647c4b5936222.webp"></n-avatar>
					<n-avatar color="#c08eaf">卡利斯</n-avatar>
					<n-avatar color="#e3b4b8">NICE2CU</n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg"></n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg"></n-avatar>
					<n-avatar src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg"></n-avatar>
				</n-avatar-group>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('卡利斯');

const clickfun = () => {
	text.value = '卡利斯斯特林';
};
</script>
