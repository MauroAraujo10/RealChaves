import React from 'react';

export default function TotalRegistros(valor) {
    return (
        <div style={{float: 'right'}}>
            <h4>
                Número total de Registros: {valor.numeroRegistros}
            </h4>
        </div>
    );
}