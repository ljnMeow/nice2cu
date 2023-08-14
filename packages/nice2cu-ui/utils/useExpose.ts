import { getCurrentInstance } from 'vue';

export const useExpose = <T = Record<string, any>>(apis: T) => {
	const instance = getCurrentInstance();
	if (instance) {
		Object.assign(instance.proxy as object, apis);
	}
};
