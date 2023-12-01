import _dialog from './Dialog.vue';
import { withInstall } from '../../utils/withInstall';

const nDialog = withInstall(_dialog);

export default nDialog;

export { nDialog };

declare module 'vue' {
	export interface GlobalComponents {
		nDialog: typeof nDialog;
	}
}
