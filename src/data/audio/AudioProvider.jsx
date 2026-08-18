import React, {
createContext,
useContext,
useRef,
useState,
useCallback,
} from 'react';
import { TRACKS } from './tracks';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
const audioRef = useRef(null);
const srcCache = useRef(new Map()); // id -> url já resolvida, evita rebaixar
const [currentIndex, setCurrentIndex] = useState(0); // começa mudo (id 1)
const [isPlaying, setIsPlaying] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [progress, setProgress] = useState(0);

const currentTrack = TRACKS[currentIndex];

const selectTrack = useCallback(async (index) => {
    const track = TRACKS[index];
    setCurrentIndex(index);

    const audio = audioRef.current;
    if (!audio) return;

    // faixa muda — não tem o que baixar, não gasta rede nem processamento
    if (!track.getSrc) {
    audio.pause();
    audio.removeAttribute('src');
    setIsPlaying(false);
    setProgress(0);
    return;
    }

    setIsLoading(true);

    // lazy load real: só baixa quando essa faixa é selecionada,
    // e só baixa 1x — depois fica em cache no Map
    let url = srcCache.current.get(track.id);
    if (!url) {
    const mod = await track.getSrc();
    url = mod.default; // Vite/Webpack resolvem o import como URL do asset
    srcCache.current.set(track.id, url);
    }

    audio.src = url;
    setIsLoading(false);
    audio.play();
    setIsPlaying(true);
}, []);

const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    const track = TRACKS[currentIndex];
    if (!audio || !track.getSrc) return; // faixa muda: botão não faz nada

    if (audio.paused) {
    audio.play();
    setIsPlaying(true);
    } else {
    audio.pause();
    setIsPlaying(false);
    }
}, [currentIndex]);

const next = useCallback(() => {
    selectTrack((currentIndex + 1) % TRACKS.length);
}, [currentIndex, selectTrack]);

const prev = useCallback(() => {
    selectTrack((currentIndex - 1 + TRACKS.length) % TRACKS.length);
}, [currentIndex, selectTrack]);

const seek = useCallback((ratio) => {
    const audio = audioRef.current;
    if (audio?.duration) audio.currentTime = ratio * audio.duration;
}, []);

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
        isLoading,
        progress,
        selectTrack,
        togglePlay,
        next,
        prev,
        seek,
        tracks: TRACKS,
    }}
    >
    <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={next} />
    {children}
    </AudioContext.Provider>
);
}

export const useAudio = () => useContext(AudioContext);