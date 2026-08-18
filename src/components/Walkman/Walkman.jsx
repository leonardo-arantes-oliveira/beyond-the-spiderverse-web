import React, { useState, forwardRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'; // 1. Importação adicionada
import walkmanImg from '../../assets/imgs/walkman.webp';
import styles from './Walkman.module.css';
import { useAudio } from '../AudioProvider/AudioProvider';
import Halftone from '../ui/patterns/Halftone/Halftone';
import { TRACKS } from '../../data/audio/tracks';

const Walkman = forwardRef(({ bubbleRef }, ref) => {
const [isOpen, setIsOpen] = useState(false);

const {
    currentTrack,
    coverUrl,
    isPlaying,
    progress,
    togglePlay,
    next,
    prev,
    seek,
} = useAudio();

const handleWalkmanClick = () => {
    gsap.to(ref.current, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 });
    setIsOpen((prev) => !prev);
};

const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio);
};



return (
<div className={styles.container}>
    <img
    ref={ref}
    src={walkmanImg}
    alt="Walkman"
    className={styles.walkmanImage}
    onClick={handleWalkmanClick}
    />

    {isOpen && (
    <div className={styles.bubbleWrapper}>
    <div ref={bubbleRef} className={styles.speechBubble}>
        <Halftone
        dotSize={3}
        gap={6}
        dotColor="rgba(255,255,255,0.3)"
        blendMode="screen"
        opacity={0.5}
        >
        <div className={styles.bubbleContent}>
            {/* 1. Mova a capa para dentro do bubbleContent */}
            <div
            className={styles.cover}
            style={{ backgroundImage: `url(${coverUrl || currentTrack.cover})` }}
            />

            <div className={styles.topRow}>
            <span className={styles.waveIcon}>
                <i /><i /><i /><i />
            </span>
            </div>

            <div className={styles.trackInfo}>
            <h4>{currentTrack.title}</h4>
            <p>{currentTrack.artist}</p>
            </div>

            <button className={styles.playBtn} onClick={togglePlay}>
            {isPlaying ? '❚❚' : '▶'}
            </button>

            <div className={styles.bottomControls}>
            <button onClick={prev} aria-label="Faixa anterior">⏮</button>

            <div className={styles.progressBar} onClick={handleSeek}>
                <div
                className={styles.progressFill}
                style={{ width: `${progress * 100}%` }}
                />
            </div>

            <button onClick={next} aria-label="Próxima faixa">⏭</button>
            <button aria-label="Adicionar à fila">≡+</button>
            <button aria-label="Favoritar">♡</button>
            </div>
        </div>
        </Halftone>
    </div>
    </div>
    )}
</div>
);
});

Walkman.displayName = 'Walkman';
export default Walkman;