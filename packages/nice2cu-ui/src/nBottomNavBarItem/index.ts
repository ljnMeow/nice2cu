import _bottomNavBarItem from './BottomNavBarItem.vue';
import { withInstall } from '../../utils/withInstall';

const nBottomNavBarItem = withInstall(_bottomNavBarItem);

export default nBottomNavBarItem;

export { nBottomNavBarItem };

declare module 'vue' {
	export interface GlobalComponents {
		nBottomNavbarItem: typeof nBottomNavBarItem;
	}
}
