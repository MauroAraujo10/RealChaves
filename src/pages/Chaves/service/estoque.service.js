import service from '../../../service';
import moment from 'moment';

const tableNameEstoque = 'Estoque';
const tableNameChave = 'Chave';

const methods = {

    async post(dto) {
        let id = Date.now();

        await service.app.ref(tableNameEstoque).child(id).set({
            Data: moment().format('DD/MM/yyyy'),
            Valor: dto.Preco,
            Quantidade: dto.QuantidadeTotal,
            Chaves: dto.ChavesEstoque
        });

        dto.ChavesEstoque.forEach(x => {
            service.app.ref(tableNameChave).child(x.Id).set({
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