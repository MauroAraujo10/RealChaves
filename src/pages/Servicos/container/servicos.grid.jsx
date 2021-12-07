import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { messages } from '../../../common/messages';
import { Table, Breadcrumb, Input, Space, Button } from 'antd';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import service from '../../../service';
import servicosService from '../service/servicos.service';

import TotalRegistros from '../../../common/components/TotalRegistros/TotalRegistros';
import YesOrNoModal from '../../../common/yesOrNoModal';

import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome, AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class servicosGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicos: [],
            modalDeleteVisible: false,
            idServico: undefined
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        service.app.ref('Servicos').on('value', (snapshot) => {
            let servicos = [];
            snapshot.forEach((x) => {
                servicos.push({
                    Id: x.key,
                    Data: x.val().Data,
                    Servico: x.val().Servico,
                    Valor: x.val().Valor,
                    Pago: x.val().Pago ? 
                        <AiOutlineCheckCircle 
                            size={30} 
                            style={{color: '#287233 '}}
                        /> 
                            : 
                        <AiOutlineCloseCircle 
                            size={30}
                            style={{color: '#FF0000'}}
                        />,
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

    edit(id) {
        this.props.history.replace(`/Servicos/edit/${id}`);
    }

    delete(id) {
        this.setState({
            modalDeleteVisible: true,
            idServico: id
        });
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
        const iconSize = 16;
        const columns = [
            { title: 'Serviço', dataIndex: 'Servico', key: 'Servico', ...this.getColumnSearchProps('Servico'), width: '60%' },
            { title: 'Data', dataIndex: 'Data', key: 'Data', ...this.getColumnSearchProps('Data'), width: '10%' },
            { title: 'Valor', dataIndex: 'Valor', key: 'Valor', ...this.getColumnSearchProps('Valor'), width: '10%' },
            { title: 'Pago', dataIndex: 'Pago', key: 'Pago', ...this.getColumnSearchProps('Pago'), width: '10%' },
            {
                title: 'Ações', width: '10%', render: (status, x) => (
                    <>
                        <FaEdit
                            title="Edição de Alicate"
                            className="mr-3"
                            style={{ color: '#0f4c5c' }}
                            size={iconSize}
                            onClick={() => this.edit(x)}
                        />
                        <FaTrashAlt
                            title="Deletar Alicate"
                            style={{ color: '#FF0000' }}
                            size={iconSize}
                            onClick={() => this.delete(x.Id)}
                        />
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