import React, { useState, useEffect } from 'react';
import tabelas from '../../../../../common/Enum/tabelas';
import service from '../../../../../service';
import Loading from '../../../../../common/components/Loading/Loading';
import HeaderForm from '../../../../../common/components/HeaderForm/HeaderForm';
import Grid from '../../../../../common/components/Grid/Grid';

const ChavesHistoricoDescarte = () => {
    const [descartados, setDescartados] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        { title: 'Data do Descarte', dataIndex: 'Data', key: 'Data', width: '10%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '30%' },
        { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '20%' },
        { title: 'Motivo', dataIndex: 'Motivo', key: 'Motivo', width: '30%' },
        { title: 'Quantidade Descartada', dataIndex: 'QuantidadeDescartada', key: 'QuantidadeDescartada', width: '10%' },
    ];

    useEffect(() => {
        setLoading(true);
        let descartados = [];
        service.app.ref(tabelas.Descarte).once('value', snap => {
            snap.forEach((descarte) => {
                service.app.ref(tabelas.Chave).child(descarte.val().IdChave).on('value', chave => {
                    descartados.push({
                        Id: descarte?.key,
                        key: descarte?.key,
                        Data: descarte.val()?.Data,
                        Marca: chave.val()?.Marca,
                        NumeroSerie: chave.val()?.NumeroSerie,
                        Motivo: descarte.val()?.Motivo,
                        QuantidadeDescartada: descarte.val()?.Quantidade,
                    });
                    setDescartados([]);
                    setDescartados(descartados);
                })
            })
            setLoading(false);
        });
    }, []);

    return (
        <div className="mt-2">
            <HeaderForm
                titulo={'Histórico de Chaves Descartadas'}
                listaCaminhos={['Chaves', 'Histórico', 'Descarte']}
            />
            {
                loading ?
                    <Loading /> :
                    <Grid
                        dataSource={descartados}
                        columns={columns}
                    />
            }
        </div>
    );
}

export default ChavesHistoricoDescarte;