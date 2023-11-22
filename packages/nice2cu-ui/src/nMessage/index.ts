import _message from './Message.vue';
import { withInstall } from '../../utils/withInstall';

const nMessage = withInstall(_message);

export default nMessage;

export { nMessage };

declare module 'vue' {
	export interface GlobalComponents {
		nMessage: typeof nMessage;
	}
}
