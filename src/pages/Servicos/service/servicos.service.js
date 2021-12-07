import service from '../../../service';
import { Tables } from '../../../common/tables';

const tableName = Tables.Servicos;

const methods = {
    async post(dto){
        let id = Date.now();

        return await service.app.ref(tableName).child(id).set({
            Data: dto.Data,
            Servico: dto.Servico,
            Valor: dto.Valor,
            Pago: dto.Pago
        });
    },
    async update(id, dto){
        return await service.app.ref(tableName).child(id).set({
            Data: dto.Data,
            Servico: dto.Servico,
            Valor: dto.Valor,
            Pago: dto.Pago
        });
    },
    async delete(id){
        await service.app.ref(tableName).child(id).remove();
    }
};

export default methods;