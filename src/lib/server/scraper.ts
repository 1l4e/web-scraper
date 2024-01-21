
const phimmoichill = {
    id: "1",
    title: "PhimmoiYYY",
    image: "https://phimmoiyyy.net/wp-content/uploads/2023/03/phimmoi.png",
    data: {
        home: {
            categories: [{
                id: "1",
                title: 'header h2',
                slug: '.see-all',
                selector: '#slider-movies-tvshows',

            }, {
                id: "2",
                title: 'header h2',
                slug: '.see-all',
                selector: '#featured-titles',
            },
            {
                id: "3",
                title: 'header h2',
                slug: '.see-all',
                selector: '#genre_phim-chieu-rap',
            },
            {
                id: "4",
                title: "header h2",
                slug: '.see-all',
                selector: '#dt-tvshows',
            },
            {
                id: "5",
                title: "header h2",
                slug: '.see-all',
                selector: '#dt-movies',
            }
            ]
        },
        search: {

        },
        article: {

        },
        chapter: [

        ],
        category: {
            selector: '.owl-item',
            image: '.poster img',
            type: '1',
            name: '',

        },
        pagination: {

        },
        filter: {

        }

    }
}

const defaultSource = [
    {
        id: 0,
        name: 'Home',
        slug: 'home',
        selector: '',
        multiple: false,
        type: 'text',
        deleteable: false
    },
    {
        id: 1,
        name: 'Search',
        slug: 'search',
        selector: '',
        multiple: false,
        type: 'text',
        deleteable: false
    },
    {
        id: 2,
        name: 'Categories',
        slug: 'categories',
        selector: '',
        multiple: false,
        type: 'group',
        deleteable: false
    },
    {
        id: 3,
        name: 'Article',
        slug: 'article',
        selector: '',
        multiple: false,
        type: 'text',
        deleteable: false
    },
    {
        id: 4,
        name: 'Episode',
        slug: 'episode',
        selector: '',
        multiple: false,
        type: 'text',
        children: [
            { id: 0, name: 'Name', slug: 'name', selector: '', multiple: false, type: 'text' },
            { id: 1, name: 'Image', slug: 'image', selector: '', multiple: false, type: 'image' },
            {
                id: 2,
                name: 'Description',
                slug: 'description',
                selector: '',
                multiple: false,
                type: 'text'
            },
            { id: 3, name: 'Duration', slug: 'duration', selector: '', multiple: false, type: 'text' },
            { id: 4, name: 'Link', slug: 'link', selector: '', multiple: false, type: 'url' },
            { id: 5, name: 'Category', slug: 'category', selector: '', multiple: true, type: 'text' },
            {
                id: 6,
                name: 'Pagination',
                slug: 'pagination',
                selector: '',
                multiple: false,
                type: 'text'
            },
            { id: 7, name: 'Filter', slug: 'filter', selector: '', multiple: false, type: 'text' },
            { id: 8, name: 'Season', slug: 'season', selector: '', multiple: false, type: 'text' },
            { id: 9, name: 'Episode', slug: 'episode', selector: '', multiple: false, type: 'text' }
        ],
        deleteable: false
    },
    {
        id: 5,
        name: 'Category',
        slug: 'category',
        selector: '',
        multiple: true,
        type: 'text',
        deleteable: false
    },
    {
        id: 6,
        name: 'Pagination',
        slug: 'pagination',
        selector: '',
        multiple: false,
        type: 'text',
        deleteable: false
    },
    {
        id: 7,
        name: 'Filter',
        slug: 'filter',
        selector: '',
        multiple: false,
        type: 'text',
        deleteable: false
    }
]
export default { defaultSource ,phimmoichill }
