import React, { useEffect, useState } from 'react';
import { Modal, Form, Col, Row, Input } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from 'react-toastify';
import moment from 'moment'

import AmolacaoService from '../../../services/amolacao.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

const AmolacaoBaixaModal = ({ visible, onClose, produtoSelecionado }) => {
    const [pago, setPago] = useState(false);

    useEffect(() => {
        setPago(produtoSelecionado.Pago === "Sim");
    }, [produtoSelecionado])

    const submitForm = async (form) => {

        let dtoAmolacao = {};
        let dto = {};


        if (pago){
            dtoAmolacao = {
                IdProduto: produtoSelecionado.Id,
                DataEntrega: moment().format('DD/MM/yyyy'),
                Quantidade: produtoSelecionado.Quantidade,
                Valor:  parseFloat(produtoSelecionado.Valor)
            };

            dto = {
                Cliente: produtoSelecionado.Cliente,
                Telefone: produtoSelecionado.Telefone,
                Produto: produtoSelecionado.Produto,
                Marca: produtoSelecionado.Marca,
                DataRecebimento: produtoSelecionado.DataRecebimento,
                Quantidade: 0,
                Pago: true,
                Valor: parseFloat(produtoSelecionado.Valor),
                Entregue: true
            };
        }
        else{
            dtoAmolacao = {
                IdProduto: produtoSelecionado.Id,
                DataEntrega: moment().format('DD/MM/yyyy'),
                Quantidade: Number(form.Quantidade),
                Valor:  parseFloat(form.Valor)
            };

            let novaQuantidade = produtoSelecionado.Quantidade - Number(form.Quantidade);

            dto = {
                Cliente: produtoSelecionado.Cliente,
                Telefone: produtoSelecionado.Telefone,
                Produto: produtoSelecionado.Produto,
                Marca: produtoSelecionado.Marca,
                DataRecebimento: produtoSelecionado.DataRecebimento,
                Quantidade: novaQuantidade,
                Pago: novaQuantidade <= 0,
                Valor: novaQuantidade <= 0 ? parseFloat(form.Valor) : parseFloat(produtoSelecionado.Valor),
                Entregue: novaQuantidade <= 0
            };
        }

        await AmolacaoService.PostBaixaProduto(dtoAmolacao)
            .then(async() => {
                await AmolacaoService.Update(produtoSelecionado.Id, dto)
                    .then(() => {
                        toast.success(`Baixa de ${produtoSelecionado.Produto} realizada com sucesso`);
                        onClose();
                    })
            })
            .catch(() => {
                toast.error(`Erro ao realizar essa operação`);
            })
    }


    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >

            <TituloModal 
                titulo={'Baixa de Produto'} 
                subTitulo={'Preencha as informações para dar baixa no produto'}/>

            <Form layout="vertical" onFinish={submitForm}>
                <Row gutter={12}>

                    {
                        pago && <p>Este(a) <b>{produtoSelecionado.Produto}</b> ja está pago, deseja confirmar a entrega ?</p>
                    }

                    { 
                    !pago &&
                        <>
                            <Col md={8} sm={8} xs={12}>
                                <Form.Item
                                    label="Quantidade entregue"
                                    name="Quantidade"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}
                                >
                                <Input
                                    type="number"
                                    placeholder="Quantidade"
                                    min={1}
                                    max={produtoSelecionado?.Quantidade}
                                />
                                </Form.Item>
                            </Col>
                            
                            <Col md={6} xs={10}>
                                <Form.Item
                                    label="Valor Pago"
                                    name="Valor"
                                    rules={[{ required: true, message: messages.CampoObrigatorio }]}
                                >
                                <Input
                                    type="number"
                                    placeholder="Valor"
                                    max={999}
                                    min="0.1"
                                    step="0.1"
                                />
                            </Form.Item>
                            </Col>
                        </>
                    }

                </Row>

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />

            </Form >
        </Modal>
    );
}

export default AmolacaoBaixaModal;