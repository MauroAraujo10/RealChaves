import React from 'react';

const TotalRegistros = ({ numeroRegistros, QuantidadeTotal }) => {

    return (
        <div className="f-right">
            <h4>
                Número de Registros: <b>{numeroRegistros}</b>
                <br />
                Quantidade total: <b>{QuantidadeTotal}</b>
            </h4>
        </div>
    )
}

export default TotalRegistros;