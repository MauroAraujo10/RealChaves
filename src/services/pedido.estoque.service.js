import Service from './index';
import Tabelas from '../common/Enum/tabelas';
import moment from 'moment';

const methods = {
    async PostPedidoEstoque(dto){
        let id = Date.now();
        await Service.app.ref(Tabelas.PedidoEstoque).child(id).set({
            DataPedido: moment().format('DD/MM/yyyy'),
            QuantidadeTotal: dto.QuantidadeTotal,
            Chaves: dto.Chaves,
            Entregue: false
        })
    },
    async PostBaixaPedidoEstoque(dto){
        let id = Date.now();
        await Service.app.ref(Tabelas.BaixaPedidoChaves).child(id).set({
            IdPedidoEstoque: dto.IdPedidoEstoque,
            DataPedido: dto.DataPedido,
            DataBaixa: moment().format('DD/MM/yyyy'),
            Empresa: dto.Empresa,
            Valor: dto.Valor,
            Status: dto.Status,
            QuantidadeTotalSolicitada: dto.QuantidadeTotalSolicitada,
            QuantidadeTotalRecebida: dto.QuantidadeTotalRecebida,
            Chaves: dto.Chaves
        })
    },
    async SoftDeletePedidoEstoque(dto){
        await Service.app.ref(Tabelas.PedidoEstoque).child(dto.Id).set({
            DataPedido: dto.DataPedido,
            QuantidadeTotal: dto.QuantidadeTotal,
            Chaves: dto.Chaves,
            Entregue: true
        })
    },
    async HardDeletePedidoEstoque(id){
        await Service.app.ref(Tabelas.PedidoEstoque).child(id).remove();
    }
}
export default methods;