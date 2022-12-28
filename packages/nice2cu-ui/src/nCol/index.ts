import _col from './Col.vue';
import { withInstall } from '../../utils/withInstall';

const nCol = withInstall(_col);

export default nCol;

export { nCol };

declare module 'vue' {
	export interface GlobalComponents {
		nCol: typeof nCol;
	}
}
