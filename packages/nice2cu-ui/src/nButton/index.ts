import _button from './Button.vue';
import { withInstall } from '../../utils/withInstall';

const nButton = withInstall(_button);

export default nButton;

export { nButton };

declare module 'vue' {
	export interface GlobalComponents {
		nButton: typeof nButton;
	}
}
