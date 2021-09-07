import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import service from '../../../service';
import alicateService from '../service/alicates.service';
import '../css/alicates.css';
import { messages } from '../../../common/messages';
import YesOrNoModal from '../../../common/yesOrNoModal';
import { Table } from 'antd';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alicates: [],
            modalDeleteVisible: false,
            idAlicate: undefined
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount = async () => {
        await service.app.ref('Alicates').once('value', (snapshot) => {
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

    edit(id) {
        this.props.history.replace(`/Alicates/edit/${id}`);
    }

    delete(id) {
        this.setState({
            modalDeleteVisible: true,
            idAlicate: id
        });
    }

    async excluirAlicate(id) {
        await alicateService.delete(id).then(() => {
            alert(messages.exclusaoSucesso());
            this.setState({ modalDeleteVisible: false });
        })
    }

    render() {

        const { Column } = Table;
        const iconSize = 16;

        return (
            <div className="container">
                <h1>Alicates Cadastrados</h1>
                <Link to="/" className="mr-3">
                    Voltar
                </Link>
                <Link to="/Alicates/new">
                    Cadastrar
                </Link>

                <div style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
                    <h4>
                        Número de Registros: {<b>{this.state.alicates.length}</b>}
                    </h4>
                </div>
                <Table
                    className='Grid'
                    bordered
                    dataSource={this.state.alicates}>

                    <Column title='Cliente' dataIndex='Cliente' width='40%' />
                    <Column title='Quantidade' dataIndex='Quantidade' width='10%' />
                    <Column title='Marca' dataIndex='Marca' width='15%' />
                    <Column title='Valor' dataIndex='Valor' width='10%' />
                    <Column title='Data' dataIndex='Data' width='15%' />
                    <Column
                        title='Ações'
                        width='10%'
                        render={(status, x) => (
                            <>
                                <FaEdit
                                    title="Edição de Alicate"
                                    className="mr-3"
                                    style={{ color: '#0f4c5c' }}
                                    size={iconSize}
                                    onClick={() => this.edit(x.Id)}
                                />
                                <FaTrashAlt
                                    title="Deletar Alicate"
                                    style={{ color: '#FF0000' }}
                                    size={iconSize}
                                    onClick={() => this.delete(x.Id)}
                                />
                            </>
                        )}
                    />
                </Table>

                <YesOrNoModal
                    title={'Exclusão de Alicate'}
                    text={'Deseja realmente excluir este Alicate ?'}
                    visible={this.state.modalDeleteVisible}
                    onClose={() => this.setState({ modalDeleteVisible: false })}
                    onOk={() => this.excluirAlicate(this.state.idAlicate)}
                />
            </div>
        );
    }
}

export default withRouter(Grid);