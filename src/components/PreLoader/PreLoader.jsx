import React from 'react'
import style from './PreLoader.module.css'
import MilesLogo from '../ui/icons/MilesLogo'
import MarvelLogo from '../ui/icons/MarvelLogo'
import SonyLogo from '../ui/icons/SonyLogo'
import {Halftone} from '../ui/patterns/Halftone/Halftone'
import StarVs from '../ui/patterns/StarVs'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'

const PreLoader = () => {
//mapeamento de referencia pai
const preLoaderRef = useRef(null)
//mapeamento de atalhos para animações
const milesLogo = `.${style.milesLogo}`
const divLogos = `.${style.divLogos}`
const marvelLogo = `.${style.marvelLogo}`
const starVs = `.${style.starVs}`
const sonyLogo = `.${style.sonyLogo}`


//codigo gsap
useGSAP(()=>{
    gsap.to(starVs,{
        rotation: 360,
        duration: 100,    
        repeat: -1,      
        ease: 'none',
    })
},{scope:preLoaderRef});




return (
<>
    <Halftone>
    <div ref={preLoaderRef}>
        <MilesLogo className={style.milesLogo}/>
        <div className={style.divLogos}>
            <MarvelLogo className={style.marvelLogo} fundoCor='#00000000'/>
            <StarVs className={style.starVs}/>
            <SonyLogo className={style.sonyLogo}/>
        </div>
    </div>
    </Halftone>
</>
)
}

export default PreLoader