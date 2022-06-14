import React, { useEffect, useState } from 'react';
import Grid from '../../../../common/components/Grid/Grid';
import Loading from '../../../../common/components/Loading/Loading';
import service from '../../../../service';
import tabelas from '../../../../common/Enum/tabelas';
import HeaderForm from '../../../../common/components/HeaderForm/HeaderForm';

const AmolacaoHistoricoAmolacoes = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        { title: 'Cliente', dataIndex: 'Cliente', key: 'Cliente', width: '20%' },
        { title: 'Produto', dataIndex: 'Produto', key: 'Produto', width: '10%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '10%' },
        { title: 'Data de Recebimento', dataIndex: 'DataRecebimento', key: 'DataRecebimento', width: '10%' },
        { title: 'Data de Entrega', dataIndex: 'DataEntrega', key: 'DataEntrega', width: '10%' },
        { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '5%' },
        { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', width: '10%' }
    ];

    useEffect(() => {
        setLoading(true);
        service.app.ref(tabelas.ProdutosAmolados).on('value', (snapshot) => {
            let produtos = [];
            snapshot.forEach((x) => {
                produtos.push({
                    Id: x.key,
                    key: x.key,
                    Cliente: x.val().Cliente,
                    Produto: x.val().Produto,
                    Marca: x.val().Marca,
                    DataRecebimento: x.val().DataRecebimento,
                    DataEntrega: x.val().DataEntrega,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                });
            })
            setProdutos(produtos);
            setLoading(false);
        })
    }, []);

    return (
        <div className="mt-2">

            <HeaderForm
                titulo={'Histórico de produtos amolados e entregues'}
                listaCaminhos={['Histórico', 'Produtos Amolados']}
            />

            {
                loading ?
                    <Loading /> :
                    <Grid
                        dataSource={produtos}
                        columns={columns}
                    />
            }

        </div>
    );
}

export default AmolacaoHistoricoAmolacoes;