import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { createApp } from 'vue';

import nImage from '../index';
import nImageVue from '../Image.vue';

const src = 'https://varlet.gitee.io/varlet-ui/cat.png';

test('test Image plugin', () => {
	const app = createApp({}).use(nImage);
	expect(app.component((nImage as { name: string }).name)).toBeTruthy();
});
