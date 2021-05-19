import ExampleProfilePicture from '../data/images/doge.jpg';

const currentDate = new Date();
const user        = {
    name:           'John Doe',
    profilePicture: ExampleProfilePicture,
    currentTokens:  500,
};

const examplePreviewBgImage = 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/10/28/47151ddd-f5ad-48d9-a24a-6189a647cc1f/redbullrampage_2019_utah_landscape_hero';
const exampleEventImage     = 'https://media-cdn.tripadvisor.com/media/photo-s/0e/85/8d/53/red-bull-flugtag-event.jpg';
const exampleBetImage       = 'https://static.dw.com/image/57473723_303.jpg';

const slides = [
    {
        src:  examplePreviewBgImage,
        text: 'RedBull Rampage 2021 LIVE',
        tags: ['#sports', '#redbull'],
    },
    {
        src:  'https://i.ytimg.com/vi/cbqvm1nvJD4/maxresdefault.jpg',
        text: 'RedBull Rampage 2021 LIVE 2',
        tags: ['#sports', '#test'],
    },
    {
        src:  'https://cdn.brujulabike.com/media/15349/conversions/unknown-620-unknown-620-1600.jpg',
        text: 'RedBull Rampage 2021 LIVE 3',
        tags: ['#sports', '#test2'],
    },
];

export default  {
    currentDate,
    user,
    examplePreviewBgImage,
    exampleEventImage,
    exampleBetImage,
    slides,
};