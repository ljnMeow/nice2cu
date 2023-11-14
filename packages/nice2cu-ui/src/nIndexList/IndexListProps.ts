import { ExtractPropTypes, PropType } from 'vue';

export type IndexListData = {
	name: string;
	key: string;
	[key: string]: unknown;
};

export type IndexList = {
	title: string;
	list: IndexListData[];
}[];

export const IndexListProps = {
	indexList: {
		type: Array as unknown as PropType<IndexList>,
		default: () => [],
	},
	height: {
		type: [String, Number] as PropType<string | number>,
		default: '600px',
	},
	titleSticky: {
		type: Boolean,
		default: false,
	},
	hideBar: {
		type: Boolean,
		default: false,
	},
	highlightColor: {
		type: String,
		default: '#3a7afe',
	},
} as const;

export type IndexListPropsType = ExtractPropTypes<typeof IndexListProps>;
