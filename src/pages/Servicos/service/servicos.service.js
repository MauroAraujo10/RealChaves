import service from '../../../service';
import tabelas from '../../../common/tabelas';

const methods = {
    async post(dto){
        let id = Date.now();

        return await service.app.ref(tabelas.Servicos).child(id).set({
            Data: dto.Data,
            Servico: dto.Servico,
            Valor: dto.Valor,
            Pago: dto.Pago
        });
    },
    async update(dto){
        return await service.app.ref(tabelas.Servicos).child(dto.Id).set({
            Servico: dto.Servico,
            Data: dto.Data,
            Valor: dto.Valor,
            Pago: dto.Pago
        });
    },
    async delete(id){
        await service.app.ref(tabelas.Servicos).child(id).remove();
    }
};

export default methods;