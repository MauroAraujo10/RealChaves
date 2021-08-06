import service from '../../../service';
const tableName = 'Vendas';

const methods = {
    async postVenda(dto) {
        let id = Date.now();

        await service.app.ref(tableName).child(id).set({
            Data: dto.Data,
            IdProduto: dto.IdProduto,
            Produto: dto.Produto,
            Quantidade: Number(dto.QuantidadeVendida),
            Valor: dto.Valor
        });
    }
};

export default methods;