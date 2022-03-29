import React from 'react'

const TituloModal = ({ titulo, subTitulo }) => {
    return (
        <div className="mb-2 t-center tituloModal">
            <h2>{titulo}</h2>
            {subTitulo &&
                <h5 style={{ color: 'gray' }}>{subTitulo}</h5>
            }
        </div>
    )
}

export default TituloModal;