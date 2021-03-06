import service from '../../../service';

const tableName = 'Chave';

const methods = {
    async post(dto){
        let id = Date.now();

        return await service.app.ref(tableName).child(id).set({
            Marca: dto.Marca,
            NumeroSerie: Number(dto.NumeroSerie),
            Quantidade: Number(dto.Quantidade),
            Tipo: dto.Tipo,
            Data: dto.Data
        });
    },
    async update(dto){
        return await service.app.ref(tableName).child(dto.id).set({
            Marca: dto.Marca,
            NumeroSerie: Number(dto.NumeroSerie),
            Quantidade: Number(dto.Quantidade),
            Tipo: dto.Tipo,
            Data: dto.Data
        });
    },
    async getById(id){
        
            await service.app.ref(tableName).child(id).once('value', (snapshot) => {

                var teste = {
                    Marca: snapshot.val().Marca,
                    NumeroSerie: snapshot.val().NumeroSerie,
                    Quantidade: snapshot.val().Quantidade,
                    Tipo: snapshot.val().Tipo
                };

                return teste;
        });
    },
    async delete(id){
        await service.app.ref(tableName).child(id).remove();
    }
};

export default methods;