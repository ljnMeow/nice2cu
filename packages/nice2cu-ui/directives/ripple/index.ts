import type { Directive, Plugin, App } from 'vue';

const Ripple: Directive & Plugin = {
	mounted(el) {
		el.addEventListener('click', function (e: MouseEvent) {
			const x = e.clientX - el.offsetLeft;
			const y = e.clientY - el.offsetTop;

			//在鼠标位置增加一个span标签
			const span = document.createElement('span');
			span.style.position = 'absolute';
			span.style.background = 'rgba(150, 91, 91, .5)';
			span.style.opacity = '1';
			span.style.borderRadius = '50%';
			el.append(span);
			let width = 0;
			let height = 0;
			let opacity = 1;
			const max_length = Math.sqrt(el.offsetWidth * el.offsetWidth + el.offsetHeight * el.offsetHeight) * 2;

			let time: null | NodeJS.Timeout = setInterval(() => {
				width += 5;
				height += 5;
				opacity -= 0.01;
				//判断超出最大值时，清除定时，并且删除span
				if (width < max_length) {
					span.style.width = width + 'px';
					span.style.height = height + 'px';
					span.style.opacity = String(opacity);
					span.style.left = x - span.offsetWidth / 2 + 'px';
					span.style.top = y - span.offsetHeight / 2 + 'px';
				} else {
					clearInterval(time as NodeJS.Timeout);
					time = null;
					span.remove();
				}
			}, 10);
		});
	},
	install(app: App) {
		app.directive('ripple', this);
	},
};

export const _RippleComponent = Ripple;

export default Ripple;
