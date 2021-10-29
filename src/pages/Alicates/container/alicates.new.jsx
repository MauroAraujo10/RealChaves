import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { DatePicker, Breadcrumb, Switch } from 'antd';
import { messages } from '../../../common/messages';

import service from '../service/alicates.service';

import { AiOutlineHome } from "react-icons/ai";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

class AlicatesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Marca: '',
            Cliente: '',
            Quantidade: '',
            Valor: '',
            Data: '',
            Pago: false
        };
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();

        if (this.Validator()) {
            service.post(this.state);
            alert(messages.cadastradoSucesso('Alicate'));
        }
    }

    Validator() {
        const { Cliente, Quantidade, Marca, Valor, Data } = this.state;

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
        return (
            <div className="container">
                <h1>
                    Cadastrar Alicate
                </h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <AiOutlineHome className="mr-2" />
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/Alicates">
                            Alicates
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link>
                            Cadastrar Alicate
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <form
                    className="form-Chaves"
                    onSubmit={(e) => this.submitForm(e)}>

                    <label>Cliente: </label>
                    <input
                        type="text"
                        autoFocus
                        value={this.state.Cliente}
                        maxLength={50}
                        onChange={(e) => this.setState({ Cliente: e.target.value })}
                    />
                    <label>Quantidade: </label>
                    <input
                        type="number"
                        value={this.state.Quantidade}
                        onChange={(e) => this.setState({ Quantidade: e.target.value })}
                    />
                    <label>Marca: </label>
                    <input
                        type="text"
                        value={this.state.Marca}
                        onChange={(e) => this.setState({ Marca: e.target.value })}
                    />
                    <label>Valor: </label>
                    <input
                        type="number"
                        value={this.state.Valor}
                        onChange={(e) => this.setState({ Valor: e.target.value })}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <label>Data: </label>
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            onChange={(date, dateString) => this.setState({ Data: dateString })} />
                        <label style={{ marginLeft: '10px', marginRight: '10px' }}>Pago:</label>
                        <Switch
                            onChange={(value) => this.setState({ Pago: value })}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </div>
                    <button
                        className="btn-Primary"
                        type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(AlicatesForm);