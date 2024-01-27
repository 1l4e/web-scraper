
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...args: ClassValue[]) {
	return twMerge(clsx(args));
}

export { cn };

export function hexUrl(url: string) {
	if (!url) return '';
	if (!url.startsWith('http')) return url;
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

export const menu = [
	{ id: 1, name: 'Home', slug: '/' },
	{
		id: 2,
		name: 'Source',
		slug: '/dashboard/source'
	},
	{
		id: 6,
		name: 'Scraper',
		slug: '/dashboard/scraper'
	},
	{ id: 3, name: 'Dashboard', slug: '/dashboard' },
	{ id: 4, name: 'Collection', slug: '/dashboard/collection' }
];


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
export const defaultSource2 = { "csrf": { "name": ["csrf"], "type": ["html"], "children": [{ "name": ["token"], "type": ["attributes"], "multiple": ["false"], "selector": ["content"] }], "multiple": ["false"], "selector": ["[name=\"csrf-token\"]"] }, "home": { "name": ["phim bo", "phim le", "anime"], "type": ["html", "html", "html"], "children": [{ "name": ["Selector"], "type": ["group"], "children": [{ "name": ["Title", "Image", "Link", "Description", "status"], "type": ["text", "image", "url", "text", "text"], "multiple": ["false", "false", "false", "false", "false"], "selector": ["a", "a img", "a", ".noidung h3", ".status"] }], "multiple": ["true"], "selector": [".list-film .item"] }, { "name": ["Selector"], "type": ["group"], "children": [{ "name": ["Title", "Image", "Link", "Description", "status"], "type": ["text", "image", "url", "text", "text"], "multiple": ["false", "false", "false", "false", "false"], "selector": ["a", "a img", "a", ".noidung h3", ".status"] }], "multiple": ["true"], "selector": [".list-film .item"] }, { "name": ["Selector"], "type": ["group"], "children": [{ "name": ["Title", "Image", "Link", "Description", "status"], "type": ["text", "image", "url", "text", "text"], "multiple": ["false", "false", "false", "false", "false"], "selector": ["a", "a img", "a", ".noidung h3", ".status"] }], "multiple": ["true"], "selector": [".list-film .item"] }], "multiple": ["false", "false", "false"], "selector": ["div.update:nth-child(2) > div:nth-child(2)", "div.block:nth-child(4) > div:nth-child(2)", "div.block:nth-child(6) > div:nth-child(2)"] }, "page": { "name": ["Page"], "type": ["url"], "multiple": ["false"], "selector": [".page-numbers"] }, "post": { "name": ["post"], "type": ["url"], "multiple": ["false"], "selector": ["https://phimtm.net/ajax"] }, "parent": { "name": ["infomation", "chapters", "episode"], "type": ["text", "group", "group"], "children": [{ "name": ["title", "subtitle", "date", "label", "tag", "image"], "type": ["text", "text", "text", "text", "url", "image"], "multiple": ["false", "false", "false", "false", "true", "false"], "selector": ["h1", "h2", ".col2 > dl:nth-child(3) > dd:nth-child(20)", ".status", ".col2 > dl:nth-child(3) > dd:nth-child(5)", ".poster img"] }, { "name": ["vietsub"], "type": ["text"], "children": [{ "name": ["link", "title"], "type": ["attributes", "attributes"], "multiple": ["false", "false"], "selector": ["href", "a"] }], "multiple": ["true"], "selector": ["a"] }, { "name": ["server"], "type": ["video"], "children": [{ "name": ["title", "post", "nume"], "type": ["text", "attributes", "attributes"], "multiple": ["false", "false", "false"], "selector": ["span", "data-post", "data-nume"] }], "multiple": ["false"], "selector": ["a"] }], "multiple": ["false", "false", "false"], "selector": [".info-film", ".watch", ".watch__wrapper-server"] }, "search": { "name": ["search", "searchQuery"], "type": ["group", "none"], "children": [{ "name": ["selector"], "type": ["group"], "children": [{ "name": ["title", "link", "image", "description", "status"], "type": ["text", "url", "image", "text", "text"], "multiple": ["false", "false", "false", "false", "false"], "selector": ["a", "a", "a img", ".contenido", ".status"] }], "multiple": ["true"], "selector": [".list-film .item"] }], "multiple": ["false", "false"], "selector": ["div.block-body:nth-child(4)", "tim-kiem/*"] }, "episode": { "name": ["episode", "chapters", "csrf"], "type": ["group", "group", "group"], "children": [{ "name": ["server"], "type": ["video"], "children": [{ "name": ["phimtm", "title"], "type": ["attributes", "text"], "multiple": ["false", "false"], "selector": ["none", "type"] }], "multiple": ["true"], "selector": ["script:nth-child(28)"] }, { "name": ["vietsub", "thuyetminh"], "type": ["html", "text"], "children": [{ "name": ["link", "title"], "type": ["attributes", "attributes"], "multiple": ["false", "false"], "selector": ["href", "title"] }, { "name": ["link", "title"], "type": ["attributes", "attributes"], "multiple": ["false", "false"], "selector": ["href", "title"] }], "multiple": ["true", "false"], "selector": ["div.episodes:nth-child(2) a", "div.episodes:nth-child(5) a"] }, { "name": ["token"], "type": ["attributes"], "multiple": ["false"], "selector": ["content"] }], "multiple": ["false", "false", "true"], "selector": ["head", ".server", "meta[name=\"csrf-token\"]"] }, "category": { "name": ["Selector"], "type": ["group"], "children": [{ "name": ["Title", "Image", "Link", "Description"], "type": ["text", "image", "url", "text"], "multiple": ["false", "false", "false", "false"], "selector": ["h2", "img", "a", "p"] }], "multiple": ["true"], "selector": [".owl-item"] }, "pagination": { "name": ["Left", "right"], "type": ["url", "url"], "multiple": ["false", "false"], "selector": [".owl-prev", ".owl-next"] } }

