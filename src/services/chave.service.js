import Service from '.';
import Tabelas from '../common/Enum/tabelas';
import moment from 'moment';

const methods = {
    async GetAllNumeroSerie() {
        let chaves = [];
        await Service.app.ref(Tabelas.Chave).once('value', snapshot => {
            snapshot.forEach((x) => {
                if (!x.val().Deletado) {
                    chaves.push({
                        Id: x.key,
                        Marca: x.val().Marca,
                        NumeroSerie: x.val().NumeroSerie,
                        Quantidade: x.val().Quantidade,
                        Tipo: x.val().Tipo,
                        Data: x.val().Data,
                    });
                }
            });
        });
        return chaves;
    },
    async Post(dto) {
        let id = Date.now();
        await Service.app.ref(Tabelas.Chave).child(id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Data: moment().format('DD/MM/yyyy'),
            Tipo: dto.Tipo,
            Quantidade: dto.Quantidade,
            Deletado: false
        });
    },
    async Update(id, dto) {
        await Service.app.ref(Tabelas.Chave).child(id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Data: dto.Data,
            Tipo: dto.Tipo,
            Quantidade: dto.Quantidade,
            Deletado: false
        });
    },
    async Delete(dto) {
        await Service.app.ref(Tabelas.Chave).child(dto.Id).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumeroSerie,
            Data: dto.Data,
            Tipo: dto.Tipo,
            Quantidade: dto.Quantidade,
            Deletado: true
        });
    },
    async PostCopiaChave(dto) {
        let id = Date.now();
        await Service.app.ref(Tabelas.CopiasChave).child(id).set({
            IdChave: dto.IdChave,
            Data: dto.Data,
            Quantidade: dto.Quantidade,
            Valor: dto.Valor,
            TipoPagamento: dto.TipoPagamento
        })
    },
    async PostDescarte(dto) {
        let id = Date.now();
        await Service.app.ref(Tabelas.Descarte).child(id).set({
            IdChave: dto.IdChave,
            Data: dto.Data,
            Quantidade: dto.Quantidade,
            IdMotivo: dto.IdMotivo,
        });
    }
};

export default methods;