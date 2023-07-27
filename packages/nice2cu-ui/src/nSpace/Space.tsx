import { computed, defineComponent, CSSProperties, VNode, Fragment } from 'vue';
import { createNamespace } from '../../utils/create';
import { handleUnit, isArray } from '../../utils/tools';
import { SpaceProps, SpacePropsType } from './SpaceProps';
import './style/space.less';

export default defineComponent({
	name: 'NSpace',
	props: SpaceProps,
	setup(props: SpacePropsType, { slots }) {
		const bem = createNamespace('space');

		const spaceStyle = computed<CSSProperties>(() => {
			return {
				flexDirection: props.direction,
				justifyContent: props.justify,
				alignItems: props.align,
				flexWrap: props.wrap ? 'wrap' : 'nowrap',
			};
		});

		const marginStyle = (index: number, lastIndex: number) => {
			const style: CSSProperties = {};

			const [horizontal, vertical] = props.size.map((item: string | number) => handleUnit(item));

			if (props.direction === 'row') {
				if (['flex-start', 'center', 'flex-end'].includes(props.justify)) {
					if (index !== lastIndex) {
						style.margin = `calc(${vertical} / 2) ${horizontal} calc(${vertical} / 2) 0`;
					} else {
						style.margin = `calc(${vertical} / 2) 0`;
					}
				} else if (props.justify === 'space-around') {
					style.margin = `calc(${vertical} / 2) calc(${horizontal} / 2)`;
				} else if (props.justify === 'space-between') {
					if (index === 0) {
						style.margin = `calc(${vertical} / 2) calc(${horizontal} / 2) calc(${vertical} / 2) 0`;
					} else if (index === lastIndex) {
						style.margin = `calc(${vertical} / 2) 0 calc(${vertical} / 2) calc(${horizontal} / 2)`;
					} else {
						style.margin = `calc(${vertical} / 2) calc(${horizontal} / 2)`;
					}
				}
			}

			if (props.direction === 'column' && index !== lastIndex) {
				style.margin = `0 0 ${vertical} 0`;
			}

			return style;
		};

		const filterFragment = (children: VNode[] = []) => {
			const result: VNode[] = [];

			children.forEach((vNode: any) => {
				if (vNode.type === Comment) {
					return;
				}

				if (vNode.type === Fragment && isArray(vNode.children)) {
					vNode.children.forEach((item: VNode) => {
						result.push(item);
					});
					return;
				}

				result.push(vNode);
			});

			return result;
		};

		return () => {
			const childrenList = filterFragment(slots && slots.default ? slots.default() : []);

			return (
				<div class={[bem.b(), props.block ? bem.m('block') : '', !props.wrap ? bem.m('scroll') : '']} style={spaceStyle.value}>
					{childrenList.map((child: VNode, index: number) => {
						const style: CSSProperties = marginStyle(index, childrenList.length - 1);

						return (
							<div class={bem.e('margin-box')} data-key={index} style={style}>
								{child}
							</div>
						);
					})}
				</div>
			);
		};
	},
});
