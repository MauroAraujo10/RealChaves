import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';

const methods = {

    async post(dto) {
        let id = Date.now();
        return await service.app.ref(tabelas.Chave).child(id).set({
            Marca: dto.Marca,
            NumeroSerie: Number(dto.NumeroSerie),
            Quantidade: Number(dto.Quantidade),
            Tipo: dto.Tipo,
            Data: dto.Data
        });
    },
    async update(dto) {
        return await service.app.ref(tabelas.Chave).child(dto.Id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Quantidade: dto.Quantidade,
            Tipo: dto.Tipo,
            Data: dto.Data
        });
    },
    async getById(id) {
        await service.app.ref(tabelas.Chave).child(id).once('value', (snapshot) => {
            return {
                Marca: snapshot.val().Marca,
                NumeroSerie: snapshot.val().NumeroSerie,
                Quantidade: snapshot.val().Quantidade,
                Tipo: snapshot.val().Tipo
            }
        });
    },
    async delete(id) {
        await service.app.ref(tabelas.Chave).child(id).remove();
    }
};

export default methods;