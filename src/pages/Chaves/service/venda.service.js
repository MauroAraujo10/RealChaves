import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';

const Methods = {
    post(dto) {
        let id = Date.now();
        return service.app.ref(tabelas.CopiasChave).child(id).set({
            IdProduto: dto.IdProduto,
            Data: dto.Data,
            Quantidade: dto.QuantidadeDeCopias,
            Valor: dto.Valor
        })
    }
}

export default Methods;