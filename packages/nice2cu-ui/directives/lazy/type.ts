export interface LazyOptions {
	loading?: string;
	error?: string;
}

export interface ImageManagerOptions {
	el: HTMLElement;
	parent: HTMLElement | Window;
	src: string;
	error: string;
	loading: string;
	cache: Set<string>;
}

export interface Target {
	el: HTMLElement | Window;
	ref: number;
}

export enum LazyState {
	loading,
	loaded,
	error,
}
