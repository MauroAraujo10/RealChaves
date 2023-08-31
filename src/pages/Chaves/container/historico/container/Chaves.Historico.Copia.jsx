import React, { useState, useEffect } from 'react';
import tabelas from '../../../../../common/Enum/tabelas';
import Service from '../../../../../services'
import HeaderForm from '../../../../../common/components/HeaderForm/HeaderForm';
import Loading from '../../../../../common/components/Loading/Loading';
import Grid from '../../../../../common/components/Grid/Grid';

const ChavesHistoricoCopia = () => {
    const [chaves, setChaves] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {    

        setLoading(true);
        let arrayCopias = [];
        let quantidadeTotal = 0; 

        Service.app.ref(tabelas.CopiasChave).once('value')
            .then((copiasChaves) => {
                copiasChaves.forEach((copia) => {
                    Service.app.ref(tabelas.Chave).child(copia.val().IdChave).once('value')
                        .then((chave) => {
                            arrayCopias.push({
                                Id: copia.key,
                                Data: copia.val().Data,
                                Marca: chave.val().Marca,
                                NumeroSerie: chave.val().NumeroSerie,
                                Quantidade: copia.val().Quantidade,
                                Valor: copia.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                                TipoPagamento:
                                    copia.val().TipoPagamento === 'Dinheiro' ? 'Dinheiro' :
                                    copia.val().TipoPagamento === 'CartaoCredito' ? 'Cartão de Crédito' :
                                    copia.val().TipoPagamento === 'CartaoDebito' ? 'Cartão de Débito' :
                                    copia.val().TipoPagamento === 'Pix' ? 'Pix' : ''
                            })

                            quantidadeTotal += copia.val().Quantidade;
                            setQuantidadeTotal(quantidadeTotal);
                            setChaves([]);
                            setChaves(arrayCopias);
                        })
                })
            });
            setLoading(false);
    }, []);

    const columns = [
        { title: 'Data da Cópia', dataIndex: 'Data', key: 'Data', width: '15%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '20%' },
        { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '20%' },
        { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '20%' },
        { title: 'Valor', dataIndex: 'Valor', key: 'Valor', width: '10%' },
        { title: 'Tipo de Pagamento', dataIndex: 'TipoPagamento', key: 'TipoPagamento', width: '15%' },
    ];

    return (
        <div className="mt-2">

            <HeaderForm
                titulo={'Histórico de Cópia de Chaves'}
                listaCaminhos={['Chaves', 'Histórico', 'Cópias']}
            />

            {
                loading ?
                    <Loading /> :
                    <Grid
                        dataSource={chaves}
                        columns={columns}
                        QuantidadeTotal={quantidadeTotal}
                    />
            }

        </div>
    );

}

export default ChavesHistoricoCopia;