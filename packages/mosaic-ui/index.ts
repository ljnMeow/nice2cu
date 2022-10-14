import type { App } from 'vue';
import * as components from './src';
export * from './src';
export default {
	install: (app: App) => {
		for (const comp in components) {
			app.component((components as any)[comp].name, (components as any)[comp]);
		}
	},
};
