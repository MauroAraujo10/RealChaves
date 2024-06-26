import Service from './index';
import Tabelas from '../common/Enum/tabelas';
import moment from 'moment';

const methods = {
    async GetAllServicos() {
        let servicos = [];

        await Service.app.ref(Tabelas.Servicos).once('value', snapshot => {
            snapshot.forEach((servico) => {
                if (servico.val().Pago) {
                    servicos.push({
                        Data: servico.val().Data,
                        Descricao: servico.val().Descricao,
                        Valor: servico.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    });
                }
            })
        })

        return servicos;
    },
    async Post(dto) {
        let id = Date.now();
        await Service.app.ref(Tabelas.Servicos).child(id).set({
            Descricao: dto.Descricao,
            Data: moment().format('DD/MM/yyyy'),
            Pago: dto.Pago,
            Valor: dto.Valor,
            TipoPagamento: dto.TipoPagamento
        });
    },
    async Update(id, dto) {
        await Service.app.ref(Tabelas.Servicos).child(id).set({
            Descricao: dto.Descricao,
            Data: dto.Data,
            Pago: dto.Pago,
            Valor: dto.Valor,
            TipoPagamento: dto.TipoPagamento
        });
    },
    async Delete(id) {
        await Service.app.ref(Tabelas.Servicos).child(id).remove();
    }
};

export default methods;