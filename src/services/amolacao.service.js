import service from './index';
import tabelas from '../common/Enum/tabelas';
import moment from 'moment';

const Methods = {
    async Post(dto) {
        let id = Number(Date.now());
        await service.app.ref(tabelas.Amolacao).child(id).set({
            Cliente: dto.Cliente,
            Telefone: dto.Telefone,
            Produto: dto.Produto,
            Marca: dto.Marca,
            DataRecebimento: moment().format('DD/MM/yyyy'),
            Quantidade: dto.Quantidade,
            Pago: dto.Pago,
            Valor: dto.Valor,
            Entregue: false
        })
    },
    async Update(id, dto) {
        await service.app.ref(tabelas.Amolacao).child(id).set({
            Cliente: dto.Cliente,
            Telefone: dto.Telefone,
            Produto: dto.Produto,
            Marca: dto.Marca,
            DataRecebimento: dto.DataRecebimento,
            Quantidade: dto.Quantidade,
            Pago: dto.Pago,
            Valor: dto.Valor,
            Entregue: dto.Entregue
        });
    },
    async Delete(id) {
        await service.app.ref(tabelas.Amolacao).child(id).remove();
    },
    async PostBaixaProduto(dto) {
        let id = Date.now();
        await service.app.ref(tabelas.ProdutosAmolados).child(id).set({
            IdProduto: dto.IdProduto,
            DataEntrega: dto.DataEntrega,
            Quantidade: dto.Quantidade,
            Valor: dto.Valor
        })
    }
}

export default Methods;