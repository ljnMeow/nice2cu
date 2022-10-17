import { series } from 'gulp';
import { withTaskName, run } from 'nice2cu-ui-script/utils';

export default series(
	withTaskName('upgrade npm version', () => run('pnpm version patch', '../build')),
	withTaskName('buildComponents', () => run('pnpm run build', '../')),
	withTaskName('publish comp', () => run('npm publish', '../dist'))
);
