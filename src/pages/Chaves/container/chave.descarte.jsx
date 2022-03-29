import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Breadcrumb, Input, Space, Button, Tooltip } from 'antd';

import TotalRegistros from '../../../common/components/TotalRegistros/TotalRegistros';
import { Rotas } from '../../../Routes/rotas';
import tabelas from '../../../common/Messages/tabelas';
import service from '../../../service';

import { AiOutlineSearch, AiOutlineHome, AiOutlineEye } from "react-icons/ai";

class ChaveDescarte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descartados: [],
        }
    }

    componentDidMount() {
        service.app.ref(tabelas.Descarte).on('value', (snapshot) => {
            let descartados = [];
            snapshot.forEach((x) => {
                descartados.push({
                    Id: x.key,
                    key: x.key,
                    IdChave: x.val().IdChave,
                    QuantidadeDescartada: x.val().QuantidadeDescartada,
                    Motivo: x.val().Motivo,
                    Data: x.val().Data
                })
            })
            this.setState({ descartados: descartados });
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
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<AiOutlineSearch />}
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
        filterIcon: filtered => <AiOutlineSearch style={{ color: filtered ? '#1890ff' : undefined }} />,
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

    render() {

        const handleVisualizar = (id) => {
        }

        const iconSize = 20;
        const columns = [
            { title: 'Data do Descarte', dataIndex: 'Data', key: 'Data', ...this.getColumnSearchProps('Data'), width: '25%' },
            { title: 'Motivo', dataIndex: 'Motivo', key: 'Motivo', ...this.getColumnSearchProps('Motivo'), width: '35%' },
            { title: 'Quantidade Descartada', dataIndex: 'QuantidadeDescartada', key: 'QuantidadeDescartada', ...this.getColumnSearchProps('QuantidadeDescartada'), width: '20%' },
            {
                title: 'Ações', width: '10%', render: (status, x) => (
                    <>
                        <Tooltip title="Visualizar">
                            <AiOutlineEye
                                size={iconSize}
                                onClick={() => handleVisualizar(x.Id)}
                            />
                        </Tooltip>

                    </>
                )
            }
        ];

        return (
            <div className="mt-2">
                <div className="t-center">
                    <h1>Chaves Descartadas</h1>
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
                            Chaves Descartadas
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="container">
                    <TotalRegistros
                        numeroRegistros={this.state.descartados.length}
                    />

                    <Table
                        className="Grid"
                        bordered
                        dataSource={this.state.descartados}
                        columns={columns}
                    />

                </div>

            </div>
        );
    }
}

export default withRouter(ChaveDescarte);