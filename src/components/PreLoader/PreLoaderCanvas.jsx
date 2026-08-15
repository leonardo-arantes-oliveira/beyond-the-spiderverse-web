import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function PreLoaderCanvas({ isMobile }) {
const canvasRef = useRef(null);

useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const frameWidth = isMobile ? 540 : 960;
    const frameHeight = isMobile ? 960 : 540;
    const totalFrames = 12;

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    const spriteImage = new Image();

    spriteImage.src = isMobile
    ? `${import.meta.env.BASE_URL}assets/preloader/spritesheet-mobile.webp`
    : `${import.meta.env.BASE_URL}assets/preloader/spritesheet-desktop.webp`;

    const animationTarget = { frame: 0 };

    const render = () => {
    const currentFrame = Math.floor(animationTarget.frame);
    const sx = currentFrame * frameWidth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        spriteImage,
        sx,
        0,
        frameWidth,
        frameHeight,
        0,
        0,
        canvas.width,
        canvas.height,
    );
    };

    const startAnimation = () => {
    render();

    gsap.to(animationTarget, {
        frame: totalFrames - 1,
        duration: 1.5,
        repeat: -1,
        ease: `steps(${totalFrames})`,
        snap: 'frame',
        onUpdate: render,
    });
    };

    spriteImage.onload = startAnimation;

    spriteImage.onerror = () => {
    console.error('Falha ao carregar sprite sheet:', spriteImage.src);
    };

    if (spriteImage.complete && spriteImage.naturalWidth > 0) {
    startAnimation();
    }

    return () => {
    spriteImage.onload = null;
    spriteImage.onerror = null;
    gsap.killTweensOf(animationTarget);
    };
}, [isMobile]);

return (
    <canvas
    ref={canvasRef}
    style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit:'contain',
        backgroundColor:'black',
    }}
    />
);
}