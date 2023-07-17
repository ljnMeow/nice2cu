<template>
	<button
		v-ripple="{ disabled: false, isRipple: true }"
		:class="[bem.b(), active === itemIndexOrName ? bem.m('active') : '']"
		:style="{
			color: computeColorStyle(),
		}"
		@click="clickHandler"
	>
		<n-badge
			:hidden="isBoolean(badge) ? !badge : false"
			:dot="isBoolean(badge) ? badge : false"
			:content="isNumber(badge) ? badge : 0"
			:class="bem.e('badge')"
			:color="badgeColor"
		>
			<n-icon :icon="icon" :class-prefix="classPrefix" :size="iconSize"> </n-icon>
			<div :class="[bem.b('label')]">
				<slot />
			</div>
		</n-badge>
	</button>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { BottomNavBarItemProps, BottomNavBarItemPropsType, BottomNavBarItemPropsProvide } from './BottomNavBarItemProps';
import { createNamespace } from '../../utils/create';
import { isBoolean, isNumber } from '../../utils/tools';
import NIcon from '../nIcon';
import NBadge from '../nBadge';
import Ripple from '../../directives/ripple';
import './style/bottomNavBarItem.less';

export default defineComponent({
	name: 'NBottomNavbarItem',
	directives: { Ripple },
	components: { NIcon, NBadge },
	props: BottomNavBarItemProps,
	setup(props: BottomNavBarItemPropsType) {
		const bem = createNamespace('bottom-navbar-item');
		const bottomNavBarItem: ComponentInternalInstance = getCurrentInstance() as ComponentInternalInstance;
		const bottomNavBarItemProvide: BottomNavBarItemPropsProvide | undefined = inject('bottomNavBarItemProvide');
		const { active, activeColor, defaultColor, bottomNavBarItemProxys, changeNavBar } = bottomNavBarItemProvide!;
		const itemIndexOrName: Ref<number | string | undefined> = ref(active.value);

		if (bottomNavBarItem.proxy) {
			bottomNavBarItemProxys.value.push(bottomNavBarItem.proxy);
			const index: number = bottomNavBarItemProxys.value.indexOf(bottomNavBarItem.proxy);
			itemIndexOrName.value = props.name ? props.name : index;
		}

		const computeColorStyle = () => {
			return active.value === itemIndexOrName.value ? activeColor.value : defaultColor.value;
		};

		const clickHandler = () => {
			if (props.to && bottomNavBarItem.proxy) {
				bottomNavBarItem.proxy.$router.push(props.to);
			}
			const active = props.name ?? itemIndexOrName.value;
			changeNavBar(active!, bottomNavBarItem);
		};

		if (props.to && bottomNavBarItem.proxy) {
			if (props.to === bottomNavBarItem.proxy.$router.currentRoute.value.path) {
				clickHandler();
			}
		}

		return { bem, active, itemIndexOrName, computeColorStyle, clickHandler, isBoolean, isNumber };
	},
});
</script>
