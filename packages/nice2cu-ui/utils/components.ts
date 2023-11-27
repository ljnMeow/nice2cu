import { createApp, Component } from 'vue';
import { isString, isFunction } from './tools';

export const CreateComponent = (options: any, component: any, style?: string) => {
	let elWrap: HTMLElement = document.body;
	const wrapperContainer = (options.wrapper as string) || 'body';

	if (wrapperContainer != 'body') {
		if (isString(wrapperContainer)) {
			elWrap = document.querySelector(wrapperContainer) as HTMLElement;
		} else {
			elWrap = options.wrapper as HTMLElement;
		}
	}

	const div = document.createElement('div');
	const name = component.name ? component.name + '-' : '';
	const id = options.id || new Date().getTime();
	div.id = name + id;
	div.setAttribute('style', style || '');

	let Wrapper = {};

	if (isFunction(component.wrapper)) {
		Wrapper = component.wrapper(elWrap, div);
	} else {
		Wrapper = component.wrapper;
	}

	const instance: Component = createApp(Wrapper, options);

	const componens = component.components;

	componens &&
		componens.forEach((comp: Component) => {
			instance.use(comp);
		});
	elWrap.appendChild(div);

	return {
		instance: instance.mount(div),
		options: options,
		unmount: () => {
			instance.unmount();
			elWrap.removeChild(div);
		},
	};
};
