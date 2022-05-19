import React, { useEffect, useState } from 'react';
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
import YesOrNoModal from '../../../common/components/yesOrNoModal/yesOrNoModal';

import { AiOutlineHome, AiOutlineLike, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const AmolacaoTabela = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState([]);
    const [modalBaixarVisible, setModalBaixarVisible] = useState(false);
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [modalDeletarVisible, setModalDeletarVisible] = useState(false);

    const columns = [
        { title: 'Cliente', dataIndex: 'Cliente', key: 'Cliente', width: '10%' },
        { title: 'Produto', dataIndex: 'Produto', key: 'Produto', width: '10%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '10%' },
        { title: 'Data Recebimento', dataIndex: 'DataRecebimento', key: 'DataRecebimento', width: '10%' },
        { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
        {
            title: 'Ações', width: '10%', render: (status, dto) => (
                <div style={{ display: 'flex' }}>
                    <Tooltip title="Baixa">
                        <AiOutlineLike
                            className="mr-2 iconVendaChave"
                            size={20}
                            onClick={() => funcaoAbrirModal(dto, 'Baixa')}
                        />
                    </Tooltip>
                    <Tooltip title="Editar">
                        <AiOutlineEdit
                            className="mr-2 iconEdit"
                            size={20}
                            onClick={() => funcaoAbrirModal(dto, 'Editar')}
                        />
                    </Tooltip>
                    <Tooltip title="Deletar">
                        <AiOutlineDelete
                            className="iconExcluir"
                            size={20}
                            onClick={() => funcaoAbrirModal(dto, 'Deletar')}
                        />
                    </Tooltip>
                </div>
            )
        }
    ];

    useEffect(() => {
        service.app.ref(tabelas.Amolacao).on('value', (snapshot) => {
            let produtos = [];
            snapshot.forEach((x) => {
                produtos.push({
                    Id: x.key,
                    key: x.key,
                    Cliente: x.val().Cliente,
                    Telefone: x.val().Telefone,
                    Produto: x.val().Produto,
                    Marca: x.val().Marca,
                    DataRecebimento: x.val().DataRecebimento,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                });
            })
            setProdutos(produtos);
        })
    }, []);

    const funcaoAbrirModal = (dto, funcionalidade) => {
        switch (funcionalidade) {
            case 'Baixa':
                setModalBaixarVisible(true);
                setProdutoSelecionado(dto);
                break;

            case 'Editar':
                setModalEditarVisible(true);
                setProdutoSelecionado(dto);
                break;

            case 'Deletar':
                setModalDeletarVisible(true);
                setProdutoSelecionado(dto.Id);
                break;
            default:
                break;
        }
    }

    const deletarProduto = (id) => {
        serviceAmolacao.delete(id)
            .then(() => {
                toast.success(messages.exclusaoSucesso());
                setModalDeletarVisible(false);
            })
            .catch(() => {
                toast.error(messages.exclusaoErro('Produto'));
            })
    }

    return (
        <div className="mt-2">
            <div className="t-center">
                <h1>Produtos em estoque</h1>
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
                dataSource={produtos}
                columns={columns}
            />

            <BaixaModal
                visible={modalBaixarVisible}
                onClose={() => setModalBaixarVisible(false)}
                produtoSelecionado={produtoSelecionado}
            />

            <EditModal
                visible={modalEditarVisible}
                onClose={() => setModalEditarVisible(false)}
                produtoSelecionado={produtoSelecionado}
            />

            <YesOrNoModal
                title={'Exclusão de Produto'}
                text={'Deseja realmente excluir este produto ?'}
                visible={modalDeletarVisible}
                onClose={() => setModalDeletarVisible(false)}
                onOk={() => deletarProduto(produtoSelecionado)}
            />
        </div>
    );
}

export default AmolacaoTabela;