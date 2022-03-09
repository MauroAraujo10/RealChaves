import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { AiOutlinePrinter } from "react-icons/ai";

class ChavesEstoqueVisualizar extends Component {
    render() {

        const handlePrint = () => {

        }

        const { title, visible, onClose } = this.props;
        // const { quantidadeTotal, preco } = this.props;
        const { chavesEstoque } = this.props;

        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={onClose}
                footerStyle={{
                    backgroundColor: '#004878 !important',
                    borderTop: '1px dashed #000',
                    color: '#FFF'
                }}
                footer={(
                    <>
                        <Button onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handlePrint}>
                            <AiOutlinePrinter
                                className="mr-3"
                            />
                            Imprimir
                    </Button>
                    </>
                )}
            >

                {chavesEstoque.map((x) => (
                    <>
                        <h3>
                            <span className="ordenacaoLista">{Number(x.Id) + 1}</span>
                            Marca: {x.Marca}</h3>
                        <ul key={x.Id}>
                            <li>Número de Série: {x.NumeroSerie}</li>
                            <li>Quantidade Solicitada: {x.QuantidadeSolicitada}</li>
                        </ul>
                        <hr />
                    </>
                ))}

            </Modal>
        );
    }
}

export default withRouter(ChavesEstoqueVisualizar);