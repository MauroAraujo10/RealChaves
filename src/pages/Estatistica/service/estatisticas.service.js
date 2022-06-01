import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';
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
                copias.push({
                    Id: x.val().key,
                    key: x.val().key,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                    Data: x.val().Data
                })

                let dataSplit = x.val().Data.split('/');

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
                Copias: copias,
                CopiasFeitasHoje: copiasFeitasHoje,
                CopiasFeitasEsteMes: copiasFeitasEsteMes,
                CopiasFeitasTotal: copiasFeitasTotal,
                ValorCopiasFeitasHoje: valorCopiasFeitasHoje,
                ValorCopiasFeitasEsteMes: valorCopiasFeitasEsteMes,
                ValorCopiasFeitasTotal: valorCopiasFeitasTotal
            }
        })

        return dto;
    },
    async getEstatisticaDescartes() {
        let dto = {};

        await service.app.ref(tabelas.Descarte).once('value', (snapshot) => {
            let descartes = [];
            let chavesDescartadasHoje = 0;
            let chavesDescartadasEsteMes = 0;
            let chavesDescartadasTotal = 0;

            snapshot.forEach((x) => {
                descartes.push({
                    key: x.val().key,
                    Data: x.val().Data,
                    Quantidade: x.val().Quantidade,
                });

                let dataSplit = x.val().Data.split('/');

                if (x.val().Data === dataAtual)
                    chavesDescartadasHoje = chavesDescartadasHoje + x.val().Quantidade;

                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual)
                    chavesDescartadasEsteMes = chavesDescartadasEsteMes + x.val().Quantidade;

                chavesDescartadasTotal = chavesDescartadasTotal + x.val().Quantidade;
            })
            dto = {
                Descartes: descartes,
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
            let pedidosBaixadosHoje = 0;
            let pedidosBaixadosEsteMes = 0;
            let pedidosBaixadosTotal = 0;
            let valorBaixadosHoje = 0;
            let valorBaixadosEsteMes = 0;
            let valorBaixadosTotal = 0;

            snapshot.forEach((x) => {
                pedidosEstoque.push({
                    key: x.val().key,
                    DataBaixa: x.val().DataBaixa,
                    QuantidadeRecebidaTotal: x.val().QuantidadeRecebidaTotal,
                })

                let dataSplit = x.val().DataBaixa.split('/');

                if (x.val().DataBaixa === dataAtual) {
                    pedidosBaixadosHoje++;
                    valorBaixadosHoje = valorBaixadosHoje + x.val().Valor;
                }
                
                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                    pedidosBaixadosEsteMes++;
                    valorBaixadosEsteMes = valorBaixadosEsteMes + x.val().Valor;
                }

                pedidosBaixadosTotal++;
                valorBaixadosTotal = valorBaixadosTotal + x.val().Valor;
            });

            dto = {
                PedidosBaixa: pedidosEstoque,
                PedidosBaixadosHoje: pedidosBaixadosHoje,
                PedidosBaixadosEsteMes: pedidosBaixadosEsteMes,
                PedidosBaixadosTotal: pedidosBaixadosTotal,
                valorBaixadosHoje: valorBaixadosHoje,
                valorBaixadosEsteMes: valorBaixadosEsteMes,
                valorBaixadosTotal: valorBaixadosTotal
            }
        })
        return dto;
    }
};

export default methods;