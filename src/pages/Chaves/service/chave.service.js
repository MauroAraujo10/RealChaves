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
            Data: dto.Data,
            Tipo: dto.Tipo,
            Quantidade: dto.Quantidade,
            ListaNumeroSerie: dto.ListaNumeroSerie
        });
    },
    async update(dto) {
        return await service.app.ref(tabelas.Chave).child(dto.Id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Quantidade: dto.Quantidade,
            Tipo: dto.Tipo,
            Data: dto.Data,
            ListaNumeroSerie: dto.ListaNumeroSerie
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
            QuantidadePedidaTotal: quantidadeTotal,
            Chaves: lista
        });
    },
    async postBaixaPedidos(dto) {
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

        await service.app.ref(tabelas.BaixaPedidoChaves).child(id).set({
            key: id,
            IdPedido: dto.IdPedido,
            Data: dto.Data,
            QuantidadeTotal: dto.QuantidadeTotal,
            //Chaves: dto.Chaves
        })
    },
    async teste() {
        let dto = {};

        await service.app.ref(tabelas.CopiasChave).once('value', (snapshot) => {
            let copias = [];
            let copiasHoje = 0;
            let copiasEsteMes = 0;
            let quantidadeTotal = 0;

            let valorHoje = 45;
            let valorMes = 225;
            let valorTotal = 0;

            snapshot.forEach((x) => {
                copias.push({
                    Id: x.val().key,
                    key: x.val().key,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                    Data: x.val().Data
                })
                quantidadeTotal = quantidadeTotal + x.val().Quantidade;
                valorTotal = valorTotal + x.val().Valor;
            })
            dto = {
                CopiasHoje: copiasHoje,
                CopiasEsteMes: copiasEsteMes,
                QuantidadeTotal: quantidadeTotal,
                ValorHoje: valorHoje,
                ValorMes: valorMes,
                ValorTotal: valorTotal
            }
        })

        return dto;
    }
};

export default methods;