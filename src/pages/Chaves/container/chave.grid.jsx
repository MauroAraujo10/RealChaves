import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import service from '../../../service';
import chaveService from '../service/chave.service';
import '../../../css/global.css';
import '../css/chaves.css';

import { FaPlusCircle, FaArrowAltCircleLeft, FaEdit, FaTrashAlt } from 'react-icons/fa';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaves: []
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount = async () => {
        await service.app.ref('Chave').once('value', (snapshot) => {

            let chaves = [];
            snapshot.forEach((x) => {
                chaves.push({
                    Id: x.key,
                    Marca: x.val().Marca,
                    NumeroSerie: x.val().NumeroSerie,
                    Quantidade: x.val().Quantidade,
                    Tipo: x.val().Tipo,
                    Data: x.val().Data
                })
            })
            this.setState({ chaves: chaves });
        });
    }

    edit(id){
        this.props.history.replace(`/Chaves/edit/${id}`);
    }
    
    async delete(id){
        await chaveService.delete(id).then(() => {
            alert('Registro Excluído com sucesso');
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Grid Chaves</h1>
                <div style={{textAlign: "right"}}>
                    <Link to="/" className="btn-Primary">
                        <FaArrowAltCircleLeft className="mr-3" />
                        Voltar
                    </Link>

                    <Link to="/Chaves/new" className="btn-Primary">
                        <FaPlusCircle className="mr-3"/>
                        Cadastrar
                    </Link>
                </div>

                <table className="tabela-chaves">
                    <th>Marca</th>
                    <th>Número de Série</th>
                    <th>Quantidade</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Ações</th>
                    {this.state.chaves.map((x) => {
                        return (
                            <tr key={x.key}>
                                <td>{x.Marca}</td>
                                <td>{x.NumeroSerie}</td>
                                <td>{x.Quantidade}</td>
                                <td>{x.Tipo}</td>
                                <td>{x.Data}</td>
                                <td>
                                <FaEdit className="mr-3" onClick={() => this.edit(x.Id)}/>
                                <FaTrashAlt onClick={() => this.delete(x.Id)}/>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div >
        );
    }
}

export default withRouter(Grid);