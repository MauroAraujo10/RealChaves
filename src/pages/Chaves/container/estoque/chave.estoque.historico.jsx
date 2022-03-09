import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Rotas } from '../../../../Routes/rotas';

import service from '../../../../service';
import TotalRegistros from '../../../../common/components/TotalRegistros/TotalRegistros';
import ChavesEstoqueVisualizarModal from '../../components/chaves.estoque.visualizar.modal';
import tabelas from '../../../../common/Messages/tabelas';

import { Table, Breadcrumb, Input, Space, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome, AiOutlineEye } from "react-icons/ai";

class EstoqueHistorico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estoqueHistorico: [],
            chavesEstoque: [],
            idEstoque: undefined,
            visualizarModal: false
        }
    }

    componentDidMount() {
        service.app.ref(tabelas.Estoque).on('value', (snapshot) => {
            let estoqueHistorico = [];
            snapshot.forEach((x) => {
                estoqueHistorico.push({
                    Id: x.key,
                    Data: x.val().Data,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                    Chaves: x.val().Chaves
                })
            })
            this.setState({ estoqueHistorico: estoqueHistorico });
        });
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Filtrar ${dataIndex}`}
                    onFocus
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Filtrar
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset Filtro
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleVisualizar(id) {
        let chavesEstoque = [];
        service.app.ref(tabelas.Estoque).child(id).child('Chaves').on('value', (snapshot) => {
            snapshot.forEach((x) => {
                chavesEstoque.push({
                    Id: x.key,
                    Marca: x.val().Marca,
                    NumeroSerie: x.val().NumeroSerie,
                    Quantidade: x.val().Quantidade,
                    QuantidadeSolicitada: x.val().QuantidadeSolicitada,
                    Tipo: x.val().Tipo,
                })
            })
        })
        this.setState({
            visualizarModal: true,
            idEstoque: id,
            chavesEstoque
        });
    }

    render() {
        const { Item } = Breadcrumb;

        const columns = [
            { title: 'Data', dataIndex: 'Data', key: 'Data', ...this.getColumnSearchProps('Data'), width: '20%' },
            { title: 'Quantidade Pedida', dataIndex: 'Quantidade', key: 'Quantidade', ...this.getColumnSearchProps('Quantidade'), width: '10%' },
            { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', ...this.getColumnSearchProps('Valor'), width: '10%' },
            {
                title: 'Ações', width: '5%', render: (status, x) => (
                    <>
                        <Tooltip title="Visualizar">
                            <AiOutlineEye
                                size={20}
                                onClick={() => this.handleVisualizar(x.Id)}
                            />
                        </Tooltip>
                    </>
                )
            }
        ];

        return (
            <>
                <div className="t-center mt-2">
                    <h1>Histórico de Estoque</h1>
                    <Breadcrumb>
                        <Item>
                            <Link to={Rotas.Home}>
                                <AiOutlineHome className="mr-2" />
                                Início
                            </Link>
                        </Item>
                        <Item>
                            <Link to={Rotas.Chaves}>
                                Chaves
                            </Link>
                        </Item>
                        <Item>
                            Histórico de Estoque
                        </Item>
                    </Breadcrumb>
                </div>

                <div className="container">

                    <TotalRegistros
                        numeroRegistros={this.state.estoqueHistorico.length} 
                    />

                    <Table
                        className="Grid"
                        bordered
                        dataSource={this.state.estoqueHistorico}
                        columns={columns}>
                    </Table>
                </div>

                <ChavesEstoqueVisualizarModal
                    title={'Detalhes do pedido'}
                    idEstoque={this.state.idEstoque}
                    chavesEstoque={this.state.chavesEstoque}
                    visible={this.state.visualizarModal}
                    onClose={() => this.setState({ visualizarModal: false })}
                />
            </>
        );
    }
}

export default withRouter(EstoqueHistorico);