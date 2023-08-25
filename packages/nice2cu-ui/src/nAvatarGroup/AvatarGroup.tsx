import { defineComponent, ComputedRef, computed, VNode, StyleValue, Fragment } from 'vue';
import { createNamespace } from '../../utils/create';
import { handleUnit, filterFragment } from '../../utils/tools';
import { AvatarGroupProps, AvatarGroupPropsType } from './AvatarGroupProps';
import nAvatar from '../nAvatar';
import './style/avatarGroup.less';

export default defineComponent({
	name: 'NAvatarGroup',
	components: { nAvatar },
	props: AvatarGroupProps,
	setup(props: AvatarGroupPropsType, { slots }) {
		const bem = createNamespace('avatar-group');

		const styles: ComputedRef<StyleValue> = computed(() => {
			if (props.offset == null) {
				return {};
			}

			return {
				'--avatar-group-offset': handleUnit(props.offset),
			} as StyleValue;
		});

		return () => {
			const childrenList: ComputedRef<VNode[]> = computed(() => (slots && slots.default ? filterFragment(slots.default()) : []));
			const showList = [...childrenList.value.slice(0, props.maxLength)];

			return (
				<div class={[bem.b(), props.vertical ? bem.m('column') : bem.m('row')]} style={styles.value}>
					{showList.map((child: VNode, index: number) => {
						if ((child.type as any).name === 'NAvatar') {
							return <div style={{ zIndex: 1 + index }}>{child}</div>;
						}
					})}
					{props.maxLength < childrenList.value.length ? (
						<div style={{ zIndex: showList.length + 1 }}>
							<nAvatar>+{childrenList.value.length - showList.length}</nAvatar>
						</div>
					) : (
						''
					)}
				</div>
			);
		};
	},
});
