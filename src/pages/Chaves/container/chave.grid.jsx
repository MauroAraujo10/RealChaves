import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Breadcrumb, Input, Space, Button } from 'antd';
import { messages } from '../../../common/messages';

import ChavesVendaModal from '../components/chaves.venda.modal';
import YesOrNoModal from '../../../common/yesOrNoModal';

import TotalRegistros from '../../../common/components/TotalRegistros/TotalRegistros';

import service from '../../../service';
import chaveService from '../service/chave.service';

import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome, AiFillDollarCircle } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaves: [],
            modalVendaVisible: false,
            modalExclusaoVisible: false,
            idExclusao: undefined,
            chaveSelecionada: [],
            dataCadastro: '',
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        service.app.ref('Chave').on('value', (snapshot) => {

            let chaves = [];
            snapshot.forEach((x) => {
                chaves.push({
                    Id: x.key,
                    key: x.key,
                    Marca: x.val().Marca,
                    NumeroSerie: x.val().NumeroSerie,
                    Quantidade: x.val().Quantidade,
                    Tipo: x.val().Tipo,
                    Data: x.val().Data
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

    sell(dto) {
        let dataSplit = dto.Data.split('/');
        dto.dataCadastro = `${dataSplit[1]}/${dataSplit[0]}/${dataSplit[2]}`;

        this.setState({
            modalVendaVisible: true,
            chaveSelecionada: dto
        })
    }

    edit(id) {
        this.props.history.replace(`/Chaves/edit/${id}`);
    }

    delete(id) {
        this.setState({
            modalExclusaoVisible: true,
            idExclusao: id
        });
    }

    async excluirChave(id) {
        await chaveService.delete(id).then(() => {
            alert(messages.exclusaoSucesso());
            this.setState({ modalExclusaoVisible: false });
        })
    }

    render() {
        const iconSize = 16;
        const columns = [
            { title: 'Marca', dataIndex: 'Marca', key: 'Marca', ...this.getColumnSearchProps('Marca'), width: '20%' },
            { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', ...this.getColumnSearchProps('NumeroSerie'), width: '10%' },
            { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', ...this.getColumnSearchProps('Quantidade'), width: '10%' },
            { title: 'Tipo', dataIndex: 'Tipo', key: 'Tipo', ...this.getColumnSearchProps('Tipo'), width: '15%' },
            { title: 'Data de Cadastro', dataIndex: 'Data', key: 'Data', ...this.getColumnSearchProps('Data'), width: '15%' },
            {
                title: 'Ações', width: '10%', render: (status, x) => (
                    <>
                        <AiFillDollarCircle
                            title="Venda de Chave"
                            className="mr-3"
                            style={{ color: '#008000' }}
                            size={iconSize}
                            onClick={() => { this.sell(x) }}
                        />
                        <FaEdit
                            title="Edição de Chave"
                            className="mr-3"
                            style={{ color: '#0f4c5c' }}
                            size={iconSize}
                            onClick={() => this.edit(x.Id)}
                        />
                        <FaTrashAlt
                            title="Deletar Chave"
                            style={{ color: '#FF0000' }}
                            size={iconSize}
                            onClick={() => this.delete(x.Id)}
                        />
                    </>
                )
            }
        ];

        return (
            <div style={{ margin: '30px' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Chaves cadastradas</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">
                                <AiOutlineHome className="mr-2" />
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Chaves
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="f-right">
                    <TotalRegistros
                        link='/Chaves/new'
                        numeroRegistros={this.state.chaves.length}
                    />
                </div>

                <Table
                    className="Grid"
                    bordered
                    dataSource={this.state.chaves}
                    columns={columns}>
                </Table>

                <ChavesVendaModal
                    visible={this.state.modalVendaVisible}
                    chaveSelecionada={this.state.chaveSelecionada}
                    onClose={() => this.setState({ modalVendaVisible: false })}
                />
                <YesOrNoModal
                    title={'Exclusão de Chave'}
                    text={'Deseja realmente excluir esta chave ?'}
                    visible={this.state.modalExclusaoVisible}
                    onClose={() => this.setState({ modalExclusaoVisible: false })}
                    onOk={() => this.excluirChave(this.state.idExclusao)}
                />
            </div >
        );
    }
}

export default withRouter(Grid);