import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chaveService from '../service/chave.service';
import service from '../../../service';
import { messages } from '../../../common/messages';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            Marca: '',
            NumeroSerie: '',
            Quantidade: '',
            Tipo: '',
            Data: ''
        };
        this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        await service.app.ref('Chave').child(id).once('value', (snapshot) => {
            this.setState({
                Id: id,
                Marca: snapshot.val().Marca,
                NumeroSerie: snapshot.val().NumeroSerie,
                Quantidade: snapshot.val().Quantidade,
                Tipo: snapshot.val().Tipo,
                Data: snapshot.val().Data,
            })
        })
    }

    submitForm(e) {
        e.preventDefault();

        if (this.Validator()) {
            chaveService.update(this.state);
            alert(messages.EditadoSucesso('Chave'));
        }
    }

    Validator() {
        const { Marca, NumeroSerie, Quantidade, Tipo, Data } = this.state;

        if (!Marca) {
            alert(messages.CampoVazio('Marca'));
            return false;
        
        }
        if (!NumeroSerie) { 
            alert(messages.CampoVazio('Número de Série')); 
            return false; 
        }

        if (!Quantidade) {
            alert(messages.CampoVazio('Quantidade'));
            return false;
        }

        if (!Tipo) {
            alert(messages.CampoVazio('Tipo'));
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
                <h1>Edit Chaves</h1>
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
                    <label>Data: </label>
                    <input
                        type="text"
                        value={this.state.Data}
                        onChange={(e) => this.setState({ Data: e.target.value })} />
                    <br />
                    <label>Tipo da Chave: </label>
                    <select
                        value={this.state.Tipo}
                        onChange={(e) => this.setState({ Tipo: e.target.value })}>
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
                        Editar
                 </button>
                </form>
            </div>
        );
    }
}

export default Edit;