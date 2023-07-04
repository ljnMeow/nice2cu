/*
 * @Author: linMeow linjinnan1998@sina.com
 * @Date: 2022-11-26 13:35:08
 * @LastEditors: linMeow linjinnan1998@sina.com
 * @LastEditTime: 2023-07-03 17:19:45
 * @FilePath: /nice2cu/packages/nice2cu-ui/src/nLoading/LoadingProps.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ExtractPropTypes, PropType } from 'vue';

export function typeValidator(type: string): boolean {
	return ['circle', 'time', 'wave', 'point', 'rever', 'bounce', 'battery'].includes(type);
}

export function sizeValidator(type: string): boolean {
	return ['mini', 'normal', 'small', 'large'].includes(type);
}

export const LoadingProps = {
	type: {
		type: String as PropType<'circle' | 'time' | 'wave' | 'point' | 'rever' | 'bounce' | 'battery'>,
		default: 'circle',
		validator: typeValidator,
	},
	color: {
		type: String,
	},
	loading: {
		type: Boolean,
		default: true,
	},
	size: {
		type: String as PropType<'mini' | 'normal' | 'small' | 'large'>,
		default: 'normal',
	},
	text: {
		type: String,
		default: '',
	},
	parallel: {
		type: Boolean,
		default: false,
	},
	loadingAbsolute: {
		type: Boolean,
		default: true,
	},
	showMask: {
		type: Boolean,
		default: true,
	},
};

export type LoadingPropsType = ExtractPropTypes<typeof LoadingProps>;
