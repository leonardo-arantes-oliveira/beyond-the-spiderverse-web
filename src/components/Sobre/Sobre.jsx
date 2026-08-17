import React from 'react'
import style from './Sobre.module.css'

const Sobre = ({ data, refs }) => {
refs.imagens = []
refs.frases = []

return (
    <div ref={(el) => (refs.container = el)} className={style.sobre}>
    <div 
        className={style.halftoneOverlay} 
        style={{ '--dot-size': '4px', '--gap': '4px', '--dot-color': 'rgba(0,0,0,0.4)' }} 
        aria-hidden="true"
    >
        <h2 ref={(el) => (refs.titulo = el)} className={style.titulo}>
        {data.desenvolvedor}
        </h2>
    </div>

    <ul className={style.links}>
        {data.contatos.map((contato, index) => {
        const Icone = contato.rede

        return (
            <li key={contato.id} className={style.item}>
            <a href={contato.link} target="_blank" rel="noreferrer" className={style.linkAnchor}>
                <span
                ref={(el) => (refs.imagens[index] = el)}
                className={style.iconeWrapper}
                style={{ opacity: 0 }}
                >
                <Icone className={style.icone} />
                </span>

                <p 
                ref={(el) => (refs.frases[index] = el)} 
                className={style.textoLink}
                >
                {Array.isArray(contato.text) ? (
                    contato.text.map((linha, i) => (
                    <span key={i} className={style.linhaTexto}>
                        {linha}
                    </span>
                    ))
                ) : (
                    contato.text
                )}
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