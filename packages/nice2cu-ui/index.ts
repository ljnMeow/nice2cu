import type { App } from 'vue';
import * as components from './src';
export * from './src';
export default {
	install: (app: App) => {
		for (const comp in components) {
			// console.log('comp', (components as any)[comp].name, (components as any)[comp]);
			app.component((components as any)[comp].name, (components as any)[comp]);
		}
	},
};
