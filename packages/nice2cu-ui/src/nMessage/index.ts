import { toRaw, toRefs } from 'vue';
import _message from './Message.vue';
import { withInstall } from '../../utils/withInstall';
import { CreateComponent } from '../../utils/components';

const nMessage = withInstall(_message);

let defaultMessageOptions = {
	id: '',
	type: 'default',
	content: '',
	duration: 2000,
	customStyle: {},
	offset: 40,
	zIndex: 9999,
	icon: '',
	iconSize: '18px',
	iconPrefix: 'nice2cu-icon',
	loading: false,
	hasMask: false,
	maskColor: 'transparent',
	clickMaskClose: false,
	wrapper: 'body',
	clearMessage: null,
	onClose: null,
};
let cacheOptions: any[] = [];
let cacheComp: any[] = [];
let idsMap: string[] = [];
let optsMap: any[] = [];

export default nMessage;

export { nMessage };

const changedefaultMessageOptions = (options: any) => {
	defaultMessageOptions = { ...defaultMessageOptions, ...options };
};

const updateMessage = (options: any, comp: any) => {
	const container = document.getElementById(`NMessage-${options.id}`);
	if (container) {
		const currentOpt = optsMap.find((item) => item.id === options.id);
		if (currentOpt) {
			options = { ...defaultMessageOptions, ...currentOpt, ...options };
		} else {
			options = { ...defaultMessageOptions, ...options };
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

const clearMessage = (id?: string) => {
	if (id) {
		const container = document.getElementById(`NMessage-${id}`);
		optsMap = optsMap.filter((item) => item.id !== id);
		idsMap = idsMap.filter((item) => item !== id);
		const cacheOptionsData = cacheOptions.filter((item) => item.id === id);
		cacheOptions = cacheOptions.filter((item) => item.id !== id);
		const cacheCompData = cacheComp.filter((item) => item.id === id);
		cacheComp = cacheComp.filter((item) => item.id !== id);

		if (container) {
			if (cacheCompData.length > 0 && cacheCompData[0].comp.instance.$el) {
				const removeHeight = cacheCompData[0].comp.instance.$el.offsetHeight;
				for (let i = 0; i < cacheComp.length; i++) {
					const top = parseInt(cacheComp[i].comp.instance.$el.style.top);
					const compData = toRaw(cacheComp[i].comp.instance);
					compData.state.offset = top - removeHeight - 16;
				}
			}
			if (cacheOptionsData.length > 0 && cacheOptionsData[0].onClose) {
				cacheOptionsData[0].onClose();
			}
			document.body.removeChild(container);
		}
	} else {
		idsMap.forEach((item) => {
			const container = document.getElementById(`NMessage-${item}`);
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

const createdMessage = (options: any) => {
	options.clearMessage = clearMessage;

	options = { ...defaultMessageOptions, ...options };

	let _id = null;
	if (options.id) {
		_id = options.id;
		if (idsMap.find((item) => item === options.id)) {
			const compData = cacheComp.find((item) => item.id === options.id);
			return updateMessage(options, compData.comp);
		}
	} else {
		_id = new Date().getTime() + '';
	}

	options.id = _id;

	let offset = options.offset;
	for (let i = 0; i < cacheComp.length; i++) {
		offset += cacheComp[i].comp.instance.$el.offsetHeight + 16;
	}
	options.offset = offset;

	idsMap.push(options.id);
	optsMap.push(options);
	cacheOptions.push(options);

	const devStyle = 'display: flex;justify-content: center;align-items: center;';
	const comp = CreateComponent(options, { wrapper: _message, name: 'NMessage' }, devStyle);

	cacheComp.push({ id: options.id, comp });

	return toRaw(comp.instance);
};

export const Message = {
	showMessage(options: any) {
		return createdMessage(options);
	},
	showMessageLoading(options?: any) {
		return createdMessage({ ...{ content: '加载中...', loading: true }, ...options, id: 'message-loading' });
	},
	hideMessageLoading(id?: string) {
		return clearMessage(id || 'message-loading');
	},
	setGlobleMessageOptions(options: any) {
		return changedefaultMessageOptions(options);
	},
};

declare module 'vue' {
	export interface GlobalComponents {
		nMessage: typeof nMessage;
	}
}
