import { expect, test } from 'vitest';
import { createApp } from 'vue';

document.body.innerHTML = '<script></script>';

import nDialog from '../index';

test('test Dialog plugin', () => {
	const app = createApp({}).use(nDialog);
	expect(app.component(nDialog.name)).toBeTruthy();
});
