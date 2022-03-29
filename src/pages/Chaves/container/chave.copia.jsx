import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Breadcrumb, Input, Space, Button } from 'antd';
import tabelas from '../../../common/Messages/tabelas';
import { Rotas } from '../../../Routes/rotas';
import service from '../../../service';

import TotalRegistros from '../../../common/components/TotalRegistros/TotalRegistros';

import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome } from "react-icons/ai";

class Venda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaves: []
        }
    }

    componentDidMount() {
        service.app.ref(tabelas.CopiasChave).on('value', (snapshot) => {
            let chaves = [];
            snapshot.forEach((x) => {
                chaves.push({
                    Id: x.key,
                    IdProduto: x.val().IdProduto,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                    Data: x.val().Data,

                })
            })
            this.setState({ chaves: chaves });
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

    render() {
        let iconSize = 20;
        const columns = [
            { title: 'IdProduto', dataIndex: 'IdProduto', key: 'IdProduto', ...this.getColumnSearchProps('IdProduto'), width: '30%' },
            { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', ...this.getColumnSearchProps('Quantidade'), width: '20%' },
            { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', ...this.getColumnSearchProps('Valor'), width: '10%' },
            { title: 'Data da Cópia', dataIndex: 'Data', key: 'Data', ...this.getColumnSearchProps('Data'), width: '10%' },
        ];
        return (
            <div className="mt-2">
                <div className="t-center">
                    <h1>Cópia de Cahves</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Home}>
                                <AiOutlineHome className="mr-1" />
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Chaves}>
                                Chaves
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Cópia de Chaves
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="container">
                    <TotalRegistros
                        numeroRegistros={this.state.chaves.length}
                    />

                    <Table
                        className="Grid"
                        bordered
                        dataSource={this.state.chaves}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Venda);