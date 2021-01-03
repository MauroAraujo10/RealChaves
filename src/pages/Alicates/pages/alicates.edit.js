import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import service from '../../../service';
import alicateService from '../service/alicates.service';

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            Marca: '',
            Cliente: '',
            Quantidade: '',
            Valor: '',
            Data: '',
        };
        this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({id});

        await service.app.ref('Alicates').child(id).once('value', (snapshot) => {
            this.setState({
                Marca: snapshot.val().Marca,
                Cliente: snapshot.val().Cliente,
                Quantidade: snapshot.val().Quantidade,
                Valor: snapshot.val().Valor,
                Data: snapshot.val().Data,
            })
        })
    }

    submitForm(e){
        e.preventDefault();
        const { Marca, Cliente, Quantidade, Valor, Data } = this.state;

        if (Marca !== '' && Cliente !== '' && Quantidade !== '' && Valor !== '' && Data !== '') {
            alicateService.update(this.state);
            alert('Editado com sucesso');
        }
        else {
            alert('Preencha todos os campos');
        }

    }

    render() {
        return (
            <div className="container">
                <h1>
                    Editar Alicate
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
                        onChange={(e) => this.setState({Cliente: e.target.value})}
                    />
                    <label>Marca: </label>
                    <input 
                        type="text"
                        value={this.state.Marca}
                        onChange={(e) => this.setState({Marca: e.target.value})}
                    />
                    <label>Quantidade: </label>
                    <input 
                        type="number"
                        value={this.state.Quantidade}
                        onChange={(e) => this.setState({Quantidade: e.target.value})}
                    />
                    <label>Valor: </label>
                    <input 
                        type="number"
                        value={this.state.Valor}
                        onChange={(e) => this.setState({Valor: e.target.value})}
                    />
                    <label>Data: </label>
                    <input 
                        type="text"
                        value={this.state.Data}
                        onChange={(e) => this.setState({Data: e.target.value})}
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

export default withRouter(Edit);