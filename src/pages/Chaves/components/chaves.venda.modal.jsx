import React, { Component } from 'react';
import { Modal } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import estatisticaService from '../../Estatistica/service/estatisticas.service';
import chavesService from '../service/chave.service';
import { messages } from '../../../common/messages';

class ChavesVendaModal extends Component {
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
            alert(messages.valoInferior('Quantidade'));
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
                title="Venda de Chave"
                visible={visible}
                onCancel={onClose}
                onOk={() => this.submitForm()}>

                <form>
                    <label>Quantidade: </label>
                    <input
                        type="text"
                        value={this.state.QuantidadeVendida}
                        onChange={(e) => this.setState({ QuantidadeVendida: e.target.value })} />
                    <br />

                    <label>Valor: </label>
                    <input
                        type="text"
                        value={this.state.Valor}
                        onChange={(e) => this.setState({ Valor: e.target.value })} />
                    <br />

                    <label>Data: </label>
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

export default ChavesVendaModal;