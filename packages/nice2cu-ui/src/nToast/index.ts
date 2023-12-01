import { toRaw, toRefs } from 'vue';
import _toast from './Toast.vue';
import { withInstall } from '../../utils/withInstall';
import { CreateComponent } from '../../utils/components';

const nToast = withInstall(_toast);

let defaultToastOptions = {
	id: '',
	type: 'default',
	content: '',
	icon: '',
	iconSize: '30px',
	iconPrefix: 'nice2cu-icon',
	loading: false,
	duration: 2000,
	hasMask: false,
	maskColor: 'transparent',
	customStyle: {},
	wrapper: 'body',
	clearToast: null,
	onClose: null,
};
let cacheOptions: any[] = [];
let cacheComp: any[] = [];
let idsMap: string[] = [];
let optsMap: any[] = [];

export default nToast;

export { nToast };

const changedefaultToastOptions = (options: any) => {
	defaultToastOptions = { ...defaultToastOptions, ...options };
};

const updateToast = (options: any, comp: any) => {
	const container = document.getElementById(`NToast-${options.id}`);
	if (container) {
		const currentOpt = optsMap.find((item) => item.id === options.id);
		if (currentOpt) {
			options = { ...defaultToastOptions, ...currentOpt, ...options };
		} else {
			options = { ...defaultToastOptions, ...options };
		}

		const compData = toRaw(comp.instance);
		const state = toRefs(compData.state);
		for (const key in state) {
			if (Object.prototype.hasOwnProperty.call(options, key)) {
				state[key].value = options[key];
			}
		}

		return compData;
	}
};

const clearToast = (id?: string) => {
	if (id) {
		const container = document.getElementById(`NToast-${id}`);
		optsMap = optsMap.filter((item) => item.id !== id);
		idsMap = idsMap.filter((item) => item !== id);
		const cacheOptionsData = cacheOptions.filter((item) => item.id === id);
		cacheOptions = cacheOptions.filter((item) => item.id !== id);
		cacheComp = cacheComp.filter((item) => item.id !== id);
		if (container) {
			if (cacheOptionsData.length > 0 && cacheOptionsData[0].onClose) {
				cacheOptionsData[0].onClose();
			}
			document.body.removeChild(container);
		}
	} else {
		idsMap.forEach((item) => {
			const container = document.getElementById(`NToast-${item}`);
			if (container) {
				document.body.removeChild(container);
			}
		});
		cacheOptions.forEach((item) => {
			if (item.onClose) {
				item.onClose();
			}
		});
		optsMap = [];
		idsMap = [];
		cacheOptions = [];
		cacheComp = [];
	}
};

const createdToast = (options: any) => {
	options.clearToast = clearToast;

	options = { ...defaultToastOptions, ...options };

	let _id = null;
	if (options.id) {
		_id = options.id;
		if (idsMap.find((item) => item === options.id)) {
			const compData = cacheComp.find((item) => item.id === options.id);
			return updateToast(options, compData.comp);
		}
	} else {
		_id = new Date().getTime() + '';
	}

	options.id = _id;

	idsMap.push(options.id);
	optsMap.push(options);
	cacheOptions.push(options);

	const comp = CreateComponent(options, { wrapper: _toast, name: 'NToast' });

	cacheComp.push({ id: options.id, comp });

	return toRaw(comp.instance);
};

export const Toast = {
	showToast(options: any) {
		return createdToast(options);
	},
	showToastLoading(options?: any) {
		return createdToast({ ...{ content: '加载中...', loading: true }, ...options });
	},
	hideToastLoading(id?: string) {
		return clearToast(id);
	},
	setGlobleToastOptions(options: any) {
		return changedefaultToastOptions(options);
	},
};

declare module 'vue' {
	export interface GlobalComponents {
		nToast: typeof nToast;
	}
}
