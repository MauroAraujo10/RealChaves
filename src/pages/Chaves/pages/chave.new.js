import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import service from '../service/chave.service';

import '../../../css/global.css';
import '../css/chaves.css';

class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Marca: '',
            NumeroSerie: '',
            Quantidade: '',
            Tipo: 'Plana'
        };

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        const { Marca, NumeroSerie, Quantidade, Tipo } = this.state;

        if (Marca !== '' && NumeroSerie !== '' && Quantidade !== '' && Tipo !== '') {
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
            Marca: '',
            NumeroSerie: '',
            Quantidade: '',
            Tipo: 'Plana'
        })
    }

    render() {
        return (
            <div className="container">
                <h1>
                    Cadastrar Chaves
                </h1>
                <Link to="/Chaves">
                    Voltar
            </Link>
                <form
                    className="form-Chaves"
                    onSubmit={(e) => this.submitForm(e)}>
                    <label>Marca: </label>
                    <input
                        type="text"
                        autoFocus
                        value={this.state.Marca}
                        onChange={(e) => this.setState({ Marca: e.target.value })} />
                    <br />
                    <label>Número de Série: </label>
                    <input
                        type="text"
                        value={this.state.NumeroSerie}
                        onChange={(e) => this.setState({ NumeroSerie: e.target.value })} />
                    <br />
                    <label>Quantidade: </label>
                    <input
                        type="number"
                        value={this.state.Quantidade}
                        onChange={(e) => this.setState({ Quantidade: e.target.value })} />
                    <br />
                    <label>Tipo da Chave: </label>
                    <select onChange={(e) => this.setState({ Tipo: e.target.value })}>
                        <option value="Plana">Plana</option>
                        <option value="Automotiva">Automotiva</option>
                        <option value="Metálica">Metálica</option>
                        <option value="Plástica">Plástica</option>
                        <option value="PlaTransponderna">Transponder</option>
                        <option value="Tetra">Tetra</option>
                        <option value="Automotiva">Automotiva de aço</option>
                        <option value="Gorje">Gorje</option>
                        <option value="PlanaColorida">Plana Colorida</option>
                        <option value="Especial">Especial</option>
                        <option value="Zamak">Zamak sem canal</option>
                        <option value="Cofre">Cofre</option>
                        <option value="Tubular">Tubular</option>
                        <option value="AutomotivaLogo">Automotiva logo</option>
                        <option value="PlanaAlumínio">Plana de Alumínio</option>
                    </select>
                    <br />
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

export default withRouter(New);