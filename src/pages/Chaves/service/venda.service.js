import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';

const Methods = {
    post(dto, produto) {
        let id = Date.now();
        return service.app.ref(tabelas.Vendas).child(id).set({
            IdProduto: dto.IdProduto,
            Produto: produto,
            Data: dto.Data,
            Quantidade: dto.QuantidadeDeCopias,
            Valor: dto.Valor
        })
    }
}

export default Methods;