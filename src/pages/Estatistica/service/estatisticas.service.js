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
                    copiasFeitasHoje += x.val().Quantidade;
                    valorCopiasFeitasHoje += x.val().Valor;
                }

                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                    copiasFeitasEsteMes += x.val().Quantidade;
                    valorCopiasFeitasEsteMes += x.val().Valor;
                }

                copiasFeitasTotal += x.val().Quantidade;
                valorCopiasFeitasTotal += x.val().Valor;
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

                if (x.val().Data === dataAtual)
                    chavesDescartadasHoje += x.val().Quantidade;

                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual)
                    chavesDescartadasEsteMes += x.val().Quantidade;

                chavesDescartadasTotal += x.val().Quantidade;
            })

            dto = {
                Vetor: descartes,
                ChavesDescartadasHoje: chavesDescartadasHoje,
                ChavesDescartadasEsteMes: chavesDescartadasEsteMes,
                ChavesDescartadasTotal: chavesDescartadasTotal
            };
        })
        return dto;
    },
    async getEstatisticasPedidoEstoque() {
        let dto = {};

        await service.app.ref(tabelas.PedidoEstoque).once('value', (snapshot) => {

            let pedidosEstoque = [];

            let pedidosEstoqueFeitosHoje = 0;
            let pedidosEstoqueFeitosEsteMes = 0;
            let pedidosEstoqueFeitosTotal = 0;

            snapshot.forEach((x) => {
                let dataSplit = x.val().DataPedido.split('/');

                pedidosEstoque.push({
                    datasConvertida: {
                        Data: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                        Quantidade: 1
                    }
                })

                if (x.val().DataPedido === dataAtual)
                    pedidosEstoqueFeitosHoje++;

                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual)
                    pedidosEstoqueFeitosEsteMes++;

                pedidosEstoqueFeitosTotal++;
            })

            dto = {
                Vetor: pedidosEstoque,
                PedidosEstoqueFeitosHoje: pedidosEstoqueFeitosHoje,
                PedidosEstoqueFeitosEsteMes: pedidosEstoqueFeitosEsteMes,
                PedidosEstoqueFeitosTotal: pedidosEstoqueFeitosTotal
            }
        })
        return dto;
    },
    async getProdutosAmolados() {
        let dto = {};

        await service.app.ref(tabelas.ProdutosAmolados).once('value', snap => {

            let alicatesAmolados = [];
            let tesourasAmoladas = [];
            let facasAmoladas = [];

            let alicatesAmoladosHojeQuantidade = 0;
            let alicatesAmoladosEsteMesQuantidade = 0;
            let alicatesAmoladosTotalQuantidade = 0;
            let alicatesAmoladosHojeValor = 0;
            let alicatesAmoladosEsteMesValor = 0;
            let alicatesAmoladosTotalValor = 0;

            let tesourasAmoladosHojeQuantidade = 0;
            let tesourasAmoladosEsteMesQuantidade = 0;
            let tesourasAmoladosTotalQuantidade = 0;
            let tesourasAmoladosHojeValor = 0;
            let tesourasAmoladosEsteMesValor = 0;
            let tesourasAmoladosTotalValor = 0;

            let facasAmoladosHojeQuantidade = 0;
            let facasAmoladosEsteMesQuantidade = 0;
            let facasAmoladosTotalQuantidade = 0;
            let facasAmoladosHojeValor = 0;
            let facasAmoladosEsteMesValor = 0;
            let facasAmoladosTotalValor = 0;

            snap.forEach((x) => {
                let dataSplit = x.val().DataEntrega.split('/');

                switch (x.val().Produto) {
                    case 'Alicate':
                        alicatesAmolados.push({
                            datasConvertida: {
                                Data: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                                Quantidade: x.val().Quantidade
                            }
                        })

                        if (x.val().DataEntrega === dataAtual) {
                            alicatesAmoladosHojeQuantidade += x.val().Quantidade;
                            alicatesAmoladosHojeValor += x.val().Valor;
                        }

                        if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                            alicatesAmoladosEsteMesQuantidade += x.val().Quantidade;
                            alicatesAmoladosEsteMesValor += x.val().Valor;
                        }

                        alicatesAmoladosTotalQuantidade += x.val().Quantidade;
                        alicatesAmoladosTotalValor += x.val().Valor;

                        break;

                    case 'Tesoura':
                        tesourasAmoladas.push({
                            datasConvertida: {
                                Data: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                                Quantidade: x.val().Quantidade
                            }
                        })

                        if (x.val().DataEntrega === dataAtual) {
                            tesourasAmoladosHojeQuantidade += x.val().Quantidade;
                            tesourasAmoladosHojeValor += x.val().Valor;
                        }

                        if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                            tesourasAmoladosEsteMesQuantidade += x.val().Quantidade;
                            tesourasAmoladosEsteMesValor += x.val().Valor;
                        }

                        tesourasAmoladosTotalQuantidade += x.val().Quantidade;
                        tesourasAmoladosTotalValor += x.val().Valor;
                        break;

                    case 'Faca':
                        facasAmoladas.push({
                            datasConvertida: {
                                Data: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                                Quantidade: x.val().Quantidade
                            }
                        })

                        if (x.val().DataEntrega === dataAtual) {
                            facasAmoladosHojeQuantidade += x.val().Quantidade;
                            facasAmoladosHojeValor += x.val().Valor;
                        }

                        if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                            facasAmoladosEsteMesQuantidade += x.val().Quantidade;
                            facasAmoladosEsteMesValor += x.val().Valor;
                        }

                        facasAmoladosTotalQuantidade += x.val().Quantidade;
                        facasAmoladosTotalValor += x.val().Valor;
                        break;

                    default:
                        break;
                }
            })

            dto = {
                VetorAlicates: alicatesAmolados,
                VetorTesouras: tesourasAmoladas,
                VetorFacas: facasAmoladas,

                AlicatesAmoladosHojeQuantidade: alicatesAmoladosHojeQuantidade,
                AlicatesAmoladosEsteMesQuantidade: alicatesAmoladosEsteMesQuantidade,
                AlicatesAmoladosTotalQuantidade: alicatesAmoladosTotalQuantidade,
                AlicatesAmoladosHojeValor: alicatesAmoladosHojeValor,
                AlicatesAmoladosEsteMesValor: alicatesAmoladosEsteMesValor,
                AlicatesAmoladosTotalValor: alicatesAmoladosTotalValor,

                TesourasAmoladosHojeQuantidade: tesourasAmoladosHojeQuantidade,
                TesourasAmoladosEsteMesQuantidade: tesourasAmoladosEsteMesQuantidade,
                TesourasAmoladosTotalQuantidade: tesourasAmoladosTotalQuantidade,
                TesourasAmoladosHojeValor: tesourasAmoladosHojeValor,
                TesourasAmoladosEsteMesValor: tesourasAmoladosEsteMesValor,
                TesourasAmoladosTotalValor: tesourasAmoladosTotalValor,

                FacasAmoladosHojeQuantidade: facasAmoladosHojeQuantidade,
                FacasAmoladosEsteMesQuantidade: facasAmoladosEsteMesQuantidade,
                FacasAmoladosTotalQuantidade: facasAmoladosTotalQuantidade,
                FacasAmoladosHojeValor: facasAmoladosHojeValor,
                FacasAmoladosEsteMesValor: facasAmoladosEsteMesValor,
                FacasAmoladosTotalValor: facasAmoladosTotalValor,
            };
        })
        return dto;
    },
    async getServicos() {
        let dto = {};

        await service.app.ref(tabelas.Servicos).once('value', (snapshot) => {

            let servicos = [];

            let servicosFeitosHojeQuantidade = 0;
            let servicosFeitosEsteMesQuantidade = 0;
            let servicosFeitosTotalQuantidade = 0;
            let servicosFeitosHojeValor = 0;
            let servicosFeitosEsteMesValor = 0;
            let servicosFeitosTotalValor = 0;

            snapshot.forEach((x) => {
                let dataSplit = x.val().Data.split('/');

                servicos.push({
                    datasConvertida: {
                        Data: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                        Quantidade: 1
                    }
                })

                if (x.val().Data === dataAtual) {
                    servicosFeitosHojeQuantidade++;
                    servicosFeitosHojeValor += x.val().Valor;
                }

                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual){
                    servicosFeitosEsteMesQuantidade++;
                    servicosFeitosEsteMesValor += x.val().Valor;
                }

                servicosFeitosTotalQuantidade ++;
                servicosFeitosTotalValor += x.val().Valor;
            })

            dto = {
                Vetor: servicos,
                ServicosFeitosHojeQuantidade: servicosFeitosHojeQuantidade,
                ServicosFeitosEsteMesQuantidade: servicosFeitosEsteMesQuantidade,
                ServicosFeitosTotalQuantidade: servicosFeitosTotalQuantidade,
                ServicosFeitosHojeValor: servicosFeitosHojeValor,
                ServicosFeitosEsteMesValor: servicosFeitosEsteMesValor,
                ServicosFeitosTotalValor: servicosFeitosTotalValor,
            };
        })
        return dto;
    }
};

export default methods;