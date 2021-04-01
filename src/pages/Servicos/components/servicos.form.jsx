import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import service from '../../../service';
import servicosService from '../service/servicos.service';

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

    async componentDidMount() {
        const { prefix } = this.props;

        if (prefix === 'E') {
            //const { id } = 1612710980709;
            const id = 1612718997034;

            await service.app.ref('Servicos').child(id).once('value', (snapshot) => {
                this.setState({
                    Data: snapshot.val().Data,
                    Servico: snapshot.val().Servico,
                    Valor: snapshot.val().Valor
                })
            });
        }
    }

    submitForm(e) {
        e.preventDefault();
        const { Data, Servico, Valor } = this.state;
        const {prefix} = this.props;

        if (Data !== '' && Servico !== '' && Valor !== '') {

            if (prefix === 'E'){
                servicosService.update(1612718997034, this.state);
                alert('Editado com sucesso');
            }
            else{
                servicosService.post(this.state);
                this.limpaForm();
                alert('Cadastrado com sucesso');
            }
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
        const {prefix} = this.props;
        
        return (
            <div className="container">
                <h1>
                    {prefix === 'E' ? 'Editar ' : 'Cadastrar '}
                    Serviço
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
                            {prefix === 'E'? 'Editar': 'Cadastrar'}
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(ServicosForm);