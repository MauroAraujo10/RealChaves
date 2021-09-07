import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {messages} from '../../../common/messages';

import { Table } from 'antd';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import service from '../../../service';
import servicosService from '../service/servicos.service';
import YesOrNoModal from '../../../common/yesOrNoModal';

class servicosGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            servicos: [],
            modalDeleteVisible: false,
            idServico: undefined
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

    edit(id) {
        this.props.history.replace(`/Servicos/edit/${id}`);
    }

    delete(id){
        this.setState({
            modalDeleteVisible: true,
            idServico: id
        });
    }

    async excluirServico(id) {
        await servicosService.delete(id).then(() => {
            alert(messages.exclusaoSucesso());
            this.setState({ 
                modalDeleteVisible: false 
            });
        })
    }

    render() {
        const { Column } = Table;
        const iconSize = 16;

        return (
            <div className="container">
                <h1>Serviços Cadastrados</h1>
                <Link to="/servicos/new">Cadastrar Serviço</Link>
                <br />
                <Link to="/">Voltar</Link>

                <div style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
                    <h4>
                        Número de Registros: {<b>{this.state.servicos.length}</b>}
                    </h4>
                </div>

                <Table
                    className='Grid'
                    bordered
                    dataSource={this.state.servicos}>

                    <Column title='Serviço' dataIndex='Servico' width='60%'/>
                    <Column title='Data' dataIndex='Data' width="15%"/>
                    <Column title='Valor' dataIndex='Valor' width="15%"/>
                    <Column
                        title='Ações'
                        width="10%"
                        render={(status, x) => (
                            <>
                                <FaEdit
                                    title="Edição de Chave"
                                    className="mr-3"
                                    style={{ color: '#0f4c5c' }}
                                    size={iconSize}
                                    onClick={() => this.edit(x.Id)}
                                />
                                <FaTrashAlt
                                    title="Deletar Chave"
                                    style={{ color: '#FF0000' }}
                                    size={iconSize}
                                    onClick={() => this.delete(x.Id)}
                                />
                            </>
                        )}
                    />

                </Table>
                <YesOrNoModal
                    title={'Exclusão de Serviço'}
                    text={messages.excluirRegistro('Serviço')}
                    visible={this.state.modalDeleteVisible}
                    onClose={() => this.setState({ modalDeleteVisible: false })}
                    onOk={() => this.excluirServico(this.state.idServico)}
                />
            </div>
        );
    }
}

export default withRouter(servicosGrid);