import React from 'react';

export default function TotalRegistros(valor) {
    return (
        <div className="f-right">
            <h4>
                Número total de Registros: {valor.numeroRegistros}
            </h4>
        </div>
    );
}