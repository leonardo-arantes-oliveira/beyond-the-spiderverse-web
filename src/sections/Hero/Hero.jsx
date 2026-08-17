import React, { useRef } from 'react'
import style from './Hero.module.css'
import { heroLayersData } from '../../data/data-hero/imgs/consumeImg'
import { textApresentation } from '../../data/data-hero/copy/textApresentation'
import Sobre from '../../components/Sobre/Sobre'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger,useGSAP,SplitText)

const Hero = ({isMobile}) => {
const containerRef = useRef(null)
const sobreRefs = useRef({
    container: null,
    titulo: null,
    imagens: [],
    frases: [],
}).current

// Timeline de scroll 
useGSAP(() => {
gsap.set(`.${style.layer5} img`, { yPercent: 0 })
gsap.set([`.${style.layer4}`, `.${style.layer3}`, `.${style.layer2}`, `.${style.layer1}`], { yPercent: 150 })


function createApresentacaoTimeline() {
const tl = gsap.timeline()

const splitTitulo = new SplitText(sobreRefs.titulo, { type: 'chars' })
const splitFrases = new SplitText(sobreRefs.frases, { type: 'chars' })

gsap.set(splitTitulo.chars, { opacity: 0, y: 20 })
gsap.set(splitFrases.chars, { opacity: 0 })

tl.to(splitTitulo.chars ,{
    y: 0,
    opacity: 1,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power2.out',
    })
    .to(splitFrases.chars ,{
    y: 0,
    opacity: 0.3,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power2.out',
    })
    .to(sobreRefs.imagens, {
    opacity: 1,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.out',
    }, '-=0.2')
    .to(splitFrases.chars, {
    opacity: 1,
    duration: 0.3,
    stagger: 0.015,
    ease: 'power1.out',
    }, '-=0.2')
    .to(sobreRefs.container, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut',
    }, '+=0.3')

return tl
}

function createDescerCameraTimeline() {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })
    tl.to(`.${style.layer5} img`, { yPercent: -50 }, 0)
    .to(`.${style.layer4}`, { yPercent: 0 }, 0.05)
    .to(`.${style.layer3}`, { yPercent: 0 }, 0.05)
    .to(`.${style.layer2}`, { yPercent: 0 }, 0.15)
    .to(`.${style.layer1}`, { yPercent: 0 }, 0.2)
    return tl
}

gsap.timeline({
    scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: '+=1200',
    scrub: 1,
    pin: true,
    },
})
.add(createApresentacaoTimeline())
.add(createDescerCameraTimeline(),'>-0.8')
}, { scope: containerRef })

// Parallax de mouse
useGSAP(() => {
if (isMobile) {
        gsap.fromTo(`.${style.layer1}`,{y: 6, x: 6} ,{ y: -6, x: -6, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.fromTo(`.${style.layer2}`,{y: 4, x: 4} ,{ y: -4, x: -4, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.fromTo(`.${style.layer3}`,{y: 3, x: 3} ,{ y: -3, x: -3, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.fromTo(`.${style.layer4}`,{y: 2, x: 2} ,{ y: -2, x: -2, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.fromTo(`.${style.layer5}`,{y: 1, x: 1} ,{ y: -1, x: -1, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        return
        }

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

        xToLayer1(xPos * -25); yToLayer1(yPos * -25)
        xToLayer2(xPos * -20); yToLayer2(yPos * -20)
        xToLayer3(xPos * -15); yToLayer3(yPos * -15)
        xToLayer4(xPos * -10); yToLayer4(yPos * -10)
        xToLayer5(xPos * -5); yToLayer5(yPos * -5)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)

}, { scope: containerRef ,dependencies: [isMobile]})
return (
    <section ref={containerRef} className={style.section}>
    <Sobre data={textApresentation} refs={sobreRefs} />
    <picture className={`${style.layer5} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer5.mobile} />
        <img src={heroLayersData.layer5.desktop} alt={heroLayersData.layer5.alt} />
    </picture>
    <picture className={`${style.layer4} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer4.mobile} />
        <img src={heroLayersData.layer4.desktop} alt={heroLayersData.layer4.alt} />
    </picture>
    <picture className={`${style.layer3} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer3.mobile} />
        <img src={heroLayersData.layer3.desktop} alt={heroLayersData.layer3.alt} />
    </picture>
    <picture className={`${style.layer2} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer2.mobile} />
        <img src={heroLayersData.layer2.desktop} alt={heroLayersData.layer2.alt} />
    </picture>
    <picture className={`${style.layer1} ${style.heroParalax}`}>
        <source media="(max-width: 768px)" srcSet={heroLayersData.layer1.mobile} />
        <img src={heroLayersData.layer1.desktop} alt={heroLayersData.layer1.alt} />
    </picture>
    </section>
)
}

export default Hero