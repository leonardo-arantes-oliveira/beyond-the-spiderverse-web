import React, { useRef } from 'react'
import style from './Hero.module.css'
import { heroLayersData } from '../../data/data-hero/imgs/consumeImg'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Hero = ({ isMobile }) => {
const containerRef = useRef(null)

useGSAP(
    () => {
    //0.Timeline começo
    const apresentation = gsap.timeline({
        delay:4
    })


    // 1. TIMELINE Descer camera
    const descerCamera = gsap.timeline({
        defaults: { duration: 2.5, ease: 'power3.inOut' },
    },'>')
apresentation.add(descerCamera);
    descerCamera
        .to(`.${style.layer5} img`, {yPercent: -55}, 1.5)
        .from(`.${style.layer4}`, { yPercent: 150 }, 1.55)
        .from(`.${style.layer3}`, { yPercent: 150 }, 1.6)
        .from(`.${style.layer2}`, { yPercent: 150 }, 1.65)
        .from(`.${style.layer1}`, { yPercent: 150 }, 1.7)

    // 2. LÓGICA DE PARALLAX
    if (isMobile) {
        descerCamera.add(() => {
        gsap.to(`.${style.layer1}`, { y: -10, x: 10, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to(`.${style.layer2}`, { y: -8, x: 8, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to(`.${style.layer3}`, { y: -6, x: 6, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to(`.${style.layer4}`, { y: -4, x: 4, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to(`.${style.layer5}`, { y: -2, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        })
    } else {
        const xToLayer1 = gsap.quickTo(`.${style.layer1}`, 'x', { duration: 0.8, ease: 'power2.out' })
        const yToLayer1 = gsap.quickTo(`.${style.layer1}`, 'y', { duration: 0.8, ease: 'power2.out' })
        const xToLayer2 = gsap.quickTo(`.${style.layer2}`, 'x', { duration: 1.2, ease: 'power2.out' })
        const yToLayer2 = gsap.quickTo(`.${style.layer2}`, 'y', { duration: 1.2, ease: 'power2.out' })
        const xToLayer3 = gsap.quickTo(`.${style.layer3}`, 'x', { duration: 1.8, ease: 'power2.out' })
        const yToLayer3 = gsap.quickTo(`.${style.layer3}`, 'y', { duration: 1.8, ease: 'power2.out' })
        const xToLayer4 = gsap.quickTo(`.${style.layer4}`, 'x', { duration: 1.8, ease: 'power2.out' })
        const yToLayer4 = gsap.quickTo(`.${style.layer4}`, 'y', { duration: 1.8, ease: 'power2.out' })
        const xToLayer5 = gsap.quickTo(`.${style.layer5}`, 'x', { duration: 1.8, ease: 'power2.out' })
        const yToLayer5 = gsap.quickTo(`.${style.layer5}`, 'y', { duration: 1.8, ease: 'power2.out' })

        const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window
        const xPos = e.clientX / innerWidth - 0.5
        const yPos = e.clientY / innerHeight - 0.5

        xToLayer1(xPos * -25)
        yToLayer1(yPos * -25)
        xToLayer2(xPos * -20)
        yToLayer2(yPos * -20)
        xToLayer3(xPos * -15)
        yToLayer3(yPos * -15)
        xToLayer4(xPos * -10)
        yToLayer4(yPos * -10)
        xToLayer5(xPos * -5)
        yToLayer5(yPos * -5)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }
    },
    { scope: containerRef, dependencies: [isMobile] }
)

return (
    <section ref={containerRef} className={style.section}>
    {/* Camada 5: Céu */}
    <picture className={`${style.layer5} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer5.mobile} />
        <img src={heroLayersData.layer5.desktop} alt={heroLayersData.layer5.alt} />
    </picture>

    {/* Camada 4: Cidade Fundo */}
    <picture className={`${style.layer4} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer4.mobile} />
        <img src={heroLayersData.layer4.desktop} alt={heroLayersData.layer4.alt} />
    </picture>

    {/* Camada 3: Prédios */}
    <picture className={`${style.layer3} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer3.mobile} />
        <img src={heroLayersData.layer3.desktop} alt={heroLayersData.layer3.alt} />
    </picture>

    {/* Camada 2: Elementos */}
    <picture className={`${style.layer2} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer2.mobile} />
        <img src={heroLayersData.layer2.desktop} alt={heroLayersData.layer2.alt} />
    </picture>

    {/* Camada 1: Miles */}
    <picture className={`${style.layer1} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer1.mobile} />
        <img src={heroLayersData.layer1.desktop} alt={heroLayersData.layer1.alt} />
    </picture>
    </section>
)
}

export default Hero