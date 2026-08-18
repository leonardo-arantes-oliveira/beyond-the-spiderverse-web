import React, { useRef } from 'react';
import gsap from 'gsap';
import styles from './DiveButton.module.css';
import Halftone from '../ui/patterns/Halftone/Halftone';

const DiveButton = ({ onClick, label = 'Botão Saltar' }) => {
const btnRef = useRef(null);

const handleClick = () => {
    gsap.to(btnRef.current, {
    scale: 0.92,
    duration: 0.08,
    yoyo: true,
    repeat: 1,
    ease: 'power1.inOut',
    });
    onClick?.(); // por enquanto não faz nada — vem depois
};

return (
    <button ref={btnRef} className={styles.diveButton} onClick={handleClick}>
    <Halftone
        dotSize={3}
        gap={6}
        dotColor="rgba(0,0,0,0.35)"
        blendMode="multiply"
        opacity={0.5}
    >
        <span className={styles.label}>{label}</span>
    </Halftone>
    </button>
);
};

export default DiveButton;