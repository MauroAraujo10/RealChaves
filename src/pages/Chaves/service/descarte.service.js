import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';

const methods = {
    async post(dto) {
        let id = Date.now();
        return await service.app.ref(tabelas.Descarte).child(id).set({
            IdChave: dto.IdChave,
            QuantidadeDescartada: dto.QuantidadeDescartada,
            Motivo: dto.Motivo,
            Data: dto.DataDescarte
        });
    }
};

export default methods;