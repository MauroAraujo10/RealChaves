import React, { useState } from 'react';
import { Button, Select, Table, Row, Col } from 'antd';

import HeaderForm from '../../common/components/HeaderForm/HeaderForm';
import Tabelas from '../../common/Enum/tabelas';

import Services from '../../services';
import ServicosService from '../../services/servicos.service';

import Loading from '../../common/components/Loading/Loading';

const HistoricoIndex = () => {
    const { Option } = Select;
    const [isGridVisible, setIsGridVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [selectedValue, setSelectedValue] = useState();
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const handleEscolherHistorico = async () => {

        setLoading(true);
        setData([]);

        switch (selectedValue) {
            case 'Copias':
                let arrayChaves = [];
                const columnChaves = [
                    { title: 'Data da Cópia', dataIndex: 'DataCopia', key: 'DataCopia', width: '15%' },
                    { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '20%' },
                    { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '20%' },
                    { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
                    { title: 'TipoPagamento', dataIndex: 'TipoPagamentoGrid', key: 'TipoPagamentoGrid', width: '20%' },
                    { title: 'Valor', dataIndex: 'Valor', key: 'Valor', width: '10%' },
                ];

                await Services.app.ref(Tabelas.CopiasChave).once('value')
                    .then((snapshot) => {
                        snapshot.forEach((copia) => {
                            Services.app.ref(Tabelas.Chave).child(copia.val().IdChave).once('value')
                                .then((chave) => {
                                    arrayChaves.push({
                                        DataCopia: copia.val().Data,
                                        Marca: chave.val().Marca,
                                        NumeroSerie: chave.val().NumeroSerie,
                                        Quantidade: copia.val().Quantidade,
                                        TipoPagamento: copia.val().TipoPagamento,
                                        TipoPagamentoGrid: copia.val().TipoPagamento === "CartaoDebito" ? "Cartão de Débito" :
                                            copia.val().TipoPagamento === "CartaoCredito" ? "Cartão de Crédito" :
                                                copia.val().TipoPagamento,
                                        Valor: copia.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                                    });
                                    setIsGridVisible(true);
                                    setColumns(columnChaves);
                                    setData([]);
                                    setData(arrayChaves);
                                })
                        })
                        setLoading(false);
                    });
                break;
            case 'Descarte':
                setLoading(true);
                await Services.app.ref(Tabelas.Descarte).once('value')
                    .then((snapshot) => {
                        let arrayDescartes = [];

                        const columnDescartes = [
                            { title: 'Data do descarte', dataIndex: 'Data', key: 'Data', width: '15%' },
                            { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
                            { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '15%' },
                            { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '10%' },
                            { title: 'Motivo', dataIndex: 'Motivo', key: 'Motivo', width: '40%' },
                        ];

                        snapshot.forEach((descarte) => {
                            Services.app.ref(Tabelas.Chave).child(descarte.val().IdChave).once('value')
                                .then((chave) => {
                                    arrayDescartes.push({
                                        Marca: chave.val().Marca,
                                        NumeroSerie: chave.val().NumeroSerie,
                                        Data: descarte.val().Data,
                                        Motivo: descarte.val().Motivo,
                                        Quantidade: descarte.val().Quantidade
                                    });
                                    setIsGridVisible(true);
                                    setColumns(columnDescartes);
                                    setData([]);
                                    setData(arrayDescartes);
                                });
                        })
                        setLoading(false);
                    })
                break;
            case 'PedidosEstoque':
                let arrayPedidosEstoque = [];
                const columnPedidoEstoque = [
                    { title: 'Data do Pedido', dataIndex: 'DataPedido', key: 'DataPedido', width: '10%' },
                    { title: 'Data da Baixa', dataIndex: 'DataBaixa', key: 'DataBaixa', width: '10%' },
                    { title: 'Quantidade Solicitada', dataIndex: 'QuantidadePedida', key: 'QuantidadePedida', width: '10%' },
                    { title: 'Quantidade Recebida', dataIndex: 'QuantidadeRecebida', key: 'QuantidadeRecebida', width: '10%' },
                    { title: 'Empresa', dataIndex: 'Empresa', key: 'Empresa', width: '20%' },
                    { title: 'Status', dataIndex: 'Status', key: 'Status', width: '15%' },
                    { title: 'Valor', dataIndex: 'Valor', key: 'Valor', width: '15%' },
                    { title: 'Tipo Pagamento', dataIndex: 'TipoPagamentoGrid', key: 'TipoPagamentoGrid', width: '10%' },
                ];

                await Services.app.ref(Tabelas.BaixaPedidoChaves).once('value')
                    .then((snapshot) => {
                        snapshot.forEach((baixa) => {
                            Services.app.ref(Tabelas.PedidoEstoque).child(baixa.val().IdPedidoEstoque).once('value')
                                .then((pedido) => {
                                    arrayPedidosEstoque.push({
                                        DataPedido: pedido.val().DataPedido,
                                        DataBaixa: baixa.val().DataBaixa,
                                        QuantidadePedida: pedido.val().QuantidadeTotal,
                                        QuantidadeRecebida: baixa.val().QuantidadeTotalRecebida,
                                        Empresa: baixa.val().Empresa,
                                        Status: baixa.val().Status,
                                        Valor: baixa.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                                        TipoPagamentoGrid: baixa.val().TipoPagamento === "CartaoDebito" ? "Cartão de Débito" :
                                                           baixa.val().TipoPagamento === "CartaoCredito" ? "Cartão de Crédito" :
                                                           baixa.val().TipoPagamento,
                                    });
                                    setIsGridVisible(true);
                                    setColumns(columnPedidoEstoque);
                                    setData([]);
                                    setData(arrayPedidosEstoque);
                                })
                        })
                        setLoading(false);
                    });
                break;
            case 'Amolacoes':
                let arrayProdutos = [];

                const columns = [
                    { title: 'Data Recebimento', dataIndex: 'DataRecebimento', key: 'DataRecebimento', width: '10%' },
                    { title: 'Data Pagamento', dataIndex: 'DataPagamento', key: 'DataPagamento', width: '10%' },
                    { title: 'Cliente', dataIndex: 'Cliente', key: 'Cliente', width: '20%' },
                    { title: 'Tipo produto', dataIndex: 'Tipo', key: 'Tipo', width: '10%' },
                    { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '5%' },
                    { title: 'Valor', dataIndex: 'ValorGrid', key: 'ValorGrid', width: '5%' },
                    { title: 'Tipode Pagamento', dataIndex: 'TipoPagamentoGrid', key: 'TipoPagamentoGrid', width: '10%' },
                ];

                await Services.app.ref(Tabelas.Pagamentos).once('value')
                    .then((snapshot) => {
                        snapshot.forEach((pagamento) => {
                            Services.app.ref(Tabelas.Produtos).child(pagamento.val().IdProduto).once('value')
                                .then((produto) => {
                                    arrayProdutos.push({
                                        IdProduto: pagamento.val().IdProduto,
                                        Cliente: produto.val().Cliente,
                                        DataRecebimento: produto.val().DataRecebimento,
                                        DataPagamento: pagamento.val().DataPagamento,
                                        Tipo: produto.val().Tipo,
                                        Quantidade: pagamento.val().Quantidade,
                                        ValorGrid: pagamento.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                                        TipoPagamentoGrid: pagamento.val().TipoPagamento === "CartaoDebito" ? "Cartão de Débito" :
                                            pagamento.val().TipoPagamento === "CartaoCredito" ? "Cartão de Crédito" :
                                                pagamento.val().TipoPagamento,
                                    })
                                    setIsGridVisible(true);
                                    setColumns(columns);
                                    setData([]);
                                    setData(arrayProdutos);
                                })
                        })
                        setLoading(false);
                    });

                break;
            case 'Servicos':
                await ServicosService.GetAllServicos()
                    .then((servicos) => {
                        const columns = [
                            { title: 'Data', dataIndex: 'Data', key: 'Data', width: '10%' },
                            { title: 'Descrição', dataIndex: 'Descricao', key: 'Descricao', width: '30%' },
                            { title: 'Valor', dataIndex: 'Valor', key: 'Valor', width: '15%' },
                        ];

                        setIsGridVisible(true);
                        setLoading(false);
                        setColumns(columns);
                        setData(servicos);
                    })
                break;
            default:
                setLoading(false);
                break;
        }
    }

    return (
        <div className='mr-2'>

            <HeaderForm
                titulo={'Históricos'}
                listaCaminhos={['Históricos']}
            />

            <div className='container'>
                <Row gutter={10}>
                    <Col xs={16} sm={20}>
                        <Select
                            className='Select-Historico'
                            style={{ width: '100%' }}
                            defaultValue="Selecione"
                            onChange={(value) => setSelectedValue(value)}
                            tabIndex={0}
                        >
                            <Option value="Copias">Cópias de chaves</Option>
                            <Option value="Descarte">Descarte de chaves</Option>
                            <Option value="PedidosEstoque">Pedidos de Estoque</Option>
                            <Option value="Amolacoes">Amolações</Option>
                            <Option value="Servicos">Serviços</Option>
                        </Select>
                    </Col>
                    <Col xs={2} sm={2}>
                        <Button
                            type={'primary'}
                            onClick={() => handleEscolherHistorico()}
                        >
                            Selecionar
                        </Button>
                    </Col>
                </Row>
            </div>

            {
                loading ?
                    <Loading />
                    :
                    isGridVisible ?
                        <Table
                            className='Grid container'
                            dataSource={data}
                            columns={columns}
                        />
                        :
                        <></>
            }
        </div >
    );
}

export default HistoricoIndex;