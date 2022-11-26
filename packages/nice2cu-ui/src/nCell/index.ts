import _cell from './Cell.vue';
import { withInstall } from '../../utils/withInstall';

const nCell = withInstall(_cell);

export default nCell;

export { nCell };

declare module 'vue' {
	export interface GlobalComponents {
		nCell: typeof nCell;
	}
}
