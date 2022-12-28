import { expect, test } from 'vitest';
import { createApp } from 'vue';

import nImage from '../index';

test('test Image plugin', () => {
	const app = createApp({}).use(nImage);
	expect(app.component((nImage as { name: string }).name)).toBeTruthy();
});
