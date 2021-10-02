import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { DatePicker, Space, Breadcrumb, Switch } from 'antd';
import { messages } from '../../../common/messages';
import moment from 'moment';

import service from '../../../service';
import alicateService from '../service/alicates.service';

import { AiOutlineHome } from "react-icons/ai";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            Marca: '',
            Cliente: '',
            Quantidade: '',
            Valor: '',
            Pago: false,
            Data: '',
            DataFormatada: ''
        };
        this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        await service.app.ref('Alicates').child(id).once('value', (snapshot) => {
            this.setState({
                Id: id,
                Marca: snapshot.val().Marca,
                Cliente: snapshot.val().Cliente,
                Quantidade: snapshot.val().Quantidade,
                Valor: snapshot.val().Valor,
                Pago: snapshot.val().Pago,
                Data: snapshot.val().Data,
            })
            let dataSplit = this.state.Data.split('/');
            let dataCadastro = `${dataSplit[1]}/${dataSplit[0]}/${dataSplit[2]}`;
            this.setState({DataFormatada:dataCadastro})
        })
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
        return (
            <div className="container">
                <h1>
                    Editar Alicate
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
                        Editar Alicate
                    </Breadcrumb.Item>
                </Breadcrumb>
                <form
                    className=""
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
                    <label>Data: </label>
                    <Space direction="vertical">
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            onChange={(date, dateString) => this.setState({ Data: dateString })}
                            defaultValue={moment(this.state.DataFormatada)}/>
                    </Space>
                    <div>
                        <label>Pago: </label>
                        <Switch
                            checked ={this.state.Pago}
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

export default withRouter(Edit);