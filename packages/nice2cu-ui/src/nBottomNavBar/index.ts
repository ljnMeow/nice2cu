import _bottomNavBar from './BottomNavBar.vue';
import { withInstall } from '../../utils/withInstall';

const nBottomNavBar = withInstall(_bottomNavBar);

export default nBottomNavBar;

export { nBottomNavBar };

declare module 'vue' {
	export interface GlobalComponents {
		nBottomNavbar: typeof nBottomNavBar;
	}
}
