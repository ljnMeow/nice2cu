import _badge from './Badge.vue';
import { withInstall } from '../../utils/withInstall';

const nBadge = withInstall(_badge);

export default nBadge;

export { nBadge };

declare module 'vue' {
	export interface GlobalComponents {
		nBadge: typeof nBadge;
	}
}
