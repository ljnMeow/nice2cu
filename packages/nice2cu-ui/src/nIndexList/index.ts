import _indexList from './IndexList.vue';
import { withInstall } from '../../utils/withInstall';

const nIndexList = withInstall(_indexList);

export default nIndexList;

export { nIndexList };

declare module 'vue' {
	export interface GlobalComponents {
		nIndexList: typeof nIndexList;
	}
}
