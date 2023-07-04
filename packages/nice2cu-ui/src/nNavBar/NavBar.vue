<template>
	<div :class="[bem.b()]">
		<div
			:class="[bem.e('content'), fixedTop ? bem.em('content', 'fixed-top') : '']"
			:style="{ height: height, background: background, boxShadow: shadowButtom ? `0px 2px 4px 0px ${shadowColor}` : '' }"
		>
			<div v-if="showLeft" :class="[bem.e('left')]">
				<div v-if="!useSlots().left" :class="[bem.e('left-content')]" @click="leftClickHandler">
					<n-icon :color="textColor" :size="iconSize" :icon="leftIcon" :class-prefix="classPrefix"></n-icon>
					<span :class="[bem.e('left-text')]" :style="{ color: textColor }">{{ leftText }}</span>
				</div>
				<slot name="left" />
			</div>
			<div :class="[bem.e('title'), 'text-ellipsis']" :style="{ color: textColor }">
				{{ !useSlots().default ? title : '' }}
				<slot />
			</div>
			<div v-if="showRight" :class="[bem.e('right')]">
				<div v-if="!useSlots().right" :class="[bem.e('right-content')]" @click="rightClick">
					<span :color="textColor" :class="[bem.e('right-text')]" :style="{ color: textColor }">{{ rightText }}</span>
					<n-icon :size="iconSize" :icon="rightIcon" :class-prefix="classPrefix"></n-icon>
				</div>
				<slot name="right" />
			</div>
		</div>
		<div v-if="placeholder" :class="bem.e('content-placeholder')" :style="{ height: height }"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useSlots } from 'vue';
import { createNamespace } from '../../utils/create';
import { NavBarProps, NavBarPropsType } from './NavBarProps';
import NIcon from '../nIcon';
import './style/navBar.less';
import '../../theme-chalk/mixins/common.less';

export default defineComponent({
	name: 'NNavBar',
	components: { NIcon },
	props: NavBarProps,
	emits: ['leftClick'],
	setup(props: NavBarPropsType) {
		const bem = createNamespace('nav-bar');

		const leftClickHandler = (e: Event) => {
			if (props.leftClick) {
				props.leftClick(e);
			} else {
				history.back();
			}
		};

		return { bem, useSlots, leftClickHandler };
	},
});
</script>
