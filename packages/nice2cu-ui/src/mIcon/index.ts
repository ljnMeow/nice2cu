import _icon from './Icon.vue';
import { withInstall } from '../../utils/withInstall';

const mIcon = withInstall(_icon);

export default mIcon;

export { mIcon };

declare module 'vue' {
	export interface GlobalComponents {
		mIcon: typeof mIcon;
	}
}
