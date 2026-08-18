import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import styles from './DiveButton.module.css';
import Halftone from '../ui/patterns/Halftone/Halftone';

const DiveButton = forwardRef(({ onClick, label = 'Dive in Experience' }, ref) => {
const innerRef = useRef(null);

useImperativeHandle(ref, () => innerRef.current);

const handleClick = (e) => {
    if (innerRef.current) {
    gsap.to(innerRef.current, {
        scale: 0.92,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
    });
    }
    onClick?.(e);
};

return (
    <button ref={innerRef} className={styles.diveButton} onClick={handleClick}>
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
});

DiveButton.displayName = 'DiveButton';

export default DiveButton;