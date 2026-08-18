export const TRACKS = [
{
    id: 1,
    title: 'Dive Muted?',
    artist: "No Song, No Vibe (Miles would disapprove)",
    cover: null,      
    getSrc: null,     
},
{
    id: 2,
    title: "What's Up Danger",
    artist: 'Blackway & Black Caviar',
    cover: '/covers/whats-up-danger.jpg',
    getSrc: () => import('../../assets/songs/whats-up-danger.mp3'),
},
{
    id: 3,
    title: 'Sunflower',
    artist: 'Post Malone, Swae Lee',
    cover: '/covers/sunflower.jpg',
    getSrc: () => import('../../assets/songs/sunflower.mp3'),
},
{
    id: 4,
    title: 'Annihilate',
    artist: 'Metro Boomin, Swae Lee',
    cover: '/covers/annihilate.jpg',
    getSrc: () => import('../../assets/songs/annihilate.mp3'),
},
{
    id: 5,
    title: 'Self Aware',
    artist: 'Chase Atlantic',
    cover: '/covers/self-aware.jpg',
    getSrc: () => import('../../assets/songs/self-aware.mp3'),
},
];