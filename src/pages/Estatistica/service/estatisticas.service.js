import service from '../../../service';
import tabelas from '../../../common/tabelas';

const methods = {
    async postVenda(dto) {
        let id = Date.now();

        await service.app.ref(tabelas.Vendas).child(id).set({
            Data: dto.Data,
            IdProduto: dto.IdProduto,
            Produto: dto.Produto,
            Quantidade: Number(dto.QuantidadeVendida),
            Valor: dto.Valor
        });
    }
};

export default methods;