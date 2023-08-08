import _tabItem from './TabItem';
import { withInstall } from '../../utils/withInstall';

const nTabItem = withInstall(_tabItem);

export default nTabItem;

export { nTabItem };

declare module 'vue' {
	export interface GlobalComponents {
		nTabItem: typeof nTabItem;
	}
}
