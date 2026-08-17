import React from 'react'
import style from './Sobre.module.css'

const Sobre = ({ data, refs }) => {
refs.imagens = []
refs.frases = []

return (
    <div ref={(el) => (refs.container = el)} className={style.sobre}>
    <h2 ref={(el) => (refs.titulo = el)} className={style.titulo}>
        {data.desenvolvedor}
    </h2>

    <ul className={style.links}>
        {data.contatos.map((contato, index) => {
        const Icone = contato.rede

        return (
            <li key={contato.id} className={style.item}>
            <a href={contato.link} target="_blank" rel="noreferrer">
                <span
                ref={(el) => (refs.imagens[index] = el)}
                className={style.iconeWrapper}
                style={{ opacity: 0 }}
                >
                <Icone className={style.icone} />
                </span>

                <p ref={(el) => (refs.frases[index] = el)}>
                {contato.text}
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