import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { messages } from '../../../common/Messages/messages';
import { Breadcrumb, Tooltip } from 'antd';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import service from '../../../service';
import servicosService from '../service/servicos.service';
import tabelas from '../../../common/Messages/tabelas';

import Grid from '../../../common/components/Grid/Grid';
import ServicosEditModal from '../components/servicos.edit.modal';
import YesOrNoModal from '../../../common/yesOrNoModal';

import { AiOutlineHome, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

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
                    key: x.key,
                    Data: x.val().Data,
                    Servico: x.val().Servico,
                    Valor: x.val().Valor,
                    Pago: x.val().Pago ? 'Sim' : 'Não'
                })
            })
            this.setState({ servicos });
        });
    }

    funcaoAbrirModal(dto, funcionalidade) {
        switch (funcionalidade) {

            case 'Editar':
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
        const columns = [
            { title: 'Serviço', dataIndex: 'Servico', key: 'Servico', width: '60%' },
            { title: 'Data do Serviço', dataIndex: 'Data', key: 'Data', width: '10%' },
            { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', width: '10%' },
            { title: 'Pago', dataIndex: 'Pago', key: 'Pago', width: '10%' },
            {
                title: 'Ações', width: '10%', render: (status, dto) => (
                    <div style={{ display: 'flex' }}>
                        <Tooltip title="Editar">
                            <AiOutlineEdit
                                className="mr-2 iconEdit"
                                size={20}
                                onClick={() => { this.funcaoAbrirModal(dto, 'Editar') }}
                            />
                        </Tooltip>
                        <Tooltip title="Deletar">
                            <AiOutlineDelete
                                className="iconExcluir"
                                size={20}
                                onClick={() => { this.funcaoAbrirModal(dto, 'Deletar') }}
                            />
                        </Tooltip>
                    </div>
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
                                <AiOutlineHome className="mr-1" />
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Serviços
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Grid
                    dataSource={this.state.servicos}
                    columns={columns}
                />

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