import type { Directive, Plugin, App, DirectiveBinding } from 'vue';
import { createNamespace } from '../../utils/create';
import './style.less';

interface RippleOptions {
	disabled: boolean;
	isRipple: boolean;
}

interface RippleHTMLElement extends HTMLElement {
	_ripple?: RippleOptions;
}

function computeRippleStyles(el: RippleHTMLElement, event: MouseEvent) {
	const { top, left } = el.getBoundingClientRect();
	const { clientWidth, clientHeight } = el;
	const radius = Math.sqrt(clientWidth ** 2 + clientHeight ** 2) / 2;
	const size = radius * 2;
	const localX = event.clientX - left;
	const localY = event.clientY - top;
	const centerX = (clientWidth - radius * 2) / 2;
	const centerY = (clientHeight - radius * 2) / 2;
	const x = localX - radius;
	const y = localY - radius;
	return { x, y, centerX, centerY, size };
}

function createRipple(this: RippleHTMLElement, event: MouseEvent) {
	if (this._ripple?.disabled || !this._ripple?.isRipple) return;

	const { x, y, centerX, centerY, size } = computeRippleStyles(this, event);
	const ripple = document.createElement('div');
	const bem = createNamespace('ripple');
	ripple.classList.add(bem.b());
	ripple.style.opacity = `0`;
	ripple.style.transform = `translate(${x}px, ${y}px) scale3d(.3, .3, .3)`;
	ripple.style.width = `${size}px`;
	ripple.style.height = `${size}px`;
	ripple.dataset.createdAt = String(performance.now());
	this.style.overflow = 'hidden';
	this.style.position = 'relative';
	this.appendChild(ripple);
	window.setTimeout(() => {
		ripple.style.transform = `translate(${centerX}px, ${centerY}px) scale3d(1, 1, 1)`;
		ripple.style.opacity = `.15`;
	});
}

function removeRipple(this: RippleHTMLElement) {
	const ripples: NodeListOf<RippleHTMLElement> = this.querySelectorAll('.n-ripple');

	if (!ripples.length || ripples.length === 0) return;

	const lastRipple: RippleHTMLElement = ripples[ripples.length - 1];
	const delay = 300 - performance.now() + Number(lastRipple.dataset.createdAt);

	setTimeout(() => {
		lastRipple.style.opacity = `0`;
		setTimeout(() => lastRipple.parentNode?.removeChild(lastRipple), 300);
	}, delay);
}

function preventContextMenu(event: MouseEvent) {
	event.preventDefault();
}

const Ripple: Directive & Plugin = {
	mounted(el: RippleHTMLElement, binding: DirectiveBinding) {
		el._ripple = {
			disabled: binding.value.disabled,
			isRipple: binding.value.isRipple,
		};
		el.addEventListener('mousedown', createRipple, { passive: true });
		el.addEventListener('mouseup', removeRipple, { passive: true });
		el.addEventListener('contextmenu', preventContextMenu);
	},
	updated(el: RippleHTMLElement, binding: DirectiveBinding) {
		const newbinding = {
			disabled: binding.value.disabled,
			isRipple: binding.value.isRipple,
		};
		el._ripple = {
			...newbinding,
		};
	},
	unmounted(el: RippleHTMLElement) {
		el.removeEventListener('mousedown', createRipple);
		el.removeEventListener('mouseup', removeRipple);
		el.removeEventListener('contextmenu', preventContextMenu);
	},
	install(app: App) {
		app.directive('ripple', this);
	},
};

export const _RippleComponent = Ripple;

export default Ripple;
