import { App, Directive, DirectiveBinding, Plugin } from 'vue';
import { defaultLoadingImg, defaultLoadingError } from './defaultImg';

type LoadingStatus = 'pending' | 'success' | 'error';

interface LazyOptions {
	loading: string;
	error: string;
}

type Lazy = LazyOptions & {
	src: string;
	state: LoadingStatus;
};

type LazyHTMLElement = HTMLElement & { _lazy: Lazy };

export type LazyEventOptions = {
	el: LazyHTMLElement;
	status: string;
	type: string;
};

let observer: IntersectionObserver;

const _observe = (el: LazyHTMLElement, binding: DirectiveBinding) => {
	observer = new IntersectionObserver(
		(entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry: IntersectionObserverEntry) => {
				if (entry.isIntersecting) {
					const img = entry.target as LazyHTMLElement;

					el.setAttribute('src', el._lazy.src);

					img.onload = () => {
						onLoadImg(el, binding);
					};
					img.onerror = () => {
						onErrorImg(el, binding);
					};
				}
			});
		},
		{ rootMargin: '0px', threshold: 0 }
	);
	observer.observe(el);
};

const onLoadImg = (el: LazyHTMLElement, binding: DirectiveBinding) => {
	if (el._lazy.state !== 'pending') return;
	el._lazy.state = 'success';
	el.setAttribute('class', 'n-image__image');
	binding.value.onLoadImg({ el: el, status: el._lazy.state, type: 'lazy' } as LazyEventOptions);
	observer.unobserve(el);
};

const onErrorImg = (el: LazyHTMLElement, binding: DirectiveBinding) => {
	if (el._lazy.state !== 'pending') return;
	el._lazy.state = 'error';
	el.classList.add('n-image__error');
	el.setAttribute('src', el._lazy.error);
	binding.value.onErrorImg({ el: el, status: el._lazy.state, type: 'lazy' } as LazyEventOptions);
	observer.unobserve(el);
};

const Lazy: Directive & Plugin = {
	mounted(el: LazyHTMLElement, binding: DirectiveBinding) {
		el._lazy = {
			src: binding.value.src,
			state: 'pending',
			loading: binding.value.loading ?? defaultLoadingImg,
			error: binding.value.error ?? defaultLoadingError,
		};
		el.classList.add('n-image__pending');
		el.setAttribute('src', el._lazy.loading);
		_observe(el, binding);
	},
	unmounted(el: LazyHTMLElement) {
		observer.unobserve(el);
	},
	install(app: App) {
		app.directive('lazy', this);
	},
};

export const _LazyComponent = Lazy;

export default Lazy;
