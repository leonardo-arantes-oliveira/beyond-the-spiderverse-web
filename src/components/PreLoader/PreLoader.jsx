import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import style from './PreLoader.module.css';
import MilesLogo from '../ui/icons/MilesLogo';
import MarvelLogo from '../ui/icons/MarvelLogo';
import SonyLogo from '../ui/icons/SonyLogo';
import StarVs from '../ui/patterns/StarVs';
import { Halftone } from '../ui/patterns/Halftone/Halftone';
import { PreLoaderCanvas } from './PreLoaderCanvas';

const PreLoader = ({ isMobile }) => {
const halftoneRef = useRef(null);
const preLoaderRef = useRef(null);

const milesLogo = `.${style.milesLogo}`;
const starVs = `.${style.starVs}`;
const canvasBlendGroup = `.${style.canvasBlendGroup}`;

useGSAP(() => {
    // 1. Configurações iniciais
    gsap.set(milesLogo, {
    scale: 100,
    transformOrigin: 'center center',
    opacity: 1,
    });

    gsap.set(starVs, {
    scale: 100,
    rotation: 360,
    transformOrigin: 'center center',
    });

    // 2. Timeline de animações
    const timeline = gsap.timeline();

    timeline.to(starVs, {
    scale: 1,
    rotation: 0,
    duration: 3,
    ease: 'expo.inOut',
    });

    // esconde o grupo canvas+logos (o "recorte" com os quadrinhos) depois que o X assenta
    timeline.to(canvasBlendGroup, {
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
    duration: 0.5,
    }, '>-0.2');

}, { scope: halftoneRef });

return (
    <Halftone ref={halftoneRef} className={style.halftonePreLoader} dotSize={4} gap={4} opacity={0.5}>
    <div ref={preLoaderRef} className={style.preloaderContainer}>

        <div className={style.canvasBlendGroup}>
        <div className={style.canvasLayer}>
            <PreLoaderCanvas isMobile={isMobile} />
        </div>
        <div className={style.logosBlendLayer}>
            <MarvelLogo className={style.marvelLogo} fundoCor="transparent" fill="white" />
            <StarVs className={style.starVs} fill="white" />
            <SonyLogo className={style.sonyLogo} fill="white" />
        </div>
        </div>

        <MilesLogo className={style.milesLogo} />

    </div>
    </Halftone>
);
};

export default PreLoader;