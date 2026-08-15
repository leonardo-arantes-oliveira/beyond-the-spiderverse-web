import MarvelLogo from '../ui/icons/MarvelLogo';
import StarVs from '../ui/patterns/StarVs';
import SonyLogo from '../ui/icons/SonyLogo';
import style from './PreLoader.module.css';

const PreLoaderMask = () => {
return (
    <svg
    className={style.maskSvg}
    aria-hidden="true"
    focusable="false"
    >
    <defs>
        <mask
        id="logosCombinedMask"
        x="0"
        y="0"
        width="100%"
        height="100%"
        maskUnits="userSpaceOnUse"
        maskContentUnits="userSpaceOnUse"
        >
        {/* Preto não mostra o canvas */}
        <rect width="100%" height="100%" fill="black" />

        {/* Marvel já começa no tamanho normal */}
        <MarvelLogo
            id="mask-marvel"
            className={style.maskMarvelLogo}
            fill="white"
            fundoCor='black'
        />

        {/*
            O <g> é o elemento animado.
            Ele garante que o scale do X aconteça pelo centro.
        */}
        <g id="mask-star-scale">
            <StarVs
            id="mask-star-vs"
            className={style.maskStarVs}
            fill="white"
            />
        </g>

        {/* Sony já começa no tamanho normal */}
        <SonyLogo
            id="mask-sony"
            className={style.maskSonyLogo}
            fill="white"
        />
        </mask>
    </defs>
    </svg>
);
};

export default PreLoaderMask;