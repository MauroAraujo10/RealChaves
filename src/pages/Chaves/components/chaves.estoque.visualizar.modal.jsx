import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { AiOutlinePrinter } from "react-icons/ai";

class ChavesEstoqueVisualizar extends Component {
    render() {
        const { title, visible, onClose } = this.props;
        const { chavesEstoque, quantidadeTotal, preco } = this.props;

        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={onClose}
                footer={(
                    <Button onClick={this.HandlePrint}>
                        <AiOutlinePrinter className="mr-3" />
                            Imprimir
                        </Button>
                )}
            >

            </Modal>
        );
    }
}

export default withRouter(ChavesEstoqueVisualizar);