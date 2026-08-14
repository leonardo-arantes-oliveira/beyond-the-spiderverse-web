import React, { useRef } from 'react'
import style from './PreLoader.module.css'
import MilesLogo from '../ui/icons/MilesLogo'
import MarvelLogo from '../ui/icons/MarvelLogo'
import SonyLogo from '../ui/icons/SonyLogo'
import { Halftone } from '../ui/patterns/Halftone/Halftone'
import StarVs from '../ui/patterns/StarVs'
import gsap from "gsap"
import { useGSAP } from '@gsap/react'

const PreLoader = ({ isMobile }) => {
const preLoaderRef = useRef(null)
const milesLogo = `.${style.milesLogo}`
const divLogos = `.${style.divLogos}`
const marvelLogo = `.${style.marvelLogo}`
const starVs = `.${style.starVs}`
const sonyLogo = `.${style.sonyLogo}`

useGSAP(() => {
    gsap.set(milesLogo, {
    xPercent: -50,
    yPercent: -50,
    scale: 200,
    transformOrigin: "center center"
    })

    gsap.to(starVs, {
    rotation: 360,
    duration: 100,    
    repeat: -1,      
    ease: 'none',
    })

}, { scope: preLoaderRef })

return (
    <Halftone>
        <div ref={preLoaderRef} className={style.preloaderContainer}>
        <MilesLogo className={style.milesLogo} />
        
        <div className={style.divLogos}>
        <MarvelLogo className={style.marvelLogo} fundoCor='transparent' />
        <StarVs className={style.starVs} />
        <SonyLogo className={style.sonyLogo} />
        </div>
    </div>
    </Halftone>
)
}

export default PreLoader