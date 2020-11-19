import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import service from './service/chave.service';

import '../../css/global.css';
import './css/chaves.css';

class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Marca: '',
            NumSerie: '',
            Quantidade: '',
            Tipo: ''
        };

        this.post = this.post.bind(this);
    }

    post(e) {
        e.preventDefault();
        const { Marca, NumSerie, Quantidade, Tipo } = this.state;
        let Qtde = Number(Quantidade);

        if (Marca !== '' && NumSerie !== '' && Quantidade !== '') {

          let dto = { Marca, NumSerie, Qtde, Tipo };

        service.post(dto).then(() => {
          
        });
        } else {
          alert('Preencha todos os campos');
        }

    }

    render() {
        return (
            <div className="container">
                <h1>Cadastrar Chave </h1>

                <Link to="/Chaves">

                    voltar
        </Link>

                <form
                    className="form-Chaves"
                    onSubmit={this.post}>
                    <label>Marca: </label>
                    <input
                        type="text"
                        autoFocus
                        onChange={(e) => this.setState({ Marca: e.target.value })} />

                    <br />

                    <label>Número de Série: </label>
                    <input
                        type="text"
                        onChange={(e) => this.setState({ NumSerie: e.target.value })} />

                    <br />

                    <label>Quantidade: </label>
                    <input
                        onChange={(e) => this.setState({ Quantidade: e.target.value })}
                        type="number" />

                    <br />

                    <label>Tipo da Chave: </label>
                    <select onChange={(e) => this.setState({ Tipo: e.target.value })}>
                        <option value="Plana">Plana</option>
                        <option value="Automotiva">Automotiva</option>
                        <option value="Metálica">Metálica</option>
                        <option value="Plana">Plástica</option>
                        <option value="Plana">Transponder</option>
                        <option value="Plana">Tetra</option>
                        <option value="Plana">Automotiva de aço</option>
                        <option value="Plana">Gorje</option>
                        <option value="Plana">Plana Colorida</option>
                        <option value="Plana">Especial</option>
                        <option value="Plana">Zamak sem canal</option>
                        <option value="Plana">Cofre</option>
                        <option value="Plana">Tubular</option>
                        <option value="Plana">Automotiva logo</option>
                        <option value="Plana">Plana de Alumínio</option>
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