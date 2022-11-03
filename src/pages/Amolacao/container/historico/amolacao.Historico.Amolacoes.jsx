import React, { useEffect, useState } from 'react';
import Grid from '../../../../common/components/Grid/Grid';
import Loading from '../../../../common/components/Loading/Loading';
import service from '../../../../service';
import tabelas from '../../../../common/Enum/tabelas';
import HeaderForm from '../../../../common/components/HeaderForm/HeaderForm';

const AmolacaoHistoricoAmolacoes = () => {
    const [produtos, setProdutos] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        service.app.ref(tabelas.ProdutosAmolados).on('value', (snapshot) => {
            let produtos = [];
            let quantidadeTotal = 0;
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
                    Valor: x.val().Valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}),
                });
                quantidadeTotal = quantidadeTotal + x.val().Quantidade;
            })
            setProdutos(produtos);
            setQuantidadeTotal(quantidadeTotal);
            setLoading(false);
        })
    }, []);

    const columns = [
        { title: 'Cliente', dataIndex: 'Cliente', key: 'Cliente', width: '20%' },
        { title: 'Produto', dataIndex: 'Produto', key: 'Produto', width: '10%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '10%' },
        { title: 'Data de Recebimento', dataIndex: 'DataRecebimento', key: 'DataRecebimento', width: '10%' },
        { title: 'Data de Entrega', dataIndex: 'DataEntrega', key: 'DataEntrega', width: '10%' },
        { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '5%' },
        { title: 'Valor', dataIndex: 'Valor', key: 'Valor', width: '10%' }
    ];

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
                        QuantidadeTotal={quantidadeTotal}
                    />
            }

        </div>
    );
}

export default AmolacaoHistoricoAmolacoes;