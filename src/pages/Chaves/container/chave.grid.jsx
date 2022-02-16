import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Breadcrumb, Input, Space, Button, Tooltip } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import ChavesEditModal from '../components/chaves.edit.modal';
import ChavesVendaModal from '../components/chaves.venda.modal';
import ChavesDescarteModal from '../components/chaves.descarte.modal';
import YesOrNoModal from '../../../common/yesOrNoModal';

import TotalRegistros from '../../../common/components/TotalRegistros/TotalRegistros';

import service from '../../../service';
import chaveService from '../service/chave.service';

import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome, AiOutlineDownSquare, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import { AiOutlineDollar } from 'react-icons/ai';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaves: [],
            modalEditVisible: false,
            modalVendaVisible: false,
            modalDescarteVisible: false,
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

    edit(dto) {
        let dataSplit = dto.Data.split('/');
        dto.dataCadastro = `${dataSplit[1]}/${dataSplit[0]}/${dataSplit[2]}`;

        this.setState({
            modalEditVisible: true,
            chaveSelecionada: dto
        })
    }

    delete(id) {
        this.setState({
            modalExclusaoVisible: true,
            idExclusao: id
        });
    }

    excluirChave(id) {
        chaveService.delete(id)
            .then(() => {
                toast.success(messages.exclusaoSucesso());
                this.setState({ modalExclusaoVisible: false });
            })
            .catch(() => {
                toast.error(messages.exclusaoErro());
            })
    }

    render() {
        const iconSize = 20;
        const columns = [
            { title: 'Marca', dataIndex: 'Marca', key: 'Marca', ...this.getColumnSearchProps('Marca'), width: '25%' },
            { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', ...this.getColumnSearchProps('NumeroSerie'), width: '15%' },
            { title: 'Estoque', dataIndex: 'Quantidade', key: 'Quantidade', ...this.getColumnSearchProps('Quantidade'), width: '10%' },
            { title: 'Tipo', dataIndex: 'Tipo', key: 'Tipo', ...this.getColumnSearchProps('Tipo'), width: '10%' },
            { title: 'Data de Cadastro', dataIndex: 'Data', key: 'Data', ...this.getColumnSearchProps('Data'), width: '15%' },
            {
                title: 'Ações', width: '10%', render: (status, x) => (
                    <>
                        <Tooltip title="Vender">
                            <AiOutlineDollar
                                className="mr-3 iconVendaChave"
                                size={iconSize}
                                onClick={() => { this.setState({ modalVendaVisible: true }) }}
                            />
                        </Tooltip>
                        <Tooltip title="Descartar Chave">
                            <AiOutlineDownSquare
                                className="mr-3 iconDescarte"
                                size={iconSize}
                                onClick={() => {this.setState({modalDescarteVisible: true})}}
                            />
                        </Tooltip>
                        <Tooltip title="Editar">
                            <AiOutlineEdit
                                className="mr-3 iconEdit"
                                size={iconSize}
                                onClick={() => this.edit(x)}
                            />
                        </Tooltip>
                        <Tooltip title="Deletar">
                            <AiOutlineDelete
                                className="iconExcluir"
                                size={iconSize}
                                onClick={() => this.delete(x.Id)}
                            />
                        </Tooltip>
                    </>
                )
            }
        ];

        return (
            <div className="mt-2">
                <div className="t-center">
                    <h1>Chaves cadastradas</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Home}>
                                <AiOutlineHome className="mr-2" />
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Chaves
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="container">
                    <TotalRegistros
                        numeroRegistros={this.state.chaves.length} />

                    <Table
                        className="Grid"
                        bordered
                        dataSource={this.state.chaves}
                        columns={columns}>
                    </Table>
                </div>

                <ChavesEditModal
                    visible={this.state.modalEditVisible}
                    chaveSelecionada={this.state.chaveSelecionada}
                    onClose={() => this.setState({ modalEditVisible: false })}
                />
                <ChavesVendaModal
                    visible={this.state.modalVendaVisible}
                    chaveSelecionada={this.state.chaveSelecionada}
                    onClose={() => this.setState({ modalVendaVisible: false })}
                />
                <ChavesDescarteModal
                    visible={this.state.modalDescarteVisible}
                    onClose={() => this.setState({ modalDescarteVisible: false })}
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