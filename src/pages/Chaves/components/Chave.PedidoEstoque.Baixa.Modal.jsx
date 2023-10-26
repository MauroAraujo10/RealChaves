import React, { useState, useEffect } from 'react';

import { Row, Col, Modal, Form, Input, Table } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from 'react-toastify';
import { TagStatusEnum } from '../../../common/Enum/TagStatusEnum';
import Loading from '../../../common/components/Loading/Loading';

import ChaveService from '../../../services/chave.service';
import PedidoEstoqueService from '../../../services/pedido.estoque.service';

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const ChavesEstoquePedidoModal = ({ visible, onClose, pedidoSelecionado }) => {
    const [listaQuantidadesEntregues, setListaQuantidadesEntregues] = useState([]);
    const [loading, setLoading] = useState(false);
    const { Column } = Table;

    useEffect(() => {
        setListaQuantidadesEntregues([]);
    }, [pedidoSelecionado]);

    const submitForm = async (form) => {
        setLoading(true);

        const dtoBaixaPedido = {
            IdPedidoEstoque: pedidoSelecionado.Id,
            DataPedido: pedidoSelecionado.DataPedido,
            Empresa: form.Empresa,
            Valor: parseFloat(form.Valor),
            Status: TagStatusEnum.Completo,
            QuantidadeTotalRecebida: 0,
            QuantidadeTotalSolicitada: 0,
            Chaves: pedidoSelecionado.Chaves
        };

        listaQuantidadesEntregues.forEach(async (quantidadeRecebida, index) => {
            let chave = pedidoSelecionado.Chaves[index];

            let chaveAtualizada = {
                Marca: chave.Marca,
                NumeroSerie: chave.NumeroSerie,
                Data: chave.Data,
                Tipo: chave.Tipo,
                Quantidade: chave.QuantidadeEmEstoque + quantidadeRecebida
            };

            if (chave.QuantidadeSolicitada > quantidadeRecebida) 
                dtoBaixaPedido.Status = TagStatusEnum.Incompleto;
            else 
            if (chave.QuantidadeSolicitada < quantidadeRecebida) 
                dtoBaixaPedido.Status = TagStatusEnum.Excedente;

            dtoBaixaPedido.QuantidadeTotalSolicitada += chave.QuantidadeSolicitada;
            dtoBaixaPedido.QuantidadeTotalRecebida += quantidadeRecebida;

            await ChaveService.Update(chave.IdChave, chaveAtualizada);
        })

        await PedidoEstoqueService.PostBaixaPedidoEstoque(dtoBaixaPedido)
            .then(async () => {
                await PedidoEstoqueService.SoftDeletePedidoEstoque(pedidoSelecionado);
                toast.success(messages.cadastradoSucesso('Baixa de Pedido'));
                setLoading(false);
                onClose();
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Baixa de Pedido'));
                setLoading(false);
            });
    }

    const changeQuantidade = (status, dto, index, event) => {
        let quantidadesEntregues = listaQuantidadesEntregues;
        quantidadesEntregues[index] = Number(event.target.value);
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >

            <TituloModal
                titulo={'Baixa de Lista de Pedidos'}
                subTitulo={'preencha as informações para dar baixa no pedido'}
            />

            {
                loading ?
                    <Loading /> :
                    <Form onFinish={submitForm} layout='vertical'>
                        <Row gutter={10}>
                            <Col md={10} xs={12}>
                                <Form.Item
                                    label="Empresa responsável"
                                    name="Empresa"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}
                                >
                                    <Input
                                        type="text"
                                        placeholder="Nome da empresa"
                                        maxLength={50}
                                        autoFocus
                                        tabIndex={1}
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={6} xs={6}>
                                <Form.Item
                                    label="Valor"
                                    name="Valor"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}
                                >
                                    <Input
                                        type="number"
                                        placeholder={'Valor'}
                                        min={0}
                                        step="0.10"
                                        tabIndex={2}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Table
                            className="Tabela-Lista-Pedidos mb-2"
                            dataSource={pedidoSelecionado?.Chaves}
                            pagination={false}
                        >
                            <Column title="Marca" dataIndex="Marca" key="Marca" width={'10%'} />
                            <Column title="Número de Série" dataIndex="NumeroSerie" key="NumeroSerie" width={'20%'} />
                            <Column title="Quantidade Solicitada" dataIndex="QuantidadeSolicitada" key="QuantidadeSolicitada" width={'10%'} />
                            <Column title="Quantidade Entregue" width={'10%'} render={(status, dto, index) => (
                                <Input
                                    type="number"
                                    min={1}
                                    max={999}
                                    placeholder='0'
                                    required
                                    onChange={(event) => changeQuantidade(status, dto, index, event)}
                                />
                            )}
                            />

                        </Table>

                        <BotaoCadastrar
                            funcaoCancelar={onClose}
                        />

                    </Form>
            }
        </Modal>
    );
}

export default ChavesEstoquePedidoModal;
