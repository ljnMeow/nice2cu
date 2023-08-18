import { Fragment, defineComponent, nextTick } from 'vue';
import { TabItemProps } from './TabItemProps';

export default defineComponent({
	name: 'NTabItem',
	props: TabItemProps,
	setup(_props, { slots }) {
		return () => {
			return <Fragment>{slots.default?.()}</Fragment>;
		};
	},
});
