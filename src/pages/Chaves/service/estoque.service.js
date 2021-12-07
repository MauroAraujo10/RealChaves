import service from '../../../service';
import { Tables } from '../../../common/tables';
import moment from 'moment';

const tableNameEstoque = Tables.Estoque;
const tableNameChave = Tables.Chave;

const methods = {

    async post(dto) {
        debugger;
        let id = Date.now();
        let data = moment().format('DD/MM/yyyy');

        // await service.app.ref(tableNameEstoque).child(id).set({
        //     Data: data,
        //     Valor: dto.preco,
        //     Quantidade: dto.quantidadeTotal
        // });

        // dto.chavesEstoque.forEach(x => {
        //     await service.app.ref(tableNameChave).child(x.Id).set({
        //         //Quantidade: dto.

        //     })
        // });
    },
};

export default methods;