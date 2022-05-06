import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';
import moment from 'moment';

const methods = {

    async post(dto) {
        let id = Date.now();
        return await service.app.ref(tabelas.Chave).child(id).set({
            key: id,
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Quantidade: dto.Quantidade,
            Tipo: dto.Tipo,
            Data: dto.Data
        });
    },
    async update(dto) {
        return await service.app.ref(tabelas.Chave).child(dto.Id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Quantidade: dto.Quantidade,
            Tipo: dto.Tipo,
            Data: dto.Data
        });
    },
    async delete(id) {
        await service.app.ref(tabelas.Chave).child(id).remove();
    },
    async postCopiaChave(dto) {
        let id = Date.now();
        return service.app.ref(tabelas.CopiasChave).child(id).set({
            key: id,
            IdChave: dto.IdChave,
            Data: dto.Data,
            Quantidade: dto.Quantidade,
            Valor: dto.Valor
        })
    },
    async postDescarte(dto) {
        let id = Date.now();
        return await service.app.ref(tabelas.Descarte).child(id).set({
            key: id,
            IdChave: dto.IdChave,
            Quantidade: dto.Quantidade,
            Motivo: dto.Motivo,
            Data: dto.Data
        });
    },
    async postPedidoEstoque(lista, quantidadeTotal) {
        let id = Date.now();

        await service.app.ref(tabelas.PedidoEstoque).child(id).set({
            key: id,
            Data: moment().format('DD/MM/yyyy'),
            QuantidadeTotal: quantidadeTotal,
            Chaves: lista
        });

        // dto.ListaPedidos.forEach((x) => {
        //     service.app.ref(tabelas.Chave).child(x.Id).set({
        //             Data: x.Data,
        //             Marca: x.Marca,
        //             NumeroSerie: Number(x.NumeroSerie),
        //             Quantidade: Number(x.Quantidade) + Number(x.QuantidadeSolicitada),
        //             Tipo: x.Tipo
        //     })
        // })

    },
    async postBaixaPedidos(dto){
        let id = Date.now();
        console.log(dto);

        // await dto.Chaves.forEach((x) => {
        //     service.app.ref(tabelas.Chave).child(x.Id).set({
        //             Data: x.Data,
        //             Marca: x.Marca,
        //             NumeroSerie: Number(x.NumeroSerie),
        //             Quantidade: Number(x.Quantidade) + Number(x.QuantidadeSolicitada),
        //             Tipo: x.Tipo
        //     })
        // })

        //await service.app.ref(tabelas.PedidoEstoque).child(dto.IdPedido).remove();

        await service.app.ref(tabelas.BaixaEstoque).child(id).set({
            key: id,
            IdPedido: dto.IdPedido,
            Data: dto.Data,
            QuantidadeTotal: dto.QuantidadeTotal,
            //Chaves: dto.Chaves
        })
    }
};

export default methods;