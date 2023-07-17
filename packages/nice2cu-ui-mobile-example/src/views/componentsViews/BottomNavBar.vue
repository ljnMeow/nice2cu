<template>
	<div class="container">
		<n-nav-bar title="BottomNavBar 底部导航栏" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基础用法</div>
			<div class="content unflex">
				<n-bottom-navbar v-model:active="active1">
					<n-bottom-navbar-item icon="n-home-sharp">标签1</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-calendar-sharp">标签2</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-briefcase-sharp">标签3</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-chatbox-ellipses-sharp">标签4</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-bulb-sharp">标签5</n-bottom-navbar-item>
				</n-bottom-navbar>
			</div>
		</section>
		<section>
			<div class="title">通过名称匹配（name）</div>
			<div class="content unflex">
				<n-bottom-navbar v-model:active="active2">
					<n-bottom-navbar-item icon="n-home-sharp" name="first">标签1</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-calendar-sharp" name="second">标签2</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-briefcase-sharp" name="third">标签3</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-chatbox-ellipses-sharp" name="four">标签4</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-bulb-sharp" name="five">标签5</n-bottom-navbar-item>
				</n-bottom-navbar>
			</div>
		</section>
		<section>
			<div class="title">徽标提醒/徽标颜色（badge / badgeColor）</div>
			<div class="content unflex">
				<n-bottom-navbar v-model:active="active3">
					<n-bottom-navbar-item icon="n-home-sharp" :badge="true">标签1</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-calendar-sharp" :badge="10">标签2</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-briefcase-sharp" :badge="100">标签3</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-chatbox-ellipses-sharp" :badge="true" badge-color="#2f90b9">标签4</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-bulb-sharp" :badge="100" badge-color="#1ba784">标签5</n-bottom-navbar-item>
				</n-bottom-navbar>
			</div>
		</section>
		<section>
			<div class="title">自定义颜色（activeColor / defaultColor）</div>
			<div class="content unflex">
				<n-bottom-navbar v-model:active="active4" default-color="#541e24" active-color="#ec2d7a">
					<n-bottom-navbar-item icon="n-home-sharp">标签1</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-calendar-sharp">标签2</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-briefcase-sharp">标签3</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-chatbox-ellipses-sharp">标签4</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-bulb-sharp">标签5</n-bottom-navbar-item>
				</n-bottom-navbar>
			</div>
		</section>
		<section>
			<div class="title">监听切换（switch）</div>
			<div class="content unflex">
				<n-bottom-navbar v-model:active="active5" @switch="switchBar">
					<n-bottom-navbar-item icon="n-home-sharp">标签1</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-calendar-sharp">标签2</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-briefcase-sharp">标签3</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-chatbox-ellipses-sharp">标签4</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-bulb-sharp">标签5</n-bottom-navbar-item>
				</n-bottom-navbar>
			</div>
		</section>
		<section>
			<div class="title">路由跳转（to）</div>
			<div class="content unflex text-center">
				<router-view></router-view>
			</div>
			<div class="content unflex">
				<n-bottom-navbar v-model:active="active6">
					<n-bottom-navbar-item icon="n-home-sharp" to="/bottomNavBar/page1">页面1</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-calendar-sharp" to="/bottomNavBar/page2">页面2</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-briefcase-sharp" to="/bottomNavBar/page3">页面3</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-chatbox-ellipses-sharp" to="/bottomNavBar/page4">页面4</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-bulb-sharp" to="/bottomNavBar/page5">页面5</n-bottom-navbar-item>
				</n-bottom-navbar>
			</div>
		</section>
		<section>
			<div class="title">固定底部（fixedBottom）</div>
			<div class="content unflex">
				<n-bottom-navbar v-model:active="active7" fixed-bottom safe-area-inset-bottom placeholder>
					<n-bottom-navbar-item icon="n-home-sharp">标签1</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-calendar-sharp">标签2</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-briefcase-sharp">标签3</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-chatbox-ellipses-sharp">标签4</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-bulb-sharp">标签5</n-bottom-navbar-item>
				</n-bottom-navbar>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref, Ref, watch, ComponentInternalInstance } from 'vue';

const active1: Ref<number> = ref(0);
const active2: Ref<string> = ref('first');
const active3: Ref<number> = ref(0);
const active4: Ref<number> = ref(0);
const active5: Ref<number> = ref(0);
const active6: Ref<number> = ref(0);
const active7: Ref<number> = ref(0);

const switchBar = (index: number, comp: ComponentInternalInstance) => {
	console.log(index, comp);
};
</script>
