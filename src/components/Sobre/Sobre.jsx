import React from 'react'
import style from './Sobre.module.css'

const Sobre = ({ data, refs }) => {
return (
    <div ref={refs.container} className={style.sobre}>
    <h2 ref={refs.titulo} className={style.titulo}>
        {data.desenvolvedor.split('').map((char, index) => (
        <span key={index} style={{ display: 'inline-block', opacity: 0 }}>
            {char === ' ' ? '\u00A0' : char}
        </span>
        ))}
    </h2>

    <ul className={style.links}>
        {data.contatos.map((contato, index) => {
        const Icone = contato.rede

        return (
            <li key={contato.id} className={style.item}>
            <a href={contato.link} target="_blank" rel="noreferrer">
                <span
                ref={(el) => (refs.imagens.current[index] = el)}
                className={style.iconeWrapper}
                style={{ opacity: 0 }}
                >
                <Icone className={style.icone} />
                </span>

                <p ref={(el) => (refs.frases.current[index] = el)}>
                {contato.text.split('').map((char, charIdx) => (
                    <span key={charIdx} style={{ opacity: 0.2 }}>
                    {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
                </p>
            </a>
            </li>
        )
        })}
    </ul>
    </div>
)
}

export default Sobre