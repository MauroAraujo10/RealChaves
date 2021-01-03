import service from '../../../service';

const tableName = 'Alicates';

const methods = {
    async post(dto){
        let id = Date.now();

        return await service.app.ref(tableName).child(id).set({
            Marca: dto.Marca,
            Cliente: dto.Cliente,
            Quantidade: Number(dto.Quantidade),
            Valor: dto.Valor,
            Data: dto.Data
        });
    },
    async update(dto){
        return await service.app.ref(tableName).child(dto.id).set({
            Marca: dto.Marca,
            Cliente: dto.Cliente,
            Quantidade: Number(dto.Quantidade),
            Valor: dto.Valor,
            Data: dto.Data
        });
    },
    async delete(id){
        await service.app.ref(tableName).child(id).remove();
    }
};

export default methods;