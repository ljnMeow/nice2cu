import { defineComponent, computed, ref, nextTick, reactive } from 'vue';
import { createNamespace } from '../../utils/create';
import { filterFragment } from '../../utils/tools';
import { DividerProps, DividerPropsType } from './DividerProps';
import './style/divider.less';

export default defineComponent({
	name: 'NDivider',
	props: DividerProps,
	setup(props: DividerPropsType, { slots }) {
		const bem = createNamespace('divider');

		const divider = ref<HTMLElement | null>();
		const description = computed(() => {
			return slots && slots.default ? filterFragment(slots.default()) : false;
		});
		const style = reactive({
			...props.customStyle,
			'--divider-color': undefined,
		});

		const checkText = computed(() => {
			return description.value && !props.vertical;
		});

		nextTick(() => {
			props.customStyle.borderColor ? (style['--divider-color'] = props.customStyle.borderColor) : undefined;
		});

		return () => {
			return (
				<div
					ref={divider}
					class={[
						bem.b(),
						props.dashed ? bem.m('dashed') : '',
						checkText.value ? bem.m('has-text') : '',
						props.contentPosition === 'left' ? bem.em('left', 'text') : '',
						props.contentPosition === 'right' ? bem.em('right', 'text') : '',
						props.vertical ? bem.m('vertical') : '',
						props.hairline ? bem.m('hairline') : '',
					]}
					style={style}
				>
					{description.value && !props.vertical ? <span class={bem.e('text')}>{description.value}</span> : ''}
				</div>
			);
		};
	},
});
