export const TRACKS = [
{
    id: 1,
    title: 'Dive Muted?',
    artist: "No Song, No Vibe (Miles would disapprove)",
    getCover:()=> import ('../../assets/imgs/cover-songs/dive-muted.webp'),
    getSrc: null,     
},
{
    id: 2,
    title: "What's Up Danger",
    artist: 'Blackway & Black Caviar',
    getCover:()=> import ('../../assets/imgs/cover-songs/whats-up-danger.webp'),
    getSrc: () => import('../../assets/songs/whats-up-danger.mp3'),
},
{
    id: 3,
    title: 'Sunflower',
    artist: 'Post Malone, Swae Lee',
    cover: '/covers/sunflower.jpg',
    getCover:()=> import ('../../assets/imgs/cover-songs/sunflower.webp'),
    getSrc: () => import('../../assets/songs/sunflower.mp3'),
},
{
    id: 4,
    title: 'Annihilate',
    artist: 'Metro Boomin, Swae Lee',
    getCover:()=> import ('../../assets/imgs/cover-songs/annihilate.webp'),
    getSrc: () => import('../../assets/songs/annihilate.mp3'),
},
{
    id: 5,
    title: 'Self Aware',
    artist: 'Temper City',
    getCover:()=> import ('../../assets/imgs/cover-songs/self-aware.webp'),
    getSrc: () => import('../../assets/songs/self-aware.mp3'),
},
];