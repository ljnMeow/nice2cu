import _row from './Row.vue';
import { withInstall } from '../../utils/withInstall';

const nRow = withInstall(_row);

export default nRow;

export { nRow };

declare module 'vue' {
	export interface GlobalComponents {
		nRow: typeof nRow;
	}
}
