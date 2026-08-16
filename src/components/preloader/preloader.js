// preloader/preloader.js
import gsap from 'gsap';

// ---------------------------------------------------------------
// Detecta mobile igual o `isMobile` que era passado como prop
// ---------------------------------------------------------------
const isMobile = window.matchMedia('(max-width: 768px)').matches;

// ---------------------------------------------------------------
// Vindo do PreLoaderCanvas.jsx — o `useEffect` virou uma função
// normal, chamada direto (não precisa "esperar montar" nada)
// ---------------------------------------------------------------
function initCanvas(isMobile) {
const canvas = document.getElementById('preloader-canvas');
const ctx = canvas.getContext('2d');

const frameWidth = isMobile ? 540 : 960;
const frameHeight = isMobile ? 960 : 540;
const totalFrames = 12;

canvas.width = frameWidth;
canvas.height = frameHeight;

const spriteImage = new Image();
spriteImage.src = isMobile
? `${import.meta.env.BASE_URL}assets/imgs/preloader/spritesheet-mobile.webp`
: `${import.meta.env.BASE_URL}assets/imgs/preloader/spritesheet-desktop.webp`;
const animationTarget = { frame: 0 };

function render() {
    const currentFrame = Math.floor(animationTarget.frame);
    const sx = currentFrame * frameWidth;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(spriteImage, sx, 0, frameWidth, frameHeight, 0, 0, canvas.width, canvas.height);
}

let tween;
function start() {
    render();
    tween = gsap.to(animationTarget, {
    frame: totalFrames - 1,
    duration: 1.5,
    repeat: -1,
    ease: `steps(${totalFrames})`,
    snap: 'frame',
    onUpdate: render,
    });
}

spriteImage.onload = start;
spriteImage.onerror = () => console.error('Falha ao carregar sprite:', spriteImage.src);

if (spriteImage.complete && spriteImage.naturalWidth > 0) start();

// equivalente ao "return () => {...}" (cleanup) do useEffect
return function destroyCanvas() {
    spriteImage.onload = null;
    spriteImage.onerror = null;
    if (tween) tween.kill();
};
}

// ---------------------------------------------------------------
// Vindo do PreLoader.jsx — o `useGSAP(() => {...}, { scope })` vira
// uma função normal. O "scope" do useGSAP existia só pra escopar os
// seletores de classe dentro do halftoneRef; aqui usamos IDs diretos,
// então nem precisamos de escopo nenhum.
// ---------------------------------------------------------------
function playIntroTimeline({ onComplete } = {}) {
const milesLogo = '#miles-logo';
const starVs = '#star-vs';
const canvasBlendGroup = '#canvas-blend-group';
const preloader = '#preloader-inner';
const halftone = '#preloader';

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

const timeline = gsap.timeline({ onComplete });

timeline.to(starVs, {
    scale: 1,
    rotation: 0,
    duration: 3,
    ease: 'expo.inOut',
});

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

timeline.to([preloader,halftone] ,{
    opacity: 0,
    duration: 0.5,
}, '>-0.15');

return timeline;
}

// ---------------------------------------------------------------
// Boot: roda IMEDIATAMENTE quando esse módulo é avaliado —
// não espera React, não espera nada.
// ---------------------------------------------------------------
const destroyCanvas = initCanvas(isMobile);

playIntroTimeline({
onComplete: () => {
    destroyCanvas();
    document.getElementById('preloader').remove();

    // Avisa o React (se ele já tiver montado, ou quando montar)
    // que o preloader terminou.
    window.dispatchEvent(new CustomEvent('preloader:done'));
},
});