import _ellipsis from './Ellipsis.vue';
import { withInstall } from '../../utils/withInstall';

const nEllipsis = withInstall(_ellipsis);

export default nEllipsis;

export { nEllipsis };

declare module 'vue' {
	export interface GlobalComponents {
		nEllipsis: typeof nEllipsis;
	}
}
