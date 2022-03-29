import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';

const Methods = {

    async postProduto(dto) {
        let id = Number(Date.now());
        return await service.app.ref(tabelas.EstoqueProduto).child(id).set({
            Cliente: dto.Cliente,
            Telefone: dto.Telefone,
            Produto: dto.Produto,
            Marca: dto.Marca,
            Data: dto.Data,
            Quantidade: dto.Quantidade,
            Pago: dto.Pago,
            Valor: dto.Valor
        })
    },
    async updateProduto(dto) {
        return await service.app.ref(tabelas.EstoqueProduto).child(dto.Id).set({
            Cliente: dto.Cliente,
            Telefone: dto.Telefone,
            Produto: dto.Produto,
            Marca: dto.Marca,
            Data: dto.Data,
            Quantidade: dto.Quantidade,
            Pago: dto.Pago,
            Valor: dto.Valor
        });
    },
    async delete(id) {
        await service.app.ref(tabelas.EstoqueProduto).child(id).remove();
    },
    async postBaixaProduto(dto) {
        let id = Date.now();
        return await service.app.ref(tabelas.RelatorioAmolacao).child(id).set({
            IdProduto: dto.IdProduto,
            DataEntrega: dto.DataEntrega,
            Produto: dto.Produto,
            Quantidade: dto.Quantidade,
            Valor: dto.Valor
        })
    }
}

export default Methods;