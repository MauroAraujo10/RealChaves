import service from '../../../service';
import tabelas from '../../../common/tabelas';
import moment from 'moment';

const methods = {

    async post(dto) {
        let id = Date.now();

        await service.app.ref(tabelas.Estoque).child(id).set({
            Data: moment().format('DD/MM/yyyy'),
            Valor: dto.Preco,
            Quantidade: dto.QuantidadeTotal,
            Chaves: dto.ChavesEstoque
        });

        dto.ChavesEstoque.forEach(x => {
            service.app.ref(tabelas.Chave).child(x.Id).set({
                Data: x.Data,
                Marca: x.Marca,
                NumeroSerie: x.NumeroSerie,
                Quantidade: Number(x.Quantidade) + Number(x.QuantidadeSolicitada),
                Tipo: x.Tipo
            })
        });
    },
};

export default methods;