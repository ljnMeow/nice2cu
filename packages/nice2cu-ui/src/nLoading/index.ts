import _loading from './Loading.vue';
import { withInstall } from '../../utils/withInstall';

const nLoading = withInstall(_loading);

export default nLoading;

export { nLoading };

declare module 'vue' {
	export interface GlobalComponents {
		nLoading: typeof nLoading;
	}
}
