import _divider from './Divider';
import { withInstall } from '../../utils/withInstall';

const nDivider = withInstall(_divider);

export default nDivider;

export { nDivider };

declare module 'vue' {
	export interface GlobalComponents {
		nDivider: typeof nDivider;
	}
}
