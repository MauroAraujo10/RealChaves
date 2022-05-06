import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';

const methods = {
    async post(dto){
        let id = Date.now();
        return await service.app.ref(tabelas.Servicos).child(id).set({
            key: id,
            Servico: dto.Servico,
            Data: dto.Data,
            Pago: dto.Pago,
            Valor: dto.Valor
        });
    },
    async update(dto){
        return await service.app.ref(tabelas.Servicos).child(dto.Id).set({
            Servico: dto.Servico,
            Data: dto.Data,
            Pago: dto.Pago,
            Valor: dto.Valor
        });
    },
    async delete(id){
        await service.app.ref(tabelas.Servicos).child(id).remove();
    }
};

export default methods;