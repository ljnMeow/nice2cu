import _card from './Card.vue';
import { withInstall } from '../../utils/withInstall';

const nCard = withInstall(_card);

export default nCard;

export { nCard };

declare module 'vue' {
	export interface GlobalComponents {
		nCard: typeof nCard;
	}
}
