import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ChavesVendaModal from '../components/chaves.venda.modal';
import YesOrNoModal from '../../../common/yesOrNoModal';
import service from '../../../service';
import { messages } from '../../../common/messages';
import chaveService from '../service/chave.service';
import '../../../css/global.css';
import '../css/chaves.css';
import { Table } from 'antd';

import { FaPlusCircle, FaArrowAltCircleLeft, FaEdit, FaTrashAlt, FaDollarSign } from 'react-icons/fa';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaves: [],
            modalVendaVisible: false,
            modalExclusaoVisible: false,
            idExclusao: undefined,
            chaveSelecionada: [],
            dataCadastro: ''
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
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

    sell(dto) {
        let dataSplit = dto.Data.split('/');
        dto.dataCadastro = `${dataSplit[1]}/${dataSplit[0]}/${dataSplit[2]}`;

        this.setState({
            modalVendaVisible: true,
            chaveSelecionada: dto
        })
    }

    edit(id) {
        this.props.history.replace(`/Chaves/edit/${id}`);
    }

    delete(id) {
        this.setState({
            modalExclusaoVisible: true,
            idExclusao: id
        });
    }

    async excluirChave(id) {
        await chaveService.delete(id).then(() => {
            alert(messages.exclusaoSucesso());
            this.setState({ modalExclusaoVisible: false });
        })
    }

    render() {

        const { Column } = Table;

        return (
            <div style={{ margin: '30px' }}>
                <h1 style={{ textAlign: 'center' }}>Chaves cadastradas</h1>
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

                <Table
                    className="Grid-Chaves"
                    bordered
                    dataSource={this.state.chaves}>

                    <Column title='Marca' dataIndex='Marca' />
                    <Column title='Número de Série' dataIndex='NumeroSerie' />
                    <Column title='Quantidade' dataIndex='Quantidade' />
                    <Column title='Tipo' dataIndex='Tipo' />
                    <Column title='Data de Cadastro' dataIndex='Data' />

                    <Column
                        title="Ações"
                        dataIndex="status"
                        key="status"
                        render={(status, x) => (
                            <>
                                <FaDollarSign
                                    className="mr-3"
                                    title="Venda de Chave"
                                    onClick={() => { this.sell(x) }}
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
                            </>
                        )}
                    />
                </Table>

                <ChavesVendaModal
                    visible={this.state.modalVendaVisible}
                    chaveSelecionada={this.state.chaveSelecionada}
                    onClose={() => this.setState({ modalVendaVisible: false })}
                />
                <YesOrNoModal
                    title={'Exclusão de Chave'}
                    text={'Deseja realmente excluir esta chave ?'}
                    visible={this.state.modalExclusaoVisible}
                    onClose={() => this.setState({ modalExclusaoVisible: false })}
                    onOk={() => this.excluirChave(this.state.idExclusao)}
                />
            </div >
        );
    }
}

export default withRouter(Grid);