import service from '../../../service';
import tabelas from '../../../common/Enum/tabelas';
import moment from 'moment';

const methods = {
    async post(dto) {
        let id = Date.now();
        return await service.app.ref(tabelas.Chave).child(id).set({
            key: id,
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Data: moment().format('DD/MM/yyyy'),
            Tipo: dto.Tipo,
            Quantidade: dto.Quantidade,
            ListaNumeroSerie: dto.ListaNumeroSerie ? dto.ListaNumeroSerie : []
        });
    },
    async update(dto) {
        return await service.app.ref(tabelas.Chave).child(dto.Id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Quantidade: dto.Quantidade,
            Tipo: dto.Tipo,
            Data: dto.Data,
            ListaNumeroSerie: dto.ListaNumeroSerie ? dto.ListaNumeroSerie : []
        });
    },
    async getById(id) {
        let chaveGetDto;
        await service.app.ref(tabelas.Chave).child(id).once('value', x => {
            chaveGetDto = {
                key: id,
                Marca: x.val()?.Marca,
                NumeroSerie: x.val()?.NumeroSerie,
                Quantidade: x.val()?.Quantidade,
                Tipo: x.val()?.Tipo,
                Data: x.val()?.Data,
                ListaNumeroSerie: x.val().ListaNumeroSerie ? x.val().ListaNumeroSerie : []
            };
        })
        return chaveGetDto;
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
            Valor: dto.Valor,
            TipoPagamento: dto.TipoPagamento
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
            DataPedido: moment().format('DD/MM/yyyy'),
            QuantidadePedidaTotal: quantidadeTotal,
            Chaves: lista
        });
    },
    async postBaixaPedidos(dto) {
        let id = Date.now();

        await dto.Chaves.forEach((chaveSolicitada, index) => {
            this.getById(chaveSolicitada.key).then((chave) => {
                service.app.ref(tabelas.Chave).child(chave.key).set({
                    key: chave.key,
                    Marca: chave.Marca,
                    NumeroSerie: chave.NumeroSerie,
                    Data: chave.Data,
                    Quantidade: Number(chave.Quantidade) + Number(dto.ListaChaves[index].QuantidadeRecebida),
                    Tipo: chave.Tipo,
                    ListaNumeroSerie: chave.ListaNumeroSerie ? chave.ListaNumeroSerie : []
                })
                    .then(() => {
                        service.app.ref(tabelas.PedidoEstoque)
                            .child(dto.Id)
                            .remove()
                            .then(() => {
                                service.app.ref(tabelas.BaixaPedidoChaves).child(id).set({
                                    key: id,
                                    DataPedido: dto.DataPedido,
                                    DataBaixa: dto.DataBaixa,
                                    Valor: dto.Valor,
                                    Empresa: dto.Empresa,
                                    QuantidadePedidaTotal: dto.QuantidadePedidaTotal,
                                    QuantidadeRecebidaTotal: dto.QuantidadeTotalRecebida,
                                    Status: dto.Status,
                                    ListaChaves: dto.ListaChaves
                                })
                            });
                    });
            });
        })
    }
};

export default methods;