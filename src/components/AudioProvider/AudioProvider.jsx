import React, {
createContext,
useContext,
useRef,
useState,
useCallback,
useEffect,
} from 'react'; 
import style from './AudioProvider.module.css'
import { TRACKS } from '../../data/audio/tracks';


const AudioContext = createContext(null);

export function AudioProvider({ children }) {
const audioRef = useRef(null);
const srcCache = useRef(new Map()); 
const coverCache = useRef(new Map());

const [currentIndex, setCurrentIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [progress, setProgress] = useState(0);
const [coverUrl, setCoverUrl] = useState('');

const currentTrack = TRACKS[currentIndex];

useEffect(() => {
    let isMounted = true;
    const track = TRACKS[currentIndex];

    if (!track?.getCover) {
    setCoverUrl(track?.cover || '');
    return;
    }

    if (coverCache.current.has(track.id)) {
    setCoverUrl(coverCache.current.get(track.id));
    return;
    }

    track.getCover().then((mod) => {
    if (isMounted) {
        const url = mod.default;
        coverCache.current.set(track.id, url);
        setCoverUrl(url);
    }
    });

    return () => {
    isMounted = false;
    };
}, [currentIndex]);

useEffect(() => {
    return () => {
    srcCache.current.forEach((url) => URL.revokeObjectURL(url));
    srcCache.current.clear();
    };
}, []); // <- array vazio = só roda o cleanup quando o AudioProvider desmontar de vez

const selectTrack = useCallback(async (index) => {
  const audio = audioRef.current;
  if (!audio) return;

  const track = TRACKS[index];

  if (!track.getSrc) {
    setCurrentIndex(index);
    audio.pause();
    audio.removeAttribute('src');
    setIsPlaying(false);
    setProgress(0);
    return;
  }

  setIsLoading(true);

  let blobUrl = srcCache.current.get(track.id);
  if (!blobUrl) {
    const mod = await track.getSrc();          
    const response = await fetch(mod.default);  
    const blob = await response.blob();
    blobUrl = URL.createObjectURL(blob);       
    srcCache.current.set(track.id, blobUrl);
  }

  audio.src = blobUrl;
  setCurrentIndex(index);
  setIsLoading(false);
  audio.play();
  setIsPlaying(true);
}, []);

const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    const track = TRACKS[currentIndex];
    if (!audio || !track.getSrc) return;

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
        coverUrl,
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