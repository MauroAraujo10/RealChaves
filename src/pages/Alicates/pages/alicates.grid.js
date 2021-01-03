import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import service from '../../../service';
import alicateService from '../service/alicates.service';
import '../css/alicates.css';

import { FaPlusCircle, FaArrowAltCircleLeft, FaEdit, FaTrashAlt } from 'react-icons/fa';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alicates: []
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount = async () => {
        await service.app.ref('Alicates').once('value', (snapshot)=> {
            let alicate = [];
            snapshot.forEach((x) => {
                alicate.push({
                    Id: x.key,
                    Marca: x.val().Marca,
                    Cliente: x.val().Cliente,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                    Data: x.val().Data,
                })
            })
            this.setState({ alicates: alicate });
        })
    }

    edit(id){
        this.props.history.replace(`/Alicates/edit/${id}`);
    }

    async delete(id){
        await alicateService.delete(id).then(() => {
            alert('Registro Excluído com sucesso');
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Alicates</h1>
                <Link to="/" className="mr-3">
                    Voltar
            </Link>
                <Link to="/Alicates/new">
                    Cadastrar
            </Link>

            <table className="tabela-alicates">
                    <th>Marca</th>
                    <th>Cliente</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Ações</th>
                    {this.state.alicates.map((x) => {
                        return (
                            <tr key={x.key}>
                                <td>{x.Marca}</td>
                                <td>{x.Cliente}</td>
                                <td>{x.Quantidade}</td>
                                <td>{x.Valor}</td>
                                <td>{x.Data}</td>
                                <td>
                                <FaEdit className="mr-3" onClick={() => this.edit(x.Id)}/>
                                <FaTrashAlt onClick={() => this.delete(x.Id)}/>
                                </td>
                            </tr>
                        );
                    })}
                </table>

            </div>
        );
    }
}

export default withRouter(Grid);