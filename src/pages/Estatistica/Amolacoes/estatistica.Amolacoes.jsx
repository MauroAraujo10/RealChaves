import React from 'react';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';

const EstatisticaAmolacoes = () => {
    return (
        <div className="mt-2">
            <HeaderForm
                titulo={'Estatísticas Amolações'}
                listaCaminhos={['Estatísticas', 'Amolações']}
            />

        </div>
    );
}

export default EstatisticaAmolacoes;