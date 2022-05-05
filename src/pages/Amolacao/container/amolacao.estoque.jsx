import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Tooltip } from 'antd';
import { toast } from "react-toastify";
import { Rotas } from '../../../Routes/rotas';
import { messages } from '../../../common/Messages/messages';

import service from '../../../service';
import serviceAmolacao from '../service/amolacao.service';
import tabelas from '../../../common/Messages/tabelas';
import Grid from '../../../common/components/Grid/Grid';

import BaixaModal from '../components/amolacao.baixa.modal';
import EditModal from '../components/amolacao.edit.modal';
import YesOrNoModal from '../../../common/yesOrNoModal';

import { AiOutlineHome, AiOutlineEye, AiOutlineLike, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

class AmolacaoEstoque extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
            produtoSelecionado: [],
            modalVisualizarVisible: false,
            modalBaixarVisible: false,
            modalEditarVisible: false,
            modalDeletarVisible: false,
        }
        this.funcaoAbrirModal = this.funcaoAbrirModal.bind(this);
    }

    componentDidMount() {
        service.app.ref(tabelas.EstoqueProduto).on('value', (snapshot) => {
            let produtos = [];
            snapshot.forEach((x) => {
                produtos.push({
                    Id: x.key,
                    key: x.key,
                    Cliente: x.val().Cliente,
                    Telefone: x.val().Telefone,
                    Produto: x.val().Produto,
                    Marca: x.val().Marca,
                    Data: x.val().Data,
                    Quantidade: x.val().Quantidade,
                    Pago: x.val().Pago ? 'Sim' : 'Não',
                    Valor: x.val().Valor,
                });
            })
            this.setState({ produtos });
        })
    }

    funcaoAbrirModal(dto, funcionalidade) {
        switch (funcionalidade) {
            case 'Baixa':
                this.setState({ modalBaixarVisible: true, produtoSelecionado: dto })
                break;

            case 'Editar':
                this.setState({ modalEditarVisible: true, produtoSelecionado: dto });
                break;

            case 'Deletar':
                this.setState({ modalDeletarVisible: true, produtoSelecionado: dto.Id });
                break;
            default:
                break;
        }
    }

    deletarProduto(id) {
        serviceAmolacao.delete(id)
            .then(() => {
                toast.success(messages.exclusaoSucesso());
                this.setState({ modalDeletarVisible: false });
            })
            .catch(() => {
                toast.error(messages.exclusaoErro('Produto'));
            })
    }

    render() {
        const iconSize = 20;

        const columns = [
            { title: 'Cliente', dataIndex: 'Cliente', key: 'Cliente', width: '10%' },
            { title: 'Produto', dataIndex: 'Produto', key: 'Produto', width: '10%' },
            { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '10%' },
            { title: 'Data Recebimento', dataIndex: 'Data', key: 'Data', width: '10%' },
            { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
            { title: 'Pago', dataIndex: 'Pago', key: 'Pago', width: '10%' },
            {
                title: 'Ações', width: '10%', render: (status, dto) => (
                    <div style={{ display: 'flex' }}>
                        <Tooltip title="Visualizar">
                            <AiOutlineEye
                                className="mr-2"
                                size={iconSize}
                            />
                        </Tooltip>
                        <Tooltip title="Baixa">
                            <AiOutlineLike
                                className="mr-2 iconVendaChave"
                                size={20}
                                onClick={() => { this.funcaoAbrirModal(dto, 'Baixa') }}
                            />
                        </Tooltip>
                        <Tooltip title="Editar">
                            <AiOutlineEdit
                                className="mr-2 iconEdit"
                                size={iconSize}
                                onClick={() => this.funcaoAbrirModal(dto, 'Editar')}
                            />
                        </Tooltip>
                        <Tooltip title="Deletar">
                            <AiOutlineDelete
                                className="iconExcluir"
                                size={iconSize}
                                onClick={() => this.funcaoAbrirModal(dto, 'Deletar')}
                            />
                        </Tooltip>
                    </div>
                )
            }
        ];

        return (
            <div className="mt-2">
                <div className="t-center">
                    <h1>Estoque de produtos</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Home}>
                                <AiOutlineHome className="mr-1" />
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Amolação</Breadcrumb.Item>
                        <Breadcrumb.Item>Estoque</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Grid
                    dataSource={this.state.produtos}
                    columns={columns}
                />

                <BaixaModal
                    visible={this.state.modalBaixarVisible}
                    onClose={() => this.setState({ modalBaixarVisible: false })}
                    produtoSelecionado={this.state.produtoSelecionado}
                />

                <EditModal
                    visible={this.state.modalEditarVisible}
                    onClose={() => this.setState({ modalEditarVisible: false })}
                    produtoSelecionado={this.state.produtoSelecionado}
                />

                <YesOrNoModal
                    title={'Exclusão de Produto'}
                    text={'Deseja realmente excluir este produto ?'}
                    visible={this.state.modalDeletarVisible}
                    onClose={() => this.setState({ modalDeletarVisible: false })}
                    onOk={() => this.deletarProduto(this.state.produtoSelecionado)}
                />
            </div>
        )
    }
}

export default AmolacaoEstoque;