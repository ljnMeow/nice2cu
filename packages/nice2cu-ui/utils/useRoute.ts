import { getCurrentInstance, type PropType, type ExtractPropTypes, type ComponentPublicInstance } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

export const routeProps = {
	link: [String, Object] as PropType<RouteLocationRaw>,
	url: String,
	replace: Boolean,
};

export type RouteProps = ExtractPropTypes<typeof routeProps>;

export function route({ link, url, replace, $router: router }: ComponentPublicInstance<RouteProps>) {
	if (link && router) {
		router[replace ? 'replace' : 'push'](link);
	} else if (url) {
		replace ? window.location.replace(url) : (window.location.href = url);
	}
}

export function useRoute() {
	const vm = getCurrentInstance()?.proxy as ComponentPublicInstance<RouteProps>;
	return () => route(vm);
}
