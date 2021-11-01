import React, { Component } from 'react';
import { Modal, Input, DatePicker, Space } from 'antd';
import { messages } from '../../../common/messages';
import moment from 'moment';

import estatisticaService from '../../Estatistica/service/estatisticas.service';
import chavesService from '../service/chave.service';

class ChavesEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            QuantidadeVendida: undefined,
            Valor: undefined,
            Data: undefined
        };
        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm() {
        const { chaveSelecionada } = this.props;
        const { QuantidadeVendida, Data, Valor } = this.state;
        
        let diferencaQuantidade = chaveSelecionada.Quantidade - Number(this.state.QuantidadeVendida);

        if (diferencaQuantidade < 0) {
            alert(messages.quantidadeIncorreta());
            return;
        }

        if (this.Validator(Number(QuantidadeVendida), Data, Valor)) {
            const dtoVenda = {
                Data: !this.state.Data ? chaveSelecionada.Data: this.state.Data,
                IdProduto: chaveSelecionada.Id,
                Produto: "Chave",
                QuantidadeVendida: Number(QuantidadeVendida),
                Valor
            };

            chaveSelecionada.Quantidade = diferencaQuantidade;

            await estatisticaService.postVenda(dtoVenda);
            await chavesService.update(chaveSelecionada);

            alert(messages.cadastradoSucesso('Venda'));
            this.limpaForm();
            this.props.onClose();
        }
    }

    limpaForm(){
        this.setState({
            QuantidadeVendida: '',
            Valor: '',
            Data: ''
        });
    };

    Validator(quantidadeVendida, data, valor) {
        if (quantidadeVendida <= 0){
            alert(messages.ValorMinimo('Quantidade'));
            return false;
        }

        if (!quantidadeVendida) {
            alert(messages.CampoVazio('Quantidade'));
            return false;
        }

        if (!valor) {
            alert(messages.CampoVazio('Valor'));
            return false;
        }

        if(!data) {
            alert(messages.CampoVazio('Data'));
            return false;
        }

        return true;
    }

    render() {
        const { visible, onClose } = this.props;
        const { chaveSelecionada } = this.props;

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                onOk={(e) => this.submitForm(e)}>
                <h2 style={{ textAlign: 'center' }}>Edição de Chave</h2>   
                <form>
                    <label>Marca: </label>
                    <Input
                        type="text"
                        autoFocus
                        value={this.state.Marca}
                        maxLength={30}
                        onChange={(e) => this.setState({Marca: e.target.value})}
                    />
                    <br />
                    <label>Número de Série: </label>
                    <Input
                        type="number"
                        value={this.state.NumSerie}
                        max={99999}
                        min={0}
                        onChange={(e) => this.setState({NumSerie: e.target.value})}
                    />
                    <br />
                    <label>Quantidade: </label>
                    <Input
                        type="number"
                        value={this.state.Quantidade}
                        max={10}
                        min={0}
                        onChange={(e) => this.setState({Quantidade: e.target.value})}
                    />
                    <br />
                    <label>Tipo: </label>
                    <Input
                        type="text"
                        value={this.state.Tipo}
                        maxLength={5}
                        onChange={(e) => this.setState({Tipo: e.target.value})}
                    />
                    <br /> <br />
                    <label>Data de Cadastro: </label>
                    <Space direction="vertical">
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            onChange={(date, dateString) => this.setState({ Data: dateString })}
                            defaultValue={moment(chaveSelecionada.dataCadastro)} />
                    </Space>
                </form>
            </Modal>
        );
    }
}

export default ChavesEditModal;