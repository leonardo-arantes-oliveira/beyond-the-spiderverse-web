import React from 'react'

//import de estilo
import style from './Hero.module.css'
//import imagens
import {heroLayersData} from '../../data/data-hero/imgs/consumeImg'

const Hero = ({isMobile}) => {
    return (
    <section>
        {/*Background paralax*/}
        {/* Camada 1: Miles */}
        <div className={style.layer4}>
            <picture className={`${style.layer1} ${style.heroParalax}`}>
                <source media="(max-width: 768px)" srcSet={heroLayersData.layer1.mobile} />
                <img src={heroLayersData.layer1.desktop} alt={heroLayersData.layer1.alt} />
            </picture>
            {/* Camada 2: Predios */}
            <picture className={`${style.layer2} ${style.heroParalax}`}>
                <source media="(max-width: 768px)" srcSet={heroLayersData.layer2.mobile} />
                <img src={heroLayersData.layer2.desktop} alt={heroLayersData.layer2.alt} />
            </picture>
            {/* Camada 3: Cidade */}
            <picture className={`${style.layer3} ${style.heroParalax}`}>
                <source media="(max-width: 768px)" srcSet={heroLayersData.layer3.mobile} />
                <img src={heroLayersData.layer3.desktop} alt={heroLayersData.layer3.alt} />
            </picture>
        </div>
    </section>
)
}

export default Hero