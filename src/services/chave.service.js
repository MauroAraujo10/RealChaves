import service from '.';
import tabelas from '../common/Enum/tabelas';
import moment from 'moment';

const methods = {
    async Post(dto) {
        let id = Date.now();
        await service.app.ref(tabelas.Chave).child(id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Data: moment().format('DD/MM/yyyy'),
            Tipo: dto.Tipo,
            Quantidade: dto.Quantidade,
            Deletado: false
        });
    },
    async Update(id, dto) {
        await service.app.ref(tabelas.Chave).child(id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Data: dto.Data,
            Tipo: dto.Tipo,
            Quantidade: dto.Quantidade,
            Deletado: false
        });
    },
    async GetById(id) {
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
    async Delete(dto) {
        await service.app.ref(tabelas.Chave).child(dto.Id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Data: dto.Data,
            Tipo: dto.Tipo,
            Quantidade: dto.Quantidade,
            Deletado: true
        });
    },
    async PostCopiaChave(dto) {
        let id = Date.now();
        await service.app.ref(tabelas.CopiasChave).child(id).set({
            IdChave: dto.IdChave,
            Data: dto.Data,
            Quantidade: dto.Quantidade,
            Valor: dto.Valor,
            TipoPagamento: dto.TipoPagamento
        })
    },
    async PostDescarte(dto) {
        let id = Date.now();
        await service.app.ref(tabelas.Descarte).child(id).set({
            IdChave: dto.IdChave,
            Data: dto.Data,
            Quantidade: dto.Quantidade,
            IdMotivo: dto.IdMotivo,
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