import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ChavesVendaModal from '../components/chaves.venda.modal';
import service from '../../../service';
import { messages } from '../../../common/messages';
import chaveService from '../service/chave.service';
import '../../../css/global.css';
import '../css/chaves.css';

import { FaPlusCircle, FaArrowAltCircleLeft, FaEdit, FaTrashAlt, FaDollarSign } from 'react-icons/fa';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaves: [],
            modalVisible: false,
            chaveSelecionada: [],
            dataCadastro: ''
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount(){
        service.app.ref('Chave').on('value', (snapshot) => {

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

    sell(dto){
        let dataSplit = dto.Data.split('/');
        dto.dataCadastro = `${dataSplit[1]}/${dataSplit[0]}/${dataSplit[2]}`;

        this.setState({ 
            modalVisible: true, 
            chaveSelecionada: dto
        })
    }

    edit(id) {
        this.props.history.replace(`/Chaves/edit/${id}`);
    }

    async delete(id) {
        await chaveService.delete(id).then(() => {
            alert(messages.exclusaoSucesso());
        })
    }

    closeModal(){
        this.setState({ 
            modalVisible: false,
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Grid Chaves</h1>
                <div style={{ textAlign: "right" }}>
                    <Link to="/" className="btn-Primary">
                        <FaArrowAltCircleLeft className="mr-3" />
                        Voltar
                    </Link>

                    <Link to="/Chaves/new" className="btn-Primary">
                        <FaPlusCircle className="mr-3" />
                        Cadastrar
                    </Link>
                </div>

                <div style={{ float: 'right', marginTop: '20px' }}>
                    <h4>Número de Registros: {this.state.chaves.length}</h4>
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
                                    <FaDollarSign
                                        className="mr-3"
                                        title="Venda de Chave"
                                        onClick={() => this.sell(x)}
                                    />
                                    <FaEdit
                                        className="mr-3"
                                        title="Edição de Chave"
                                        onClick={() => this.edit(x.Id)}
                                    />

                                    <FaTrashAlt
                                        title="Deletar Chave"
                                        onClick={() => this.delete(x.Id)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </table>
                <ChavesVendaModal
                    visible={this.state.modalVisible}
                    chaveSelecionada={this.state.chaveSelecionada}
                    onClose={() => this.closeModal() }
                    onSave={this.VenderChave}
                />
            </div >
        );
    }
}

export default withRouter(Grid);