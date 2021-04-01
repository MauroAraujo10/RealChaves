import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import service from '../../../service';
import servicosService from '../service/servicos.service';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class servicosGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            servicos: []
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    async componentDidMount() {
        await service.app.ref('Servicos').once('value', (snapshot) => {

            let servicos = [];
            snapshot.forEach((x) => {
                servicos.push({
                    Id: x.key,
                    Data: x.val().Data,
                    Servico: x.val().Servico,
                    Valor: x.val().Valor
                })
            })
            this.setState({ servicos });
        });
    }

    edit(id){
        this.props.history.replace(`/Servicos/edit/${id}`);
    }

    async delete(id){
        await servicosService.delete(id).then(() => {
            alert('Registro Excluído com sucesso');
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Grid</h1>
                <Link to="/servicos/new">Cadastrar Serviço</Link>
                <br />
                <Link to="/">Voltar</Link>
                <table className="tabela-chaves">
                    <th>Data</th>
                    <th>Serviço</th>
                    <th>Valor</th>
                    <th>Ações</th>
                    {this.state.servicos.map((x) => {
                        return (
                            <tr key={x.key}>
                                <td>{x.Data}</td>
                                <td>{x.Servico}</td>
                                <td>{x.Valor}</td>
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

export default withRouter(servicosGrid);