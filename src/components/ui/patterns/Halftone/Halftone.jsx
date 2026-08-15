import React, { forwardRef } from 'react';
import styles from './Halftone.module.css';


export const Halftone = forwardRef(({
    children,
    dotSize = 4,
    gap = 4,
    dotColor = 'rgba(0, 0, 0, 0.4)',
    blendMode = 'multiply',
    opacity = 1,
    className = ''
}, ref) => { 

    const halftoneStyleVars = {
        '--dot-size': `${dotSize}px`,
        '--gap': `${gap}px`,
        '--dot-color': dotColor,
        mixBlendMode: blendMode,
        opacity: opacity,
    };

    return (
        <div ref={ref} className={`${styles.container} ${className}`}>
            {children}
            <div 
                className={styles.overlay} 
                style={halftoneStyleVars} 
                aria-hidden="true" 
            />
        </div>
    );
});


export default Halftone;