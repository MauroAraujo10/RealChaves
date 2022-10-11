import React, { useState, useEffect } from 'react';
import tabelas from '../../../../../common/Enum/tabelas';
import service from '../../../../../service';
import HeaderForm from '../../../../../common/components/HeaderForm/HeaderForm';
import Loading from '../../../../../common/components/Loading/Loading';
import Grid from '../../../../../common/components/Grid/Grid';

const ChavesHistoricoCopia = () => {
    const [chaves, setChaves] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let copia = [];
        setLoading(true);
        service.app.ref(tabelas.CopiasChave).once('value', snap => {
            snap.forEach((copiaChave) => {
                service.app.ref(tabelas.Chave).child(copiaChave.val().IdChave).on('value', chave => {
                    copia.push({
                        Id: copiaChave?.key,
                        key: copiaChave?.key,
                        Marca: chave.val()?.Marca,
                        NumeroSerie: chave.val()?.NumeroSerie,
                        Data: copiaChave.val()?.Data,
                        Quantidade: copiaChave.val()?.Quantidade,
                        Valor: copiaChave.val()?.Valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                        TipoPagamento:
                            copiaChave.val()?.TipoPagamento === 'Dinheiro' ? 'Dinheiro' :
                                copiaChave.val()?.TipoPagamento === 'CartaoCredito' ? 'Cartão de Crédito' :
                                    copiaChave.val()?.TipoPagamento === 'CartaoDebito' ? 'Cartão de Débito' :
                                        copiaChave.val()?.TipoPagamento === 'Pix' ? 'Pix' : ''

                    });
                    setChaves([]);
                    setChaves(copia);
                })
            })
            setLoading(false);
        });
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
                    />
            }
        </div>
    );

}

export default ChavesHistoricoCopia;