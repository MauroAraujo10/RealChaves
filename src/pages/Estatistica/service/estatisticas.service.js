import service from '../../../service';
import { Tables } from '../../../common/tables';

const tableName = Tables.Vendas;

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