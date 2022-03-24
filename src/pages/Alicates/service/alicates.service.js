import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';

const methods = {
    async post(dto) {
        let id = Date.now();

        return await service.app.ref(tabelas.Alicates).child(id).set({
            Marca: dto.Marca,
            Cliente: dto.Cliente,
            Telefone: dto.Telefone,
            Quantidade: Number(dto.Quantidade),
            Valor: dto.Valor,
            Pago: dto.Pago,
            Data: dto.Data
        });
    },
    async update(dto) {
        return await service.app.ref(tabelas.Alicates).child(dto.Id).set({
            Marca: dto.Marca,
            Cliente: dto.Cliente,
            Telefone: dto.Telefone,
            Quantidade: Number(dto.Quantidade),
            Valor: dto.Valor,
            Pago: dto.Pago,
            Data: dto.Data
        });
    },
    async delete(id) {
        await service.app.ref(tabelas.Alicates).child(id).remove();
    },
    async postAmolacao(dto) {
        let id = Date.now();
        return await service.app.ref(tabelas.AmolacaoAlicate).child(id).set({
            IdAlicate: dto.IdAlicate,
            DataEntrega: dto.DataEntrega,
            Quantidade: dto.Quantidade,
            Valor: dto.Valor
        })
    }
};

export default methods;