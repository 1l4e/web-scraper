
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...args: ClassValue[]) {
	return twMerge(clsx(args));
}

export { cn };

export function hexUrl(url: string) {
	return stringToHex(new URL(url).pathname);
}

export const stringToHex = (str: string) => {
	let hex = '';
	for (let i = 0; i < str.length; i++) {
		hex += str.charCodeAt(i).toString(16).padStart(2, '0');
	}
	return hex;
};

export const hexToString = (hex: string) => {
	let str = '';
	for (let i = 0; i < hex.length; i += 2) {
		const byte = parseInt(hex.substr(i, 2), 16);
		str += String.fromCharCode(byte);
	}
	return str;
};

export const defaultTypes = ['text', 'url', 'image', 'video', 'attributes', 'group', 'html', 'none']

export const defaultSelector2 = {
	home: [
		{
			id: 0,
			name: '',
			slug: '',
			selector: '',
			multiple: false,
			type: 'text',
			deleteable: false
		}
	],
	search: [],
	categories: [
		{
			id: 0,
			name: 'Phim moi noi bat',
			slug: '/',
			selector: '#featured-titles',
			multiple: false,
			type: 'text',
			deleteable: true
		},
		{
			id: 1,
			name: 'Phim chieu rap',
			slug: 'https://phimmoiyyy.net/the-loai/phim-chieu-rap',
			selector: '#genre_phim-chieu-rap',
			multiple: false,
			type: 'text',
			deleteable: true
		},
		{
			id: 2,
			name: 'Phim bo',
			slug: 'https://phimmoiyyy.net/the-loai/phim-bo',
			selector: '#dt-tvshows',
			multiple: false,
			type: 'text',
			deleteable: true
		}
	],
	article: [],
	episode: [],
	category: [
		{
			id: 0,
			name: 'Selector',
			selector: '.owl-item',
			multiple: true,
			type: 'group',
			deleteable: false,
			children: [
				{
					id: 0,
					name: 'Title',
					selector: 'h2',
					type: 'text',
					multiple: false,
					deleteable: false
				},
				{
					id: 1,
					name: 'Image',
					selector: 'img',
					type: 'image',
					multiple: false,
					deleteable: false
				},
				{
					id: 2,
					name: 'Link',
					selector: 'a',
					type: 'url',
					multiple: false,
					deleteable: false
				},
				{
					id: 3,
					name: 'Description',
					selector: 'p',
					type: 'text',
					multiple: false,
					deleteable: false
				}
			]
		}
	],
	pagination: [],
	filter: []
}

// export const defaultSource2 = {
// 	home: {
// 		name: [''],
// 		selector: [''],
// 		type: ['text'],
// 		multiple: [false],
// 		deleteable: [false]
// 	},
// 	categories: {
// 		name: ['Phim moi noi bat', 'Phim chieu rap', 'Phim bo'],
// 		selector: ['#featured-titles', '#genre_phim-chieu-rap', '#dt-tvshows'],
// 		type: ['text', 'text', 'text'],
// 		multiple: [false, false, false],
// 		deleteable: [false, false, false]
// 	},
// 	category: {
// 		name: ['Selector'],
// 		selector: ['.owl-item'],
// 		type: ['group'],
// 		multiple: [true],
// 		deleteable: [false],
// 		children: [
// 			{
// 				name: ['Title', 'Image', 'Link', 'Description'],
// 				selector: ['h2', 'img', 'a', 'p'],
// 				type: ['text', 'image', 'url', 'text'],
// 				multiple: [false, false, false, false],
// 				deleteable: [false, false, false, false]
// 			}
// 		]
// 	}
// }
export const defaultSource2 = {
	home: {
		name: ['Phim moi noi bat', 'Phim chieu rap', 'Phim bo'],
		selector: ['#featured-titles', '#genre_phim-chieu-rap', '#dt-tvshows'],
		type: ['html', 'html', 'html'],
		multiple: ["false", "false", "false"],
		deleteable: [false, false, false],
		children: [
			{
				name: ['Selector'],
				selector: ['.owl-item'],
				type: ['group'],
				multiple: ["true"],
				deleteable: [false],
				children: [
					{
						name: ['Title', 'Image', 'Link', 'Description'],
						selector: ['h3 a', 'img', 'a', 'p'],
						type: ['text', 'image', 'url', 'text'],
						multiple: ["false", "false", "false", "false"],
						deleteable: [false, false, false, false]
					}
				]
			},
			{
				name: ['Selector'],
				selector: ['.owl-item'],
				type: ['group'],
				multiple: ["true"],
				deleteable: [false],
				children: [
					{
						name: ['Title', 'Image', 'Link', 'Description'],
						selector: ['h3 a', 'img', 'a', 'p'],
						type: ['text', 'image', 'url', 'text'],
						multiple: ["false", "false", "false", "false"],
						deleteable: [false, false, false, false]
					}
				]
			},
			{
				name: ['Selector'],
				selector: ['.owl-item'],
				type: ['group'],
				multiple: [true],
				deleteable: [false],
				children: [
					{
						name: ['Title', 'Image', 'Link', 'Description'],
						selector: ['h3 a', 'img', 'a', 'p'],
						type: ['text', 'image', 'url', 'text'],
						multiple: ["false", "false", "false", "false"],
						deleteable: [false, false, false, false]
					}
				]
			},
		]

	},
	pagination: {
		name: ['Left', 'right'],
		selector: ['.owl-prev', '.owl-next'],
		type: ['url', 'url'],
		multiple: ["false", "false"],
		deleteable: [false, false],
	},
	page: {
		name: ['Page'],
		selector: ['.page-numbers'],
		type: ['url'],
		multiple: ["false"],
		deleteable: [false],
	},
	category: {
		name: ['Selector'],
		selector: ['.owl-item'],
		type: ['group'],
		multiple: ["true"],
		deleteable: [false],
		children: [
			{
				name: ['Title', 'Image', 'Link', 'Description'],
				selector: ['h2', 'img', 'a', 'p'],
				type: ['text', 'image', 'url', 'text'],
				multiple: ["false", "false", "false", "false"],
				deleteable: [false, false, false, false]
			}
		]
	}
}

