<template>
	<div class="container">
		<n-nav-bar title="Swipe 轮播" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-swiper v-model:active="active" class="swipe-container">
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg" alt="cat1" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg" alt="cat2" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg" alt="cat3" />
					</n-swiper-item>
				</n-swiper>
			</div>
		</section>
		<section>
			<div class="title">禁用循环（loop）</div>
			<div class="content unflex">
				<n-swiper v-model:active="active1" :loop="false" class="swipe-container">
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg" alt="cat1" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg" alt="cat2" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg" alt="cat3" />
					</n-swiper-item>
				</n-swiper>
			</div>
		</section>
		<section>
			<div class="title">自动播放（autoPlay）</div>
			<div class="content unflex">
				<n-swiper v-model:active="active2" :auto-play="2000" class="swipe-container">
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg" alt="cat1" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg" alt="cat2" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg" alt="cat3" />
					</n-swiper-item>
				</n-swiper>
			</div>
		</section>
		<section>
			<div class="title">垂直方向（vertical）</div>
			<div class="content unflex">
				<n-swiper v-model:active="active3" :auto-play="2000" vertical class="swipe-container">
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg" alt="cat1" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg" alt="cat2" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg" alt="cat3" />
					</n-swiper-item>
				</n-swiper>
			</div>
		</section>
		<section>
			<div class="title">指示器（hasDirector/directorColor/directorType）</div>
			<div class="content unflex">
				<n-swiper v-model:active="active4" :has-director="true" director-color="white" director-type="arrow" class="swipe-container">
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg" alt="cat1" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg" alt="cat2" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg" alt="cat3" />
					</n-swiper-item>
				</n-swiper>
			</div>
		</section>
		<section>
			<div class="title">标点（hasDot/dotColor）</div>
			<div class="content unflex">
				<n-swiper v-model:active="active5" dot-color="#d1c2d3" class="swipe-container">
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg" alt="cat1" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg" alt="cat2" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg" alt="cat3" />
					</n-swiper-item>
				</n-swiper>
			</div>
		</section>
		<section>
			<div class="title">自定义标点</div>
			<div class="content unflex">
				<n-swiper v-model:active="active6" class="swipe-container">
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg" alt="cat1" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadbffd9ea0.jpg" alt="cat2" />
					</n-swiper-item>
					<n-swiper-item>
						<img class="swiper-img" src="https://bu.dusays.com/2023/08/15/64dadc016afb6.jpg" alt="cat3" />
					</n-swiper-item>
					<template #dots="{ index, length }">
						<div class="custom-dots">{{ index + 1 }} / {{ length }}</div>
					</template>
				</n-swiper>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);
const active1 = ref(0);
const active2 = ref(0);
const active3 = ref(0);
const active4 = ref(0);
const active5 = ref(0);
const active6 = ref(0);
</script>

<style lang="less">
.swipe-container {
	height: 240px;
}
.swiper-img {
	width: 100%;
	height: 100%;
	pointer-events: none;
}
.custom-dots {
	position: absolute;
	bottom: 10px;
	right: 10px;
	width: 50px;
	height: 26px;
	line-height: 26px;
	text-align: center;
	color: #ffffff;
	font-size: 14px;
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.7);
}
</style>
