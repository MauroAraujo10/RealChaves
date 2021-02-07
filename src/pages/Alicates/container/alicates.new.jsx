import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import service from '../service/alicates.service';

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
        const { Marca, Cliente, Quantidade, Valor, Data } = this.state;

        if (Marca !== '' && Cliente !== '' && Quantidade !== '' && Valor !== '' && Data !== '') {
            service.post(this.state);
            alert('Cadastrado com sucesso');
            this.limparCampos();
        }
        else {
            alert('Preencha todos os campos');
        }
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
                <Link to="/Alicates">
                    Voltar
                </Link>
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
                    <label>Marca: </label>
                    <input
                        type="text"
                        value={this.state.Marca}
                        onChange={(e) => this.setState({ Marca: e.target.value })}
                    />
                    <label>Quantidade: </label>
                    <input
                        type="number"
                        value={this.state.Quantidade}
                        onChange={(e) => this.setState({ Quantidade: e.target.value })}
                    />
                    <label>Valor: </label>
                    <input
                        type="number"
                        value={this.state.Valor}
                        onChange={(e) => this.setState({ Valor: e.target.value })}
                    />
                    <label>Data: </label>
                    <input
                        type="text"
                        value={this.state.Data}
                        onChange={(e) => this.setState({ Data: e.target.value })}
                    />
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