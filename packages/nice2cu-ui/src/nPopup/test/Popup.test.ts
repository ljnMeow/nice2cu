import { expect, test } from 'vitest';
import { createApp } from 'vue';

import nPopup from '../index';

test('test Popup plugin', () => {
	const app = createApp({}).use(nPopup);
	expect(app.component(nPopup.name)).toBeTruthy();
});
