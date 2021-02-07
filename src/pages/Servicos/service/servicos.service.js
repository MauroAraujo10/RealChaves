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
};

export default methods;