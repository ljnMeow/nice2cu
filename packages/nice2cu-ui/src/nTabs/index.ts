import _tabs from './Tabs';
import { withInstall } from '../../utils/withInstall';

const nTabs = withInstall(_tabs);

export default nTabs;

export { nTabs };

declare module 'vue' {
	export interface GlobalComponents {
		nTabs: typeof nTabs;
	}
}
