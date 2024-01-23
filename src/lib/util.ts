
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
	"csrf": {
		"name": [
			"csrf"
		],
		"type": [
			"html"
		],
		"children": [
			{
				"name": [
					"token"
				],
				"type": [
					"attributes"
				],
				"multiple": [
					"false"
				],
				"selector": [
					"content"
				]
			}
		],
		"multiple": [
			"false"
		],
		"selector": [
			"[name=\"csrf-token\"]"
		]
	},
	"home": {
		"name": [
			"Anime AZ",
			"Anime HOT",
			"Anime moi"
		],
		"type": [
			"html",
			"html",
			"html"
		],
		"children": [
			{
				"name": [
					"Selector"
				],
				"type": [
					"group"
				],
				"children": [
					{
						"name": [
							"Title",
							"Image",
							"Link",
							"Description"
						],
						"type": [
							"text",
							"image",
							"url",
							"text"
						],
						"multiple": [
							"false",
							"false",
							"false",
							"false"
						],
						"selector": [
							"h3 a",
							"img",
							"h3 a",
							".noidung h3"
						]
					}
				],
				"multiple": [
					"true"
				],
				"selector": [
					".film_item"
				]
			},
			{
				"name": [
					"Selector"
				],
				"type": [
					"group"
				],
				"children": [
					{
						"name": [
							"Title",
							"Image",
							"Link",
							"Description"
						],
						"type": [
							"text",
							"image",
							"url",
							"text"
						],
						"multiple": [
							"false",
							"false",
							"false",
							"false"
						],
						"selector": [
							"h3 a",
							"img",
							"h3 a",
							".noidung h3"
						]
					}
				],
				"multiple": [
					"true"
				],
				"selector": [
					".film_item"
				]
			},
			{
				"name": [
					"Selector"
				],
				"type": [
					"group"
				],
				"children": [
					{
						"name": [
							"Title",
							"Image",
							"Link",
							"Description"
						],
						"type": [
							"text",
							"image",
							"url",
							"text"
						],
						"multiple": [
							"false",
							"false",
							"false",
							"false"
						],
						"selector": [
							"h3 a",
							"img",
							"h3 a",
							".noidung h3"
						]
					}
				],
				"multiple": [
					"true"
				],
				"selector": [
					".film_item"
				]
			}
		],
		"multiple": [
			"false",
			"false",
			"false"
		],
		"selector": [
			".anime .film-list",
			".cartoon .film-list",
			".sieu-nhan .film-list"
		]
	},
	"page": {
		"name": [
			"Page"
		],
		"type": [
			"url"
		],
		"multiple": [
			"false"
		],
		"selector": [
			".page-numbers"
		]
	},
	"post": {
		"name": [
			"post"
		],
		"type": [
			"url"
		],
		"multiple": [
			"false"
		],
		"selector": [
			"https://animetvn3.com/ajax/getExtraLinks"
		]
	},
	"parent": {
		"name": [
			"infomation",
			"chapters",
			"episode"
		],
		"type": [
			"text",
			"group",
			"group"
		],
		"children": [
			{
				"name": [
					"title",
					"subtitle",
					"date",
					"label",
					"tag",
					"image"
				],
				"type": [
					"text",
					"text",
					"text",
					"text",
					"url",
					"image"
				],
				"multiple": [
					"false",
					"false",
					"false",
					"false",
					"true",
					"false"
				],
				"selector": [
					".name h2",
					".name h3",
					"li.has-color:nth-child(5)",
					"li.has-color:nth-child(2)",
					"li.has-color:nth-child(1) a",
					".small_img img"
				]
			},
			{
				"name": [
					"vietsub"
				],
				"type": [
					"text"
				],
				"children": [
					{
						"name": [
							"link",
							"title"
						],
						"type": [
							"attributes",
							"attributes"
						],
						"multiple": [
							"false",
							"false"
						],
						"selector": [
							"href",
							"a"
						]
					}
				],
				"multiple": [
					"true"
				],
				"selector": [
					"a"
				]
			},
			{
				"name": [
					"server"
				],
				"type": [
					"video"
				],
				"children": [
					{
						"name": [
							"title",
							"post",
							"nume"
						],
						"type": [
							"text",
							"attributes",
							"attributes"
						],
						"multiple": [
							"false",
							"false",
							"false"
						],
						"selector": [
							"span",
							"data-post",
							"data-nume"
						]
					}
				],
				"multiple": [
					"false"
				],
				"selector": [
					"a"
				]
			}
		],
		"multiple": [
			"false",
			"false",
			"false"
		],
		"selector": [
			".info-play-wrap",
			".latest_eps",
			".watch__wrapper-server"
		]
	},
	"episode": {
		"name": [
			"episode",
			"chapters",
			"csrf"
		],
		"type": [
			"group",
			"group",
			"group"
		],
		"children": [
			{
				"name": [
					"server"
				],
				"type": [
					"video"
				],
				"children": [
					{
						"name": [
							"animetvn",
							"title"
						],
						"type": [
							"attributes",
							"attributes"
						],
						"multiple": [
							"false",
							"false"
						],
						"selector": [
							"value",
							"type"
						]
					}
				],
				"multiple": [
					"true"
				],
				"selector": [
					"input.hidden:nth-child(2)"
				]
			},
			{
				"name": [
					"vietsub"
				],
				"type": [
					"html"
				],
				"children": [
					{
						"name": [
							"link",
							"title"
						],
						"type": [
							"attributes",
							"attributes"
						],
						"multiple": [
							"false",
							"false"
						],
						"selector": [
							"href",
							"a"
						]
					}
				],
				"multiple": [
					"true"
				],
				"selector": [
					"a"
				]
			},
			{
				"name": [
					"token"
				],
				"type": [
					"attributes"
				],
				"multiple": [
					"false"
				],
				"selector": [
					"content"
				]
			}
		],
		"multiple": [
			"false",
			"false",
			"true"
		],
		"selector": [
			"div.col-md-12:nth-child(10)",
			".svep",
			"meta[name=\"csrf-token\"]"
		]
	},
	"category": {
		"name": [
			"Selector"
		],
		"type": [
			"group"
		],
		"children": [
			{
				"name": [
					"Title",
					"Image",
					"Link",
					"Description"
				],
				"type": [
					"text",
					"image",
					"url",
					"text"
				],
				"multiple": [
					"false",
					"false",
					"false",
					"false"
				],
				"selector": [
					"h2",
					"img",
					"a",
					"p"
				]
			}
		],
		"multiple": [
			"true"
		],
		"selector": [
			".owl-item"
		]
	},
	"pagination": {
		"name": [
			"Left",
			"right"
		],
		"type": [
			"url",
			"url"
		],
		"multiple": [
			"false",
			"false"
		],
		"selector": [
			".owl-prev",
			".owl-next"
		]
	}
}

