/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';
export default defineConfig({
	build: {
		target: 'modules',
		outDir: 'dist',
		minify: true,
		cssCodeSplit: false,
		rollupOptions: {
			external: ['vue', /\.less/],
			input: ['index.ts'],
			output: [
				{
					format: 'es',
					entryFileNames: '[name].js',
					preserveModules: true,
					exports: 'named',
					dir: resolve(__dirname, './dist/es'),
				},
				{
					format: 'cjs',
					entryFileNames: '[name].js',
					preserveModules: true,
					exports: 'named',
					dir: resolve(__dirname, './dist/lib'),
				},
			],
		},
		lib: {
			entry: './index.ts',
			name: 'evelynn-ui',
		},
	},
	plugins: [
		eslint({
			exclude: ['**/src/**/assets/**'],
		}),
		vue(),
		dts({
			outputDir: [resolve(__dirname, './dist/es'), resolve(__dirname, './dist/lib')],
			tsConfigFilePath: '../../tsconfig.json',
		}),
	],
	test: {
		globals: true,
		environment: 'happy-dom',
		// 支持tsx组件
		transformMode: {
			web: [/.[tj]sx$/],
		},
		coverage: {
			reporter: ['text', 'json', 'html'],
		},
	},
});
