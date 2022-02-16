import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { messages } from '../../../common/Messages/messages';
import { Table, Breadcrumb, Input, Space, Button, Tooltip } from 'antd';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import alicateService from '../service/alicates.service';
import service from '../../../service';

import AlicateEditModal from '../components/alicates.edit.modal';
import TotalRegistros from '../../../common/components/TotalRegistros/TotalRegistros';
import YesOrNoModal from '../../../common/yesOrNoModal';

import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alicates: [],
            alicateSelecionado: [],
            idAlicate: undefined,
            modalDeleteVisible: false,
            modalEditVisible: false
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        service.app.ref('Alicates').on('value', (snapshot) => {
            let alicate = [];
            snapshot.forEach((x) => {
                alicate.push({
                    Id: x.key,
                    key: x.key,
                    Marca: x.val().Marca,
                    Cliente: x.val().Cliente,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                    Pago: x.val().Pago ? 'Sim' : 'Não',
                    Data: x.val().Data,
                })
            })
            this.setState({ alicates: alicate });
        })
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

    edit(dto) {
        let dataSplit = dto.Data.split('/');
        dto.dataCadastro = `${dataSplit[1]}/${dataSplit[0]}/${dataSplit[2]}`;

        this.setState({
            modalEditVisible: true,
            alicateSelecionado: dto
        });
    }

    delete(id) {
        this.setState({
            modalDeleteVisible: true,
            idAlicate: id
        });
    }

    excluirAlicate(id) {
        alicateService.delete(id)
            .then(() => {
                toast.success(messages.exclusaoSucesso());
                this.setState({ modalDeleteVisible: false });
            })
            .catch(() => {
                toast.error(messages.exclusaoErro('Alicate'));
            })
    }

    render() {
        const iconSize = 20;
        const columns = [
            { title: 'Cliente', dataIndex: 'Cliente', key: 'Cliente', ...this.getColumnSearchProps('Cliente'), width: '30%' },
            { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', ...this.getColumnSearchProps('Quantidade'), width: '10%' },
            { title: 'Marca', dataIndex: 'Marca', key: 'Marca', ...this.getColumnSearchProps('Marca'), width: '25%' },
            { title: 'Valor', dataIndex: 'Valor', key: 'Valor', ...this.getColumnSearchProps('Valor'), width: '7%' },
            { title: 'Pago', dataIndex: 'Pago', key: 'Pago', ...this.getColumnSearchProps('Pago'), width: '7%' },
            { title: 'Data', dataIndex: 'Data', key: 'Data', ...this.getColumnSearchProps('Data'), width: '10%' },
            {
                title: 'Ações', width: '10%', render: (status, x) => (
                    <>
                        <Tooltip title="Editar Alicate">
                            <AiOutlineEdit
                                className="mr-3 iconEdit"
                                size={iconSize}
                                onClick={() => this.edit(x)}
                            />
                        </Tooltip>
                        <Tooltip title="Deletar Alicate">
                            <AiOutlineDelete
                                className="iconExcluir"
                                size={iconSize}
                                onClick={() => this.delete(x.Id)}
                            />
                        </Tooltip>
                    </>
                )
            }
        ]

        return (
            <div className="mt-2">
                <div className="t-center">
                    <h1>Alicates Cadastrados</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Home}>
                                <AiOutlineHome className="mr-2" />
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Alicates
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="container">
                    <TotalRegistros
                        numeroRegistros={this.state.alicates.length} />

                    <Table
                        className='Grid'
                        bordered
                        dataSource={this.state.alicates}
                        columns={columns}>
                    </Table>
                </div>

                <AlicateEditModal
                    visible={this.state.modalEditVisible}
                    onClose={() => this.setState({ modalEditVisible: false })}
                    alicateSelecionado={this.state.alicateSelecionado}
                />

                <YesOrNoModal
                    title={'Exclusão de Alicate'}
                    text={'Deseja realmente excluir este Alicate ?'}
                    visible={this.state.modalDeleteVisible}
                    onClose={() => this.setState({ modalDeleteVisible: false })}
                    onOk={() => this.excluirAlicate(this.state.idAlicate)}
                />
            </div>
        );
    }
}

export default withRouter(Grid);