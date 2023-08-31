import React, { useEffect, useState } from 'react';
import Grid from '../../../../common/components/Grid/Grid';
import Loading from '../../../../common/components/Loading/Loading';
import service from '../../../../services/index';
import tabelas from '../../../../common/Enum/tabelas';
import HeaderForm from '../../../../common/components/HeaderForm/HeaderForm';

const AmolacaoHistoricoAmolacoes = () => {
    const [produtos, setProdutos] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);
        let arrayProdutos = [];
        let quantidadeTotal = 0;

        service.app.ref(tabelas.ProdutosAmolados).once('value')
            .then((snapshot) => {
                snapshot.forEach((produtoAmolado) => {
                    service.app.ref(tabelas.Amolacao).child(produtoAmolado.val().IdProduto).once('value')
                        .then((produto) => {
                            arrayProdutos.push({
                                Id: produtoAmolado.key,
                                Cliente: produto.val().Cliente,
                                Produto: produto.val().Produto,
                                Marca: produto.val().Marca,
                                DataRecebimento: produto.val().DataRecebimento,
                                DataEntrega: produtoAmolado.val().DataEntrega,
                                Quantidade: produtoAmolado.val().Quantidade,
                                Valor: produtoAmolado.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                            })
                            quantidadeTotal += produtoAmolado.val().Quantidade;
                            setQuantidadeTotal(quantidadeTotal);
                            setProdutos([]);
                            setProdutos(arrayProdutos);
                        })
                    })
                });
        setLoading(false);
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