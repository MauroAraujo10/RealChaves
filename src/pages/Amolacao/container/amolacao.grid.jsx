import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { toast } from "react-toastify";
import { messages } from '../../../common/Enum/messages';

import Loading from '../../../common/components/Loading/Loading';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import Grid from '../../../common/components/Grid/Grid';
import tabelas from '../../../common/Enum/tabelas';
import Service from '../../../services/index';
import AmolacaoService from '../../../services/amolacao.service';

import BaixaModal from '../components/amolacao.baixa.modal';
import EditModal from '../components/amolacao.edit.modal';
import YesOrNoModal from '../../../common/components/yesOrNoModal/yesOrNoModal';

import { AiOutlineLike, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const AmolacaoGrid = () => {
    const [produtos, setProdutos] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState([]);
    const [modalBaixarVisible, setModalBaixarVisible] = useState(false);
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [modalDeletarVisible, setModalDeletarVisible] = useState(false);

    useEffect(() => {

        setLoading(true);
        
        Service.app.ref(tabelas.Amolacao).on('value', (amolacoes) => {
            let produtos = [];
            let quantidadeTotal = 0;

            amolacoes.forEach((x) => {
                
                if (!x.val().Entregue){
                    produtos.push({
                        Id: x.key,
                        Cliente: x.val().Cliente,
                        Telefone: x.val().Telefone,
                        Produto: x.val().Produto,
                        Marca: x.val().Marca,
                        DataRecebimento: x.val().DataRecebimento,
                        Quantidade: x.val().Quantidade,
                        Pago: x.val().Pago ? "Sim" : "Não",
                        Valor: x.val().Valor,
                        ValorGrid: x.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    })

                    quantidadeTotal += x.val().Quantidade;
                }
            })

            setProdutos(produtos);
            setQuantidadeTotal(quantidadeTotal);
            setLoading(false);
        })
    }, []);

    const columns = [
        { title: 'Cliente', dataIndex: 'Cliente', key: 'Cliente', width: '30%' },
        { title: 'Produto', dataIndex: 'Produto', key: 'Produto', width: '10%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '10%' },
        { title: 'Data Recebimento', dataIndex: 'DataRecebimento', key: 'DataRecebimento', width: '10%' },
        { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
        { title: 'Pago', dataIndex: 'Pago', key: 'Pago', width: '5%' },
        { title: 'Valor', dataIndex: 'ValorGrid', key: 'Valor', width: '10%' },
        {
            title: 'Ações', key: 'acoes', width: '10%', render: (status, dto) => (
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
                setProdutoSelecionado(dto);
                break;
            default:
                break;
        }
    }

    const deletarProduto = async (dto) => {
        await AmolacaoService.Delete(dto.Id)
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

            <HeaderForm
                titulo={'Tabela de Amolações'}
                listaCaminhos={['Amolação']}
            />
            {
                loading ?
                    <Loading /> :
                    <Grid
                        dataSource={produtos}
                        columns={columns}
                        QuantidadeTotal={quantidadeTotal}
                    />
            }

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

export default AmolacaoGrid;