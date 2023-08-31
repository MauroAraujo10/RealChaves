import service from '../../../services/index';
import tabelas from '../../../common/Enum/tabelas';

const methods = {
    async Post(dto) {
        let id = Date.now();
        await service.app.ref(tabelas.Servicos).child(id).set({
            Descricao: dto.Descricao,
            Data: dto.Data,
            Pago: dto.Pago,
            Valor: dto.Valor
        });
    },
    async Update(id, dto) {
        await service.app.ref(tabelas.Servicos).child(id).set({
            Descricao: dto.Descricao,
            Data: dto.Data,
            Pago: dto.Pago,
            Valor: dto.Valor
        });
    },
    async Delete(id) {
        await service.app.ref(tabelas.Servicos).child(id).remove();
    }
};

export default methods;