import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { DatePicker, Space, Breadcrumb } from 'antd';
import { messages } from '../../../common/messages';

import service from '../service/alicates.service';

import { AiOutlineHome } from "react-icons/ai";

class AlicatesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Marca: '',
            Cliente: '',
            Quantidade: '',
            Valor: '',
            Data: '',
        };
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();

        if (this.Validator()) {
            service.post(this.state);
            alert(messages.cadastradoSucesso('Alicate'));
            this.limparCampos();
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

    limparCampos() {
        this.setState({
            Marca: '',
            Cliente: '',
            Quantidade: '',
            Valor: '',
            Data: ''
        });
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
                        <Link to="/Alicates/new">
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
                    <label>Data: </label>
                    <Space direction="vertical" size={12}>
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            onChange={(date, dateString) => this.setState({ Data: dateString })}
                            value={this.state.Data} />
                    </Space>
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