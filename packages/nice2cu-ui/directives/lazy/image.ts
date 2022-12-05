import { ImageManagerOptions, LazyState } from './type';
import { imageLoad } from './dom';

export default class ImageManager {
	el: HTMLElement;
	parent: HTMLElement | Window;
	src: string;
	error: string;
	loading: string;
	cache: Set<string>;
	lazyState: LazyState;

	constructor(options: ImageManagerOptions) {
		this.el = options.el;
		this.parent = options.parent;
		this.src = options.src;
		this.error = options.error;
		this.loading = options.loading;
		this.cache = options.cache;
		this.lazyState = LazyState.loading;

		this.render(this.loading);
	}

	load(next?: any): void {
		if (this.lazyState > LazyState.loading) {
			return;
		}
		if (this.cache.has(this.src)) {
			this.lazyState = LazyState.loaded;
			this.render(this.src);
			return;
		}
		this.renderSrc(next);
	}

	isInView(): boolean {
		const rect = this.el.getBoundingClientRect();
		return rect.top < window.innerHeight && rect.left < window.innerWidth;
	}

	update(src: string): void {
		const currentSrc = this.src;
		if (src !== currentSrc) {
			this.src = src;
			this.lazyState = LazyState.loading;
			this.load();
		}
	}

	private renderSrc(next?: any): void {
		imageLoad(this.src)
			.then(() => {
				this.lazyState = LazyState.loaded;
				this.render(this.src);
				this.cache.add(this.src);
				next && next();
			})
			.catch((e) => {
				this.lazyState = LazyState.error;
				this.render(this.error);
				console.warn(`load failed with src image(${this.src}) and the error msg is ${e.message}`);
				next && next();
			});
	}

	private render(src: string): void {
		this.el.setAttribute('src', src);
	}
}
