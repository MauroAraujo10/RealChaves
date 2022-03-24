import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { messages } from '../../../common/Messages/messages';
import { Table, Breadcrumb, Input, Space, Button, Tooltip } from 'antd';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import service from '../../../service';
import servicosService from '../service/servicos.service';
import tabelas from '../../../common/Messages/tabelas';

import TotalRegistros from '../../../common/components/TotalRegistros/TotalRegistros';
import ServicosEditModal from '../components/servicos.edit.modal';
import YesOrNoModal from '../../../common/yesOrNoModal';

import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome, AiOutlineDollar, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

class servicosGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicos: [],
            servicoSelecionado: [],
            modalEditServicoVisible: false,
            modalDeleteVisible: false,
            idServico: undefined
        };
        this.funcaoAbrirModal = this.funcaoAbrirModal.bind(this);
    }

    componentDidMount() {
        service.app.ref(tabelas.Servicos).on('value', (snapshot) => {
            let servicos = [];
            snapshot.forEach((x) => {
                servicos.push({
                    Id: x.key,
                    Data: x.val().Data,
                    Servico: x.val().Servico,
                    Valor: x.val().Valor,
                    Pago: x.val().Pago ? 'Sim' : 'Não'
                })
            })
            this.setState({ servicos });
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

    funcaoAbrirModal(dto, funcionalidade) {
        switch (funcionalidade) {

            case 'Editar':
                let dataSplit = dto.Data.split('/');
                dto.dataCadastro = `${dataSplit[1]}/${dataSplit[0]}/${dataSplit[2]}`;

                this.setState({ modalEditServicoVisible: true, servicoSelecionado: dto });
                break;

            case 'Deletar':
                this.setState({ modalDeleteVisible: true, idServico: dto.Id });
                break;

            default:
                break;
        }
    }

    excluirServico(id) {
        servicosService.delete(id)
            .then(() => {
                toast.success(messages.exclusaoSucesso());
                this.setState({ modalDeleteVisible: false });
            })
            .catch(() => {
                toast.error(messages.exclusaoErro('Serviço'));
            })
    }

    render() {
        const iconSize = 20;
        const columns = [
            { title: 'Serviço', dataIndex: 'Servico', key: 'Servico', ...this.getColumnSearchProps('Servico'), width: '60%' },
            { title: 'Data do Serviço', dataIndex: 'Data', key: 'Data', ...this.getColumnSearchProps('Data'), width: '10%' },
            { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', ...this.getColumnSearchProps('Valor'), width: '10%' },
            { title: 'Pago', dataIndex: 'Pago', key: 'Pago', ...this.getColumnSearchProps('Pago'), width: '10%' },
            {
                title: 'Ações', width: '10%', render: (status, dto) => (
                    <>
                        <Tooltip title="Editar">
                            <AiOutlineEdit
                                className="mr-3 iconEdit"
                                size={iconSize}
                                onClick={() => { this.funcaoAbrirModal(dto, 'Editar') }}
                            />
                        </Tooltip>
                        <Tooltip title="Deletar">
                            <AiOutlineDelete
                                className="iconExcluir"
                                size={iconSize}
                                onClick={() => { this.funcaoAbrirModal(dto, 'Deletar') }}
                            />
                        </Tooltip>
                    </>
                )
            }
        ]

        return (
            <div className="mt-2">
                <div className="t-center">
                    <h1>Serviços Cadastrados</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Home}>
                                <AiOutlineHome className="mr-2" />
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Serviços
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="container">
                    <TotalRegistros
                        numeroRegistros={this.state.servicos.length} />

                    <Table
                        className='Grid'
                        bordered
                        dataSource={this.state.servicos}
                        columns={columns}>
                    </Table>
                </div>

                <ServicosEditModal
                    visible={this.state.modalEditServicoVisible}
                    onClose={() => this.setState({ modalEditServicoVisible: false })}
                    servicoSelecionado={this.state.servicoSelecionado}
                />

                <YesOrNoModal
                    title={'Exclusão de Serviço'}
                    text={messages.excluirRegistro('Serviço')}
                    visible={this.state.modalDeleteVisible}
                    onClose={() => this.setState({ modalDeleteVisible: false })}
                    onOk={() => this.excluirServico(this.state.idServico)}
                />
            </div>
        );
    }
}

export default withRouter(servicosGrid);