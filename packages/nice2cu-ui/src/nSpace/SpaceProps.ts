import { ExtractPropTypes, PropType } from 'vue';

function directionValidator(direction: string): boolean {
	return ['row', 'column'].includes(direction);
}
function justifyValidator(justify: string): boolean {
	return ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'].includes(justify);
}
function alignValidator(align: string): boolean {
	return ['flex-start', 'center', 'flex-end', 'baseline'].includes(align);
}

export const SpaceProps = {
	direction: {
		type: String as PropType<'row' | 'column'>,
		default: 'row',
		validator: directionValidator,
	},
	justify: {
		type: String as PropType<'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'>,
		default: 'flex-start',
		validator: justifyValidator,
	},
	align: {
		type: String as PropType<'flex-start' | 'center' | 'flex-end' | 'baseline'>,
		default: 'flex-start',
		validator: alignValidator,
	},
	wrap: {
		type: Boolean,
		default: true,
	},
	block: {
		type: Boolean,
		default: true,
	},
	size: {
		type: Array<string | number>,
		default: ['10px', '10px'],
	},
};

export type SpacePropsType = ExtractPropTypes<typeof SpaceProps>;
