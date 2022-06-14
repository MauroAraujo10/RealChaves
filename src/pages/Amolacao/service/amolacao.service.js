import service from '../../../service';
import tabelas from '../../../common/Enum/tabelas';

const Methods = {
    async postProduto(dto) {
        let id = Number(Date.now());
        return await service.app.ref(tabelas.Amolacao).child(id).set({
            Cliente: dto.Cliente,
            Telefone: dto.Telefone ?? "",
            Produto: dto.Produto,
            Marca: dto.Marca,
            DataRecebimento: dto.DataRecebimento,
            Quantidade: dto.Quantidade
        })
    },
    async updateProduto(dto) {
        return await service.app.ref(tabelas.Amolacao).child(dto.Id).set({
            Cliente: dto.Cliente,
            Telefone: dto.Telefone ?? "",
            Produto: dto.Produto,
            Marca: dto.Marca,
            DataRecebimento: dto.DataRecebimento,
            Quantidade: dto.Quantidade,
            DataEntrega: dto.DataEntrega ?? "",
            Valor: dto.Valor ?? "",
        });
    },
    async delete(id) {
        await service.app.ref(tabelas.Amolacao).child(id).remove();
    },
    async postBaixaProduto(dto) {
        let id = Date.now();
        return await service.app.ref(tabelas.ProdutosAmolados).child(id).set({
            key: id,
            Cliente: dto.Cliente,
            Telefone: dto.Telefone ?? "",
            Produto: dto.Produto,
            Marca: dto.Marca,
            DataRecebimento: dto.DataRecebimento,
            DataEntrega: dto.DataEntrega,
            Quantidade: dto.Quantidade,
            Valor: dto.Valor
        })
    }
}

export default Methods;