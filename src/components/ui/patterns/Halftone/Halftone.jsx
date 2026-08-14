import React from 'react';
import styles from './Halftone.module.css';

/**
 * Componente Halftone
 * 
 * @param {number} dotSize - Diâmetro da bolinha em pixels (Padrão: 4)
 * @param {number} gap - Espaçamento exato entre as bolinhas em pixels (Padrão: 4)
 * @param {string} dotColor - Cor dos pontos (ex: '#000', 'rgba(0,0,0,0.5)')
 * @param {string} blendMode - Modo de mesclagem CSS (Padrão: 'multiply')
 * @param {number} opacity - Opacidade da camada (0 a 1)
 */
export const Halftone = ({
children,
dotSize = 4,
gap = 4,
dotColor = 'rgba(0, 0, 0, 0.4)',
blendMode = 'multiply',
opacity = 1,
className = ''
}) => {
const halftoneStyleVars = {
    '--dot-size': `${dotSize}px`,
    '--gap': `${gap}px`,
    '--dot-color': dotColor,
    mixBlendMode: blendMode,
    opacity: opacity,
};

return (
    <div className={`${styles.container} ${className}`}>
    {children}
    <div 
        className={styles.overlay} 
        style={halftoneStyleVars} 
        aria-hidden="true" 
    />
    </div>
);
};

export default Halftone;