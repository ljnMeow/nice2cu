import _avatarGroup from './AvatarGroup';
import { withInstall } from '../../utils/withInstall';

const nAvatarGroup = withInstall(_avatarGroup);

export default nAvatarGroup;

export { nAvatarGroup };

declare module 'vue' {
	export interface GlobalComponents {
		nAvatarGroup: typeof nAvatarGroup;
	}
}
