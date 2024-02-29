import React from 'react'
import { Modal, Form, Row, Col, Input, Tooltip, Button } from 'antd';
import { messages } from '../../../../common/Enum/messages';
import { toast } from "react-toastify";
import Grid from '../../../../common/components/Grid/Grid';

import { AiOutlinePlus } from "react-icons/ai";

const ChavePedidoEstoqueModalAdd = ({ visible, onClose, listaChavesSalvas, setListaChavesSalvas, pedidoEstoque, setPedidoEstoque, quantidadeTotal }) => {

    const submitForm = async (form) => {
        const numeroSerieForm = Number(form.NumeroSerie);
        let chave = listaChavesSalvas.find(x => x.NumeroSerie === numeroSerieForm);

        if (pedidoEstoque.find(x => x.NumeroSerie === numeroSerieForm)) {
            toast.warning("Chave ja foi cadastrada no pedido");
            return;
        }

        if (chave) {
            setPedidoEstoque([...pedidoEstoque, {
                IdChave: chave.Id,
                Marca: chave.Marca,
                NumeroSerie: numeroSerieForm,
                Tipo: chave.Tipo,
                Data: chave.Data,
                QuantidadeEmEstoque: chave.Quantidade,
                QuantidadeSolicitada: Number(form.Quantidade)
            }]);

            let newLista = listaChavesSalvas.filter((listaChavesSalvas) => listaChavesSalvas.NumeroSerie !== numeroSerieForm);
            setListaChavesSalvas(newLista);

            onClose();
            return;
        }

        toast.warning("Número de Série não encontrado ou incorreto");
    }

    const handleCloseModal = () => {
        onClose();
    }

    const columns = [
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '15%' },
        { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '15%' },
        { title: 'Quantidade em estoque', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
    ];

    return (
        <Modal
            visible={visible}
            onCancel={() => handleCloseModal()}
            destroyOnClose
            width={1200}
            footer={null}
        >

            <Form onFinish={submitForm}>

                <Row gutter={10}>

                    <Col md={6} xs={10}>
                        <Form.Item
                            label={'Número de Série'}
                            name={'NumeroSerie'}
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="number"
                                placeholder="N. Serie"
                                min={1}
                                max={99999}
                                autoFocus
                                tabIndex={1}
                            />

                        </Form.Item>
                    </Col>

                    <Col md={4}>
                        <Form.Item
                            label="Quantidade"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="number"
                                placeholder="123"
                                min={1}
                                max={999}
                                step={1}
                                tabIndex={2}
                            />

                        </Form.Item>
                    </Col>

                    <Col md={4}>

                        <Tooltip placement='top' title='Adicionar chave ao pedido de estoque'>
                            <Button
                                style={{ background: '#28A745', color: '#FFF' }}
                                icon={<AiOutlinePlus className='mr-1' size={16} />}
                                className='mr-1'
                                htmlType="submit"
                                tabIndex={3}
                            >
                                Adicionar
                            </Button>
                        </Tooltip>
                    </Col>

                </Row>
            </Form>

            <Grid
                dataSource={listaChavesSalvas}
                columns={columns}
                QuantidadeTotal={quantidadeTotal}
                pagination
            />

        </Modal>
    );
}

export default ChavePedidoEstoqueModalAdd;