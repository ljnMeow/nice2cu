import _icon from './Icon.vue';
import { withInstall } from '../../utils/withInstall';

const nIcon = withInstall(_icon);

export default nIcon;

export { nIcon };

declare module 'vue' {
	export interface GlobalComponents {
		nIcon: typeof nIcon;
	}
}
