import _popup from './Popup.vue';
import { withInstall } from '../../utils/withInstall';

const nPopup = withInstall(_popup);

export default nPopup;

export { nPopup };

declare module 'vue' {
	export interface GlobalComponents {
		nPopup: typeof nPopup;
	}
}
