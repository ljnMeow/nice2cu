import _sticky from './Sticky.vue';
import { withInstall } from '../../utils/withInstall';

const nSticky = withInstall(_sticky);

export default nSticky;

export { nSticky };

declare module 'vue' {
	export interface GlobalComponents {
		nSticky: typeof nSticky;
	}
}
