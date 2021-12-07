import React, { Component } from 'react';

import { Modal, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { messages } from '../../../common/messages';
import moment from 'moment';
import estoqueService from '../service/estoque.service';

import { AiOutlinePrinter } from "react-icons/ai";

class ChavesEstoquePedidoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantidadeTotal: 0,
            downloadLink: ''
        };
    }

    HandlePrint() {
        const element = document.createElement('a');
        const teste = document.getElementById('modal-revisaoEstoque');
        const data = new Blob(['list'], { type: 'text/plain;charset-utf-8' });
        element.href = URL.createObjectURL(data);
        let date = moment().format('DD-MM-yyyy');
        element.download = `Atualização de Estoque ${date}.txt`;
        document.body.appendChild(element);
        element.click();
    }

    submitForm() {
        const { chavesEstoque, preco } = this.props;

        const dto = {
            chavesEstoque,
            quantidadeTotal: this.state.quantidadeTotal,
            preco
        }

        estoqueService.post(dto)
        .then(() => {
            toast.success(messages.cadastradoSucesso('Atualização de estoque'));
            this.props.onClose();
        })
        .catch(() => {
            toast.success(messages.cadastradoErro('Atualização de estoque'));
        });
    }

    render() {
        const { title, visible, onClose } = this.props;
        const { chavesEstoque, quantidadeTotal, preco } = this.props;

        return (
            <div id="modal-revisaoEstoque">
                <Modal
                    id="modal-revisaoEstoque"
                    title={title}
                    visible={visible}
                    footer={(
                        <>
                            <Button onClick={onClose}>
                                Cancelar
                            </Button>

                            <Button onClick={this.HandlePrint}>
                                <AiOutlinePrinter className="mr-3" />
                                Imprimir
                            </Button>
                            <Button
                                onClick={(e) => this.submitForm(e)}
                                type="primary"
                            >
                                Salvar
                            </Button>
                        </>
                    )}
                >
                    {
                        chavesEstoque.map((x) => {
                            return (
                                <>
                                    <h2>Marca: {x.Marca}</h2>
                                    <ul key={x.Id}>
                                        <li>Número de Série: <strong>{x.NumeroSerie}</strong></li>
                                        <li>Tipo: <strong>{x.Tipo}</strong></li>
                                        <li>Quantidade: <strong>{x.QuantidadeSolicitada}</strong></li>
                                    </ul>
                                    <hr />
                                </>
                            );
                        })
                    }
                    <ul style={{
                        textAlign: 'right',
                        listStyleType: 'none'
                    }}>
                        <li>
                            Quantidade Total:&nbsp;
                            <strong>{quantidadeTotal}</strong>
                        </li>
                        <li>
                            Valor Final R$: &nbsp;
                            <strong>{preco}</strong>
                        </li>
                        <li>
                            Data: &nbsp;
                            <strong>{moment().format('DD/MM/yyyy')}</strong>
                        </li>
                    </ul>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ChavesEstoquePedidoModal);