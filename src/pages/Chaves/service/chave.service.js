import service from '../../../service';

const methods = {
    post(dto){
        const uid = Date.now();

        return service.app.ref('Chave').child(uid).set({
            Marca: dto.Marca,
            NumeroSerie: dto.NumSerie,
            Quantidade: dto.Qtde,
            Tipo: dto.Tipo
        });
    },
};

export default methods;