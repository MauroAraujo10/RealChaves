import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import service from '../service/servicos.service';

class ServicosForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: '',
            Servico: '',
            Valor: ''
        };
        this.submitForm = this.submitForm.bind(this);
    }

    // componentDidMount() {
    //     const { prefix } = this.props;

    //     if (prefix === 'E') {
    //         //getById
    //     }
    // }

    submitForm(e) {
        e.preventDefault();
        const { Data, Servico, Valor } = this.state;
        console.log(Data, Servico, Valor);

        if (Data !== '' && Servico !== '' && Valor !== '') {
            service.post(this.state);
            alert('Cadastrado com sucesso');
            this.limpaForm();
        }
        else {
            alert('Preencha todos os campos');
        }
    }

    limpaForm() {
        this.setState({
            Data: '',
            Servico: '',
            Valor: '',
        })
    }

    render() {
        return (
            <div className="container">
                <h1>
                    Cadastrar Serviço
                </h1>
                <Link to="/Servicos">
                    Voltar
                </Link>
                <form
                    onSubmit={(e) => this.submitForm(e)}>

                    <label>Data:</label>
                    <input
                        type="text"
                        autoFocus
                        value={this.state.Data}
                        onChange={(e) => this.setState({ Data: e.target.value })} />

                    <label>Serviço:</label>
                    <input
                        type="text"
                        value={this.state.Servico}
                        onChange={(e) => this.setState({ Servico: e.target.value })} />

                    <label>Preço:</label>
                    <input
                        type="text"
                        value={this.state.Valor}
                        onChange={(e) => this.setState({ Valor: e.target.value })} />

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

export default ServicosForm;