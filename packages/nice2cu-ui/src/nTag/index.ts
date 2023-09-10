import _tag from './Tag.vue';
import { withInstall } from '../../utils/withInstall';

const nTag = withInstall(_tag);

export default nTag;

export { nTag };

declare module 'vue' {
	export interface GlobalComponents {
		nTag: typeof nTag;
	}
}
