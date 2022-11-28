import _image from './Image.vue';
import { withInstall } from '../../utils/withInstall';

const nImage = withInstall(_image);

export default nImage;

export { nImage };

declare module 'vue' {
	export interface GlobalComponents {
		nImage: typeof nImage;
	}
}
