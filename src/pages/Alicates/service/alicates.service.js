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
};

export default methods;