import _swiperItem from './SwiperItem.vue';
import { withInstall } from '../../utils/withInstall';

const nSwiperItem = withInstall(_swiperItem);

export default nSwiperItem;

export { nSwiperItem };

declare module 'vue' {
	export interface GlobalComponents {
		nSwiperItem: typeof nSwiperItem;
	}
}
