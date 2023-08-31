import React, { useState, useEffect } from 'react';
import tabelas from '../../../../../common/Enum/tabelas';
import Loading from '../../../../../common/components/Loading/Loading';
import HeaderForm from '../../../../../common/components/HeaderForm/HeaderForm';
import Grid from '../../../../../common/components/Grid/Grid';

import Service from '../../../../../services';
import ConfiguracoesService from '../../../../../services/configuracoes.service';

const ChavesHistoricoDescarte = () => {
    const [chavesDescartadas, setChavesDescartadas] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        const getDataForGrid = async() => {

            await ConfiguracoesService.GetAllMotivosDescartes()
                .then((motivosDescartes) => {
                    Service.app.ref(tabelas.Descarte).once('value')
                        .then((chavesDescartadas) => {
                            let arrayChavesDescartadas = [];
                            let quantidadeTotal = 0;
                            chavesDescartadas.forEach((descarte) => {
                                Service.app.ref(tabelas.Chave).child(descarte.val().IdChave).once('value')
                                    .then((chave) => {
                                        arrayChavesDescartadas.push({
                                            Id: descarte.key,
                                            Data: descarte.val().Data,
                                            Marca: chave.val().Marca,
                                            NumeroSerie: chave.val().NumeroSerie,
                                            Motivo: (motivosDescartes.find((element) => element.Index === descarte.val().IdMotivo)).Motivo,
                                            QuantidadeDescartada: descarte.val().Quantidade
                                        })

                                        quantidadeTotal += descarte.val().Quantidade;
                                        setQuantidadeTotal(quantidadeTotal);
                                        setChavesDescartadas([]);
                                        setChavesDescartadas(arrayChavesDescartadas);
                                    })
                            })
                        })
                })
            }
            getDataForGrid();
            setLoading(false);

    }, [])

    const columns = [
        { title: 'Data do Descarte', dataIndex: 'Data', key: 'Data', width: '10%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '30%' },
        { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '20%' },
        { title: 'Motivo', dataIndex: 'Motivo', key: 'Motivo', width: '30%' },
        { title: 'Quantidade Descartada', dataIndex: 'QuantidadeDescartada', key: 'QuantidadeDescartada', width: '10%' },
    ];

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
                        dataSource={chavesDescartadas}
                        columns={columns}
                        QuantidadeTotal={quantidadeTotal}
                    />
            }
        </div>
    );
}

export default ChavesHistoricoDescarte;