import React from 'react';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';

const EstatisticaServicos = () => {

    return (
        <div className="mt-2">
            <HeaderForm
                titulo={'Estatísticas Serviços'}
                listaCaminhos={['Estatísticas', 'Serviços']}
            />
        </div>
    );
}

export default EstatisticaServicos;