import service from '../../../service';

const tableName = 'Servicos';

const methods = {
    async post(dto){
        let id = Date.now();

        return await service.app.ref(tableName).child(id).set({
            Data: dto.Data,
            Servico: dto.Servico,
            Valor: dto.Valor,
        });
    },
    async update(id, dto){
        return await service.app.ref(tableName).child(id).set({
            Data: dto.Data,
            Servico: dto.Servico,
            Valor: dto.Valor,
        });
    },
    async delete(id){
        await service.app.ref(tableName).child(id).remove();
    }
};

export default methods;