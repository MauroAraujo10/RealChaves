import service from '../../../service';
import tabelas from '../../../common/Enum/tabelas';
import moment from 'moment';

const dataAtual = moment().format('DD/MM/yyyy');
const mesAtual = moment().format('MM');
const anoAtual = moment().format('yyyy');

const methods = {
    async getEstatisticaCopias() {
        let dto = {};

        await service.app.ref(tabelas.CopiasChave).once('value', (snapshot) => {
            
            let copias = [];

            let copiasFeitasHoje = 0;
            let copiasFeitasEsteMes = 0;
            let copiasFeitasTotal = 0;

            let valorCopiasFeitasHoje = 0;
            let valorCopiasFeitasEsteMes = 0;
            let valorCopiasFeitasTotal = 0;

            snapshot.forEach((x) => {

                let dataSplit = x.val().Data.split('/');

                copias.push({
                    datasConvertida: {
                        Data: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                        Quantidade: x.val().Quantidade,
                        Valor: x.val().Valor
                    }
                })

                if (x.val().Data === dataAtual) {
                    copiasFeitasHoje = copiasFeitasHoje + x.val().Quantidade;
                    valorCopiasFeitasHoje = valorCopiasFeitasHoje + x.val().Valor;
                }

                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                    copiasFeitasEsteMes = copiasFeitasEsteMes + x.val().Quantidade;
                    valorCopiasFeitasEsteMes = valorCopiasFeitasEsteMes + x.val().Valor;
                }

                copiasFeitasTotal = copiasFeitasTotal + x.val().Quantidade;
                valorCopiasFeitasTotal = valorCopiasFeitasTotal + x.val().Valor;
            })
            dto = {
                Vetor: copias,
                CopiasFeitasHoje: copiasFeitasHoje,
                CopiasFeitasEsteMes: copiasFeitasEsteMes,
                CopiasFeitasTotal: copiasFeitasTotal,
                ValorCopiasFeitasHoje: valorCopiasFeitasHoje,
                ValorCopiasFeitasEsteMes: valorCopiasFeitasEsteMes,
                ValorCopiasFeitasTotal: valorCopiasFeitasTotal,
            }
        })
        return dto;
    },
    async getEstatisticaDescartes() {
        let dto = {};

        await service.app.ref(tabelas.Descarte).once('value', (snapshot) => {

            let descartes = [];
            let datasConvertidas = [];

            let chavesDescartadasHoje = 0;
            let chavesDescartadasEsteMes = 0;
            let chavesDescartadasTotal = 0;

            snapshot.forEach((x) => {

                let dataSplit = x.val().Data.split('/');

                descartes.push({
                    datasConvertida: {
                        Data: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                        Quantidade: x.val().Quantidade
                    }
                })

                if (x.val().Data === dataAtual){
                    chavesDescartadasHoje = chavesDescartadasHoje + x.val().Quantidade;
                }

                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual){
                    chavesDescartadasEsteMes = chavesDescartadasEsteMes + x.val().Quantidade;
                }

                chavesDescartadasTotal = chavesDescartadasTotal + x.val().Quantidade;
            })

            dto = {
                Vetor: descartes,
                DatasConvertidas: datasConvertidas,
                ChavesDescartadasHoje: chavesDescartadasHoje,
                ChavesDescartadasEsteMes: chavesDescartadasEsteMes,
                ChavesDescartadasTotal: chavesDescartadasTotal
            };
        })
        return dto;
    },
    async getEstatisticasPedidoEstoque() {
        let dto = {};

        await service.app.ref(tabelas.BaixaPedidoChaves).once('value', (snapshot) => {
           
            let pedidosEstoque = [];
            let datasConvertidas = [];
            let pedidosEstoqueBaixadosHoje = 0;
            let pedidosEstoqueBaixadosEsteMes = 0;
            let pedidosEstoqueBaixadosTotal = 0;

            snapshot.forEach((x) => {
                pedidosEstoque.push({
                    key: x.val().key,
                    Data: x.val().DataBaixa,
                });

            let dataSplit = x.val().DataBaixa.split('/');

                if (x.val().DataBaixa === dataAtual)
                pedidosEstoqueBaixadosHoje++;

                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual)
                pedidosEstoqueBaixadosEsteMes++;

                pedidosEstoqueBaixadosTotal++;
                datasConvertidas.push({
                    Data: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                    Quantidade: x.val().Quantidade
                    });
            })

            dto = {                
                PedidosEstoque: pedidosEstoque,
                PedidosEstoqueBaixadosHoje: pedidosEstoqueBaixadosHoje,
                PedidosEstoqueBaixadosEsteMes: pedidosEstoqueBaixadosEsteMes,
                PedidosEstoqueBaixadosTotal: pedidosEstoqueBaixadosTotal
            }
        })
        return dto;
    }
};

export default methods;