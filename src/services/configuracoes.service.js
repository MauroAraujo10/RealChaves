import Service from './index';
import Tabelas from '../common/Enum/tabelas';

const methods = {
    async GetAllMotivosDescartes(){

        let motivosDescarte = [];

        await Service.app.ref(Tabelas.MotivosDescarte).once('value', snap => {
            snap.forEach((x) => {
                motivosDescarte.push({
                    Index: Number(x.key),
                    Motivo: x.val().Motivo
                })
            })
        })

        return motivosDescarte;
    }
}

export default methods;