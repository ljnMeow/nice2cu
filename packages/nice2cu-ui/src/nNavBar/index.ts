import _navBar from './NavBar.vue';
import { withInstall } from '../../utils/withInstall';

const nNavBar = withInstall(_navBar);

export default nNavBar;

export { nNavBar };

declare module 'vue' {
	export interface GlobalComponents {
		nNavBar: typeof nNavBar;
	}
}
