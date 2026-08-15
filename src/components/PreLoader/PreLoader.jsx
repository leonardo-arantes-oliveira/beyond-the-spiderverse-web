import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import style from './PreLoader.module.css';
import MilesLogo from '../ui/icons/MilesLogo';
import { Halftone } from '../ui/patterns/Halftone/Halftone';
import { PreLoaderCanvas } from './PreLoaderCanvas';
import PreLoaderMask from './PreLoaderMask';

const PreLoader = ({ isMobile }) => {
const halftoneRef = useRef(null);
const preLoaderRef = useRef(null);
const milesLogo = `.${style.milesLogo}`
const canvasMaskLayer = `.${style.canvasMaskLayer}`

useGSAP(() => {
    // 1. Configurações iniciais
    gsap.set(milesLogo, {
        scale: 100,
        transformOrigin: 'center center',
        opacity: 1,
        zIndex: 0,
    });
    gsap.set('#mask-star-scale', {
        scale: 100,
        rotation: 360,
        transformOrigin: '50% 50%',
        transformBox: 'fill-box',
    });

    // 2. Timeline de animações
    const timeline = gsap.timeline();
    
    timeline.to('#mask-star-scale', {
        scale: 1,
        rotation: 0,
        duration: 3,
        ease: 'expo.inOut',
    });

    timeline.to(canvasMaskLayer, {
        autoAlpha: 0,
        duration: 0.5,
    });

    timeline.to(milesLogo, {
        scale: 0.6,
        duration: 1,
        ease: 'power3.inOut',
    });

    timeline.to(milesLogo, {
        top: '1%',
        left: '1%',
        duration: 1,
        ease: 'power3.inOut',
    });

    timeline.to([preLoaderRef.current, halftoneRef.current], {
        opacity: 0,
        duration: 1
    });

}, { scope: halftoneRef }); 

return (
    <Halftone ref={halftoneRef} className={style.halftonePreLoader} dotSize={4} gap={4} opacity={0.5}>
    <div ref={preLoaderRef} className={style.preloaderContainer}>
        <div className={style.canvasMaskLayer}>
        <PreLoaderMask />
        <PreLoaderCanvas isMobile={isMobile} />
        </div>

        <MilesLogo className={style.milesLogo} />
    </div>
    </Halftone>
);
};

export default PreLoader;