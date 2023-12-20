import Service from './index';
import tabelas from '../common/Enum/tabelas';
import moment from 'moment';

const Methods = {
    async Post(dto) {
        let id = Number(Date.now());
        await Service.app.ref(tabelas.Produtos).child(id).set({
            Cliente: dto.Cliente,
            Telefone: dto.Telefone,
            Tipo: dto.Tipo,
            Marca: dto.Marca,
            DataRecebimento: moment().format('DD/MM/yyyy'),
            QuantidadeEstoque: dto.Quantidade,
            Pago: dto.Pago,
            Entregue: false
        })

        return id;
    },
    async Update(id, dto) {
        await Service.app.ref(tabelas.Produtos).child(id).set({
            Cliente: dto.Cliente,
            Telefone: dto.Telefone,
            Tipo: dto.Tipo,
            Marca: dto.Marca,
            DataRecebimento: dto.DataRecebimento,
            QuantidadeEstoque: dto.QuantidadeEstoque,
            Pago: dto.Pago,
            Entregue: dto.Entregue
        });
    },
    async Delete(id) {
        await Service.app.ref(tabelas.Produtos).child(id).remove();
    },
    async PostPagamento(dto){
        let id = Date.now();
        await Service.app.ref(tabelas.Pagamentos).child(id).set({
            IdProduto: dto.IdProduto,
            DataPagamento: moment().format('DD/MM/yyyy'),
            Quantidade: dto.Quantidade,
            Valor: dto.Valor
        })
    }
}

export default Methods;