import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Input, DatePicker, Switch } from 'antd';
import { messages } from '../../../common/messages';
import moment from 'moment';

import alicateService from '../service/alicates.service';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

class AlicatesEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: undefined,
            Marca: props.alicateSelecionado.Marca,
            Cliente: undefined,
            Quantidade: undefined,
            Valor: undefined,
            Pago: false,
            Data: undefined,
            DataFormatada: undefined
        };
        this.submitForm = this.submitForm.bind(this);
    }


    componentDidMount() {
        this.setValue();
    }

    setValue() {
        const { Id, Marca, Cliente, Quantidade, Valor, Pago, Data, DataFormatada } = this.props.alicateSelecionado;
        this.setState({ Id, Marca, Cliente, Quantidade, Valor, Pago, Data, DataFormatada });
    }

    submitForm(e) {
        e.preventDefault();

        if (this.Validator()) {
            alicateService.update(this.state);
            alert(messages.EditadoSucesso('Alicate'));
        }
    }

    Validator() {
        const { Marca, Cliente, Quantidade, Valor, Data } = this.state;

        if (!Cliente) {
            alert(messages.CampoVazio('Cliente'));
            return false;
        }

        if (!Quantidade) {
            alert(messages.CampoVazio('Quantidade'));
            return false;
        }

        if (Number(Quantidade) <= 0) {
            alert(messages.valoInferior('Quantidade'));
            return false;
        }

        if (!Marca) {
            alert(messages.CampoVazio('Marca'));
            return false;
        }

        if (!Valor) {
            alert(messages.CampoVazio('Valor'));
            return false;
        }

        if (!Data) {
            alert(messages.CampoVazio('Data'));
            return false;
        }

        return true;
    }

    render() {
        const { visible, onClose } = this.props;

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                onOk={(e) => this.submitForm(e)}>
                <h2 style={{ textAlign: 'center' }}>Edição de Alicate</h2>
                <form>
                    <label>Cliente: </label>
                    <Input
                        type="text"
                        autoFocus
                        value={this.state.Cliente}
                        maxLength={50}
                        onChange={(e) => this.setState({ Cliente: e.target.value })}
                    />
                    <br />
                    <label>Quantidade: </label>
                    <Input
                        type="number"
                        value={this.state.Quantidade}
                        onChange={(e) => this.setState({ Quantidade: e.target.value })}
                    />
                    <br />
                    <label>Marca: </label>
                    <Input
                        type="text"
                        value={this.state.Marca}
                        onChange={(e) => this.setState({ Marca: e.target.value })}
                    />
                    <br />
                    <label>Valor: </label>
                    <Input
                        type="number"
                        value={this.state.Valor}
                        onChange={(e) => this.setState({ Valor: e.target.value })}
                    />
                    <br />
                    <div style={{ marginTop: '20px' }}>
                        <label>Data: </label>
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            onChange={(date, dateString) => this.setState({ Data: dateString })}
                            value={moment(this.state.dataCadastro)} />
                        <label style={{ marginLeft: '10px', marginRight: '10px' }}>Pago:</label>
                        <Switch
                            checked={this.state.Pago === 'Sim'}
                            onChange={(value) => this.setState({ Pago: value })}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </div>
                </form>

            </Modal>
        );
    }

}

export default withRouter(AlicatesEditModal);