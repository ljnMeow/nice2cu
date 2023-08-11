import _swiper from './Swiper';
import { withInstall } from '../../utils/withInstall';

const nSwiper = withInstall(_swiper);

export default nSwiper;

export { nSwiper };

declare module 'vue' {
	export interface GlobalComponents {
		nSwiper: typeof nSwiper;
	}
}
