import { toRaw, toRefs } from 'vue';
import _dialog from './Dialog.vue';
import { withInstall } from '../../utils/withInstall';
import { CreateComponent } from '../../utils/components';

const nDialog = withInstall(_dialog);

let defaultDialogOptions = {
	id: '',
	visible: false,
	wrapper: 'body',
	width: '',
	title: '',
	content: '',
	round: true,
	showCancelButton: false,
	cancelButtonText: '取消',
	cancelButtonColor: '#000000',
	cancelButtonDisabled: false,
	showConfirmButton: true,
	confirmButtonText: '确定',
	confirmButtonColor: '#1989fa',
	confirmButtonDisabled: false,
	showMask: true,
	maskClickClose: false,
	maskClass: '',
	maskStyle: {},
	beforeClose: null,
	zIndex: 2000,
	transition: '',
	footer: true,
	clearDialog: null,

	onConfirm: null,
	onCancel: null,
	onDialogOpen: null,
	onDialogOpened: null,
	onDialogClose: null,
	onDialogClosed: null,
};
let cacheOptions: any[] = [];
let cacheComp: any[] = [];
let idsMap: string[] = [];
let optsMap: any[] = [];

export default nDialog;

export { nDialog };

const setDefaultDialogOptions = (options: any) => {
	defaultDialogOptions = { ...defaultDialogOptions, ...options };
};

const clearDialog = (id?: string) => {
	if (id) {
		const container = document.getElementById(`NDialog-${id}`);
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
			const container = document.getElementById(`NDialog-${item}`);
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

const updateDialog = (options: any, comp: any) => {
	const container = document.getElementById(`NDialog-${options.id}`);
	if (container) {
		const currentOpt = optsMap.find((item) => item.id === options.id);
		if (currentOpt) {
			options = { ...defaultDialogOptions, ...currentOpt, ...options };
		} else {
			options = { ...defaultDialogOptions, ...options };
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

const createdDialog = (options: any) => {
	options.clearDialog = clearDialog;

	options = { ...defaultDialogOptions, ...options };

	let _id = null;
	if (options.id) {
		_id = options.id;
		if (idsMap.find((item) => item === options.id)) {
			const compData = cacheComp.find((item) => item.id === options.id);
			return updateDialog(options, compData.comp);
		}
	} else {
		_id = new Date().getTime() + '';
	}

	options.id = _id;
	options.wrapper = `#NDialog-${_id}`;

	idsMap.push(options.id);
	optsMap.push(options);
	cacheOptions.push(options);

	const comp = CreateComponent(options, { wrapper: _dialog, name: 'NDialog', teleport: true });

	cacheComp.push({ id: options.id, comp });

	return toRaw(comp.instance);
};

export const Dialog = {
	showDialog(options: any) {
		const dialog = createdDialog(options);
		dialog.visible = true;
		return dialog;
	},
	showConfirmDialog(options: any) {
		const dialog = createdDialog(options);
		dialog.showCancelButton = true;
		dialog.visible = true;
		return dialog;
	},
	closeDialog(id?: string) {
		return clearDialog(id);
	},
	setGlobleDialogOptions(options: any) {
		return setDefaultDialogOptions(options);
	},
};

declare module 'vue' {
	export interface GlobalComponents {
		nDialog: typeof nDialog;
	}
}
