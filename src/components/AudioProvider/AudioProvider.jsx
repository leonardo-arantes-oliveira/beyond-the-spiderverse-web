import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const AudioContext = createContext(null);

export const TRACKS = [
{
    id: 1,
    title: "What's Up Danger",
    artist: 'Blackway & Black Caviar',
    cover: '/covers/whats-up-danger.jpg',
    src: '/audio/whats-up-danger-cut.mp3', // já é o trecho picotado
},
{
    id: 2,
    title: 'Sunflower',
    artist: 'Post Malone, Swae Lee',
    cover: '/covers/sunflower.jpg',
    src: '/audio/sunflower-cut.mp3',
},
// ...
];

export function AudioProvider({ children }) {
const audioRef = useRef(null);
const [currentIndex, setCurrentIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [progress, setProgress] = useState(0);

const currentTrack = TRACKS[currentIndex];

const selectTrack = useCallback((index) => {
    setCurrentIndex(index);
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = TRACKS[index].src;
    audio.play();
    setIsPlaying(true);
}, []);

const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
    audio.play();
    setIsPlaying(true);
    } else {
    audio.pause();
    setIsPlaying(false);
    }
}, []);

const next = useCallback(() => {
    selectTrack((currentIndex + 1) % TRACKS.length);
}, [currentIndex, selectTrack]);

const prev = useCallback(() => {
    selectTrack((currentIndex - 1 + TRACKS.length) % TRACKS.length);
}, [currentIndex, selectTrack]);

const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    setProgress(audio.currentTime / audio.duration);
};

return (
    <AudioContext.Provider
    value={{
        currentTrack,
        currentIndex,
        isPlaying,
        progress,
        selectTrack,
        togglePlay,
        next,
        prev,
    }}
    >
    <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={next} />
    {children}
    </AudioContext.Provider>
);
}

export const useAudio = () => useContext(AudioContext);