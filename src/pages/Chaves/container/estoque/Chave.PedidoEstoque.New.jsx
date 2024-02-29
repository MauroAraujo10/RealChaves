import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Tooltip, Button } from 'antd';

import HeaderForm from '../../../../common/components/HeaderForm/HeaderForm';
import ChaveService from '../../../../services/chave.service';
import PedidoEstoqueService from '../../../../services/pedido.estoque.service';
import ChavePedidoEstoqueModalAdd from './Chave.PedidoEstoque.ModalAdd';
import { toast } from 'react-toastify';
import { messages } from '../../../../common/Enum/messages';

import { AiOutlinePlus, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { Rotas } from '../../../../Routes/rotas';

const ChavePedidoEstoqueNew = () => {
    const [pedidoEstoque, setPedidoEstoque] = useState([]);
    const [visiblePedidoEstoqueModalAdd, setVisiblePedidoEstoqueModalAdd] = useState(false);
    const [listaChavesSalvas, setListaChavesSalvas] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const history = useHistory();

    useEffect(() => {
        ChaveService.GetAllChavesEQuantidade()
            .then((chaves) => {
                setListaChavesSalvas(chaves);
                setQuantidadeTotal(chaves.Quantidade);
            })
    }, [])


    const handleAddChaveTo = () => {
        setVisiblePedidoEstoqueModalAdd(true);
    }

    const handleRemoverdoPedido = (dto) => {
        const novoPedidoEstoque = pedidoEstoque.filter((pedidoEstoque) => pedidoEstoque.IdChave !== dto.IdChave);
        setPedidoEstoque(novoPedidoEstoque);
    }

    const submitForm = async () => {

        if (pedidoEstoque.length <= 0) {
            toast.error('Não é possivel cadastrar um pedido de estoque vazio!');
            return;
        }

        const dtoPedidoEstoque = {
            QuantidadeTotal: 0,
            Chaves: []
        };

        pedidoEstoque.forEach((chave) => {
            dtoPedidoEstoque.Chaves.push({
                IdChave: chave.IdChave,
                Marca: chave.Marca,
                NumeroSerie: chave.NumeroSerie,
                Tipo: chave.Tipo,
                Data: chave.Data,
                QuantidadeEmEstoque: chave.QuantidadeEmEstoque,
                QuantidadeSolicitada: chave.QuantidadeSolicitada
            })

            dtoPedidoEstoque.QuantidadeTotal += chave.QuantidadeSolicitada;
        });

        await PedidoEstoqueService.PostPedidoEstoque(dtoPedidoEstoque)
            .then(() => {
                toast.success(messages.cadastradoSucesso('pedido de estoque'));
                setPedidoEstoque([]);
                history.push(Rotas.ChavePedidoEstoque);
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('pedido de estoque'));
            })
    }

    const columns = [
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '20%' },
        { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '10%' },
        { title: 'Tipo de Chave', dataIndex: 'Tipo', key: 'Tipo', width: '10%' },
        { title: 'Quantidade em Estoque', dataIndex: 'QuantidadeEmEstoque', key: 'QuantidadeEmEstoque', width: '10%' },
        { title: 'Quantidade Solicitada', dataIndex: 'QuantidadeSolicitada', key: 'QuantidadeSolicitada', width: '10%' },
        {
            title: 'Ações', key: 'acoes', width: '5%', render: (status, dto) => (
                <>
                    <Tooltip title="Remover do pedido">
                        <AiOutlineClose
                            className="iconExcluir"
                            size={20}
                            onClick={() => { handleRemoverdoPedido(dto) }}
                        />
                    </Tooltip>
                </>
            )
        }
    ];

    return (
        <div className='mt-2'>
            <HeaderForm
                titulo={'Cadastrar Pedido de Estoque'}
                listaCaminhos={['Pedido de Estoque', 'Cadastro']}
            />

            <div className='t-right mr-2'>
                <Tooltip placement='top' title={'Adicionar chave ao pedido de estoque'}>
                    <Button
                        style={{ background: '#28A745', color: '#FFF' }}
                        onClick={() => handleAddChaveTo()}
                        icon={<AiOutlinePlus className='mr-1' size={16} />}
                        className='mr-1'
                        autoFocus
                    >
                        Adicionar
                    </Button>
                </Tooltip>
                <Tooltip placement='top' title={'Salvar pedido de estoque'}>
                    <Button
                        type={'primary'}
                        onClick={() => submitForm()}
                        icon={<AiOutlineSave size={16} className='mr-1' />}
                    >
                        Salvar
                    </Button>
                </Tooltip>
            </div>

            <Table
                className='mt-2'
                dataSource={pedidoEstoque}
                columns={columns}
                bordered
                style={{ margin: '2% 20%' }}
                pagination={false}
            />

            <ChavePedidoEstoqueModalAdd
                visible={visiblePedidoEstoqueModalAdd}
                onClose={() => setVisiblePedidoEstoqueModalAdd(false)}
                listaChavesSalvas={listaChavesSalvas}
                setListaChavesSalvas={setListaChavesSalvas}
                pedidoEstoque={pedidoEstoque}
                setPedidoEstoque={setPedidoEstoque}
                quantidadeTotal={quantidadeTotal}
            />

        </div>
    );

}

export default ChavePedidoEstoqueNew;