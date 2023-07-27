import _space from './Space';
import { withInstall } from '../../utils/withInstall';

const nSpace = withInstall(_space);

export default nSpace;

export { nSpace };

declare module 'vue' {
	export interface GlobalComponents {
		nSpace: typeof nSpace;
	}
}
