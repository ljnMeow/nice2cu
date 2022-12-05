import { App, Directive, Plugin } from 'vue';
import { LazyOptions } from './type';
import Lazy from './lazy';

const lazyPlugin: Directive & Plugin = {
	install(app: App, options: LazyOptions) {
		const lazy = new Lazy(options);

		app.directive('lazy', {
			mounted: lazy.add.bind(lazy),
			updated: lazy.update.bind(lazy),
			unmounted: lazy.update.bind(lazy),
		});
	},
};

export const _LazyComponent = lazyPlugin;

export default lazyPlugin;
