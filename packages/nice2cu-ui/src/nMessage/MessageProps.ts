/*
 * @Author: linMeow linjinnan1998@sina.com
 * @Date: 2023-11-22 15:22:49
 * @LastEditors: linMeow linjinnan1998@sina.com
 * @LastEditTime: 2023-12-01 15:28:05
 * @FilePath: /nice2cu/packages/nice2cu-ui/src/nMessage/MessageProps.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ExtractPropTypes, PropType, VNode } from 'vue';

const typeValidator = (position: string) => {
	return ['default', 'success', 'warning', 'info', 'error'].includes(position);
};

export const MessageProps = {
	id: {
		type: [String, Number],
		default: '',
	},
	type: {
		type: String as PropType<'default' | 'success' | 'warning' | 'info' | 'error'>,
		default: 'default',
		validator: typeValidator,
	},
	content: {
		type: [String, Function, Object] as PropType<string | VNode | ((h: any) => VNode)>,
		defualt: '',
	},
	duration: {
		type: Number,
		default: 2000,
	},
	customStyle: {
		type: Object,
		default: {},
	},
	offset: {
		type: [String, Number],
		default: 40,
	},
	zIndex: {
		type: Number,
		default: 9999,
	},
	icon: {
		type: String,
		default: '',
	},
	iconSize: {
		type: [String, Number],
		default: '18px',
	},
	iconPrefix: {
		type: String,
		default: 'nice2cu-icon',
	},
	loading: {
		type: Boolean,
		default: false,
	},
	hasMask: {
		type: Boolean,
		default: false,
	},
	maskColor: {
		type: String,
		default: 'transparent',
	},
	clickMaskClose: {
		type: Boolean,
		defult: false,
	},
	wrapper: {
		type: String,
		default: 'body',
	},
	clearMessage: Function,
	onClose: Function,
};

export type MessagePropsType = ExtractPropTypes<typeof MessageProps>;
