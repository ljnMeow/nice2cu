import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue(), vueJsx({})],
	resolve: {
		alias: {
			'@views': resolve(__dirname, './src/views'),
		},
	},
});
