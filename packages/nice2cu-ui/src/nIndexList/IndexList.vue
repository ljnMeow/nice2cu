<template>
	<div :class="[bem.b()]">
		<div ref="scrollView" :class="[bem.b('inner')]" :style="{ height: handleUnit(height) }">
			<div v-for="(item, index) in indexList" :key="index" ref="listGroup" :class="[bem.b('item')]">
				<div :class="[bem.e('title')]">{{ item.title }}</div>
				<div
					v-for="(nameItem, nameIndex) in item.list"
					:key="nameIndex"
					:class="[bem.e('name'), anchorIndex === nameIndex && item.title === anchorTitle ? bem.em('name', 'active') : undefined]"
					:style="{ color: anchorIndex === nameIndex && item.title === anchorTitle ? highlightColor : '#000000' }"
					@click="handlerClickIndexItem(nameItem, index, nameIndex)"
				>
					{{ nameItem.name }}
				</div>
			</div>
		</div>
		<div v-if="scrollY > 0 && titleSticky" :class="bem.em('title', 'sticky')" :style="{ color: highlightColor }">
			{{ indexList[currentIndex].title }}
		</div>
		<div v-if="indexList.length > 0 && !hideBar" :class="[bem.b('bar')]">
			<div
				v-for="(item, index) in indexList"
				:key="index"
				:data-index="index"
				:class="[bem.e('bar-item'), currentIndex === index ? bem.em('bar-item', 'active') : undefined]"
				:style="{ color: currentIndex === index ? highlightColor : '#000000' }"
				@click="handlerClickBar(index)"
			>
				{{ item.title }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, Ref, defineComponent, reactive, toRefs, onMounted, watch } from 'vue';
import { createNamespace } from '../../utils/create';
import { handleUnit, animationScrollTo, debounce } from '../../utils/tools';
import { IndexListProps, IndexListPropsType, IndexListData } from './IndexListProps';
import './style/indexList.less';

interface IndexListDataWithTitle extends IndexListData {
	title: string;
}

export default defineComponent({
	name: 'NIndexList',
	props: IndexListProps,
	emits: ['change', 'listClick'],
	setup(props: IndexListPropsType, ctx) {
		const bem = createNamespace('indexlist');
		const scrollView: Ref<any> = ref(null);
		const listGroup: Ref<any> = ref(null);

		const state = reactive({
			scrollY: 0,
			currentIndex: 0,
			anchorIndex: 0,
			anchorTitle: '',
			touchState: {
				y1: 0,
				y2: 0,
			},
			listHeight: [] as number[],
		});

		const calculateHeight = () => {
			const list = listGroup.value;
			let height = 0;
			state.listHeight.push(height);

			if (list && list.length > 0) {
				for (let i = 0; i < list.length; i++) {
					let item = list[i];
					height += item.clientHeight;
					state.listHeight.push(height);
				}
			}
		};

		const scrollViewListener = (e: Event) => {
			let target = e.target as Element;
			let scrollTop = target.scrollTop;
			const listHeight = state.listHeight;

			state.scrollY = scrollTop;

			for (let i = 0; i < listHeight.length - 1; i++) {
				if (scrollTop < listHeight[i + 1] && scrollTop >= listHeight[i]) {
					state.currentIndex = i;
				}
			}
		};

		const scrollTo = (index: number) => {
			if (!index && index !== 0) {
				return;
			}
			if (index < 0) index = 0;
			animationScrollTo(scrollView.value, state.listHeight[index], 500);
		};

		const handlerClickBar = (index: number) => {
			scrollTo(index);
		};

		const handlerClickIndexItem = (item: IndexListData, index: number, nameIndex: number) => {
			const title: string = props.indexList[index].title;
			const data: IndexListDataWithTitle = {
				...item,
				title,
			};

			state.anchorIndex = nameIndex;
			state.anchorTitle = title;
			ctx.emit('listClick', data);
		};

		const changeAnchorIndex = debounce(() => {
			ctx.emit('change', state.currentIndex);
		}, 200);

		watch(
			() => state.currentIndex,
			() => {
				changeAnchorIndex();
			}
		);

		onMounted(() => {
			calculateHeight();

			if (scrollView.value) {
				scrollView.value.addEventListener('scroll', scrollViewListener);
			}
		});

		return { bem, handleUnit, scrollView, listGroup, ...toRefs(state), handlerClickBar, handlerClickIndexItem, scrollTo };
	},
});
</script>
