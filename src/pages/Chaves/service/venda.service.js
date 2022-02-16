import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';

const Methods = {
    post(dto) {
        let id = Date.now();
        return service.app.ref(tabelas.Vendas).child(id).set({
            idProduto: 1231,
            Data: dto.Data,
            Quantidade: dto.Quantidade,
            Valor: dto.Valor
        })
    }
}

export default Methods;