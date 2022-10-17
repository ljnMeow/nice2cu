import { series, src, dest } from 'gulp';
import { withTaskName, deleteFolderRecursive, run } from 'nice2cu-ui-script/utils';

export default series(
	withTaskName('clearDist', async () => await deleteFolderRecursive('../dist')),
	withTaskName('buildComponents', () => run('vite build', '../')),
	withTaskName('buildLess', async () => {
		src('../src/**/style/**.less').pipe(dest('../dist/es/src')).pipe(dest('../dist/lib/src'));
	}),
	withTaskName('copyThemeChalk', async () => {
		src('../theme-chalk/**').pipe(dest('../dist/es/theme-chalk')).pipe(dest('../dist/lib/theme-chalk'));
	}),
	withTaskName('publicPackageJson', async () => {
		src('./package.json').pipe(dest('../dist'));
	})
);
