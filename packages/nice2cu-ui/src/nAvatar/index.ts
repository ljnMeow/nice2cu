import _avatar from './Avatar.vue';
import { withInstall } from '../../utils/withInstall';

const nAvatar = withInstall(_avatar);

export default nAvatar;

export { nAvatar };

declare module 'vue' {
	export interface GlobalComponents {
		nAvatar: typeof nAvatar;
	}
}
