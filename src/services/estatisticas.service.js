import Service from './index';
import Tabelas from '../common/Enum/tabelas';
import moment from 'moment';

const dataAtual = moment().format('DD/MM/yyyy');
const mesAtual = moment().format('MM');
const anoAtual = moment().format('yyyy');

const methods = {
    async getEstatisticaCopias() {
        let dto = {};

        await Service.app.ref(Tabelas.CopiasChave).once('value', (snapshot) => {

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
                    DataCadastroReal: x.val().Data,
                    DataCadastroConvertida: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                    ValorGrid: x.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    TipoPagamento: x.val().TipoPagamento
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

        await Service.app.ref(Tabelas.Descarte).once('value', (snapshot) => {

            let descartes = [];

            let chavesDescartadasHoje = 0;
            let chavesDescartadasEsteMes = 0;
            let chavesDescartadasTotal = 0;

            snapshot.forEach((descarte) => {
                let dataSplit = descarte.val().Data.split('/');

                descartes.push({
                    DataCadastroReal: descarte.val().Data,
                    DataCadastroConvertida: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                    Quantidade: descarte.val().Quantidade,
                    Motivo: descarte.val().Motivo
                })

                if (descarte.val().Data === dataAtual)
                    chavesDescartadasHoje += descarte.val().Quantidade;

                if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual)
                    chavesDescartadasEsteMes += descarte.val().Quantidade;

                chavesDescartadasTotal += descarte.val().Quantidade;
            })

            dto = {
                Vetor: descartes,
                ChavesDescartadasHoje: chavesDescartadasHoje,
                ChavesDescartadasEsteMes: chavesDescartadasEsteMes,
                ChavesDescartadasTotal: chavesDescartadasTotal,
            };
        })
        return dto;
    },
    async getEstatisticasPedidoEstoque() {
        let dto = {};

        await Service.app.ref(Tabelas.BaixaPedidoChaves).once('value', (snapshot) => {

            let pedidosEstoque = [];

            let pedidosEstoqueFeitosHoje = 0;
            let pedidosEstoqueFeitosEsteMes = 0;
            let pedidosEstoqueFeitosTotal = 0;

            snapshot.forEach((pedidoEstoque) => {
                let dataSplit = pedidoEstoque.val().DataBaixa.split('/');

                pedidosEstoque.push({
                    DataCadastroReal: pedidoEstoque.val().DataBaixa,
                    DataCadastroConvertida: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                    Quantidade: pedidoEstoque.val().QuantidadeTotalRecebida,
                    Valor: pedidoEstoque.val().Valor,
                    ValorGrid: pedidoEstoque.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    Status: pedidoEstoque.val().Status,
                    TipoPagamento: pedidoEstoque.val().TipoPagamento
                })

                if (pedidoEstoque.val().DataBaixa === dataAtual)
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

        await Service.app.ref(Tabelas.Pagamentos).once('value', snapshot => {

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

            snapshot.forEach((pagamento) => {
                const dataSplit = pagamento.val().DataPagamento.split('/');

                switch (pagamento.val().TipoProduto) {
                    case 'Alicate':
                        alicatesAmolados.push({
                            DataCadastroReal: pagamento.val().DataPagamento,
                            DataCadastroConvertida: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                            Quantidade: pagamento.val().Quantidade,
                            Valor: pagamento.val().Valor,
                            ValorGrid: pagamento.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                            TipoPagamento: pagamento.val().TipoPagamento,
                        })

                        if (pagamento.val().DataPagamento === dataAtual) {
                            alicatesAmoladosHojeQuantidade += pagamento.val().Quantidade;
                            alicatesAmoladosHojeValor += pagamento.val().Valor;
                        }

                        if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                            alicatesAmoladosEsteMesQuantidade += pagamento.val().Quantidade;
                            alicatesAmoladosEsteMesValor += pagamento.val().Valor;
                        }

                        alicatesAmoladosTotalQuantidade += pagamento.val().Quantidade;
                        alicatesAmoladosTotalValor += pagamento.val().Valor;
                        break;

                    case 'Tesoura':
                        tesourasAmoladas.push({
                            DataCadastroReal: pagamento.val().DataPagamento,
                            DataCadastroConvertida: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                            Quantidade: pagamento.val().Quantidade,
                            Valor: pagamento.val().Valor,
                            ValorGrid: pagamento.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                            TipoPagamento: pagamento.val().TipoPagamento,
                        })

                        if (pagamento.val().DataPagamento === dataAtual) {
                            tesourasAmoladosHojeQuantidade += pagamento.val().Quantidade;
                            tesourasAmoladosHojeValor += pagamento.val().Valor;
                        }

                        if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                            tesourasAmoladosEsteMesQuantidade += pagamento.val().Quantidade;
                            tesourasAmoladosEsteMesValor += pagamento.val().Valor;
                        }

                        tesourasAmoladosTotalQuantidade += pagamento.val().Quantidade;
                        tesourasAmoladosTotalValor += pagamento.val().Valor;
                        break;

                    case 'Faca':
                        facasAmoladas.push({
                            DataCadastroReal: pagamento.val().DataPagamento,
                            DataCadastroConvertida: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                            Quantidade: pagamento.val().Quantidade,
                            Valor: pagamento.val().Valor,
                            ValorGrid: pagamento.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                            TipoPagamento: pagamento.val().TipoPagamento,
                        })

                        if (pagamento.val().DataPagamento === dataAtual) {
                            facasAmoladosHojeQuantidade += pagamento.val().Quantidade;
                            facasAmoladosHojeValor += pagamento.val().Valor;
                        }

                        if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                            facasAmoladosEsteMesQuantidade += pagamento.val().Quantidade;
                            facasAmoladosEsteMesValor += pagamento.val().Valor;
                        }

                        facasAmoladosTotalQuantidade += pagamento.val().Quantidade;
                        facasAmoladosTotalValor += pagamento.val().Valor;
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

        await Service.app.ref(Tabelas.Servicos).once('value', (snapshot) => {

            let servicos = [];

            let servicosFeitosHojeQuantidade = 0;
            let servicosFeitosEsteMesQuantidade = 0;
            let servicosFeitosTotalQuantidade = 0;
            let servicosFeitosHojeValor = 0;
            let servicosFeitosEsteMesValor = 0;
            let servicosFeitosTotalValor = 0;

            snapshot.forEach((servico) => {
                if (servico.val().Pago) {

                    let dataSplit = servico.val().Data.split('/');

                    servicos.push({
                        DataCadastroReal: servico.val().Data,
                        DataCadastroConvertida: new Date(Number(dataSplit[2]), Number(dataSplit[1] - 1), Number(dataSplit[0])),
                        Quantidade: servico.val().Quantidade,
                        Valor: servico.val().Valor,
                        ValorGrid: servico.val().Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    });

                    if (servico.val().Data === dataAtual) {
                        servicosFeitosHojeQuantidade++;
                        servicosFeitosHojeValor += servico.val().Valor;
                    }

                    if (dataSplit[1] === mesAtual && dataSplit[2] === anoAtual) {
                        servicosFeitosEsteMesQuantidade++;
                        servicosFeitosEsteMesValor += servico.val().Valor;
                    }

                    servicosFeitosTotalQuantidade++;
                    servicosFeitosTotalValor += servico.val().Valor;
                }
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