export const messages = {
    cadastradoSucesso: (produto) => {
        return `${produto} cadastrado(a) com sucesso !`;
    },
    cadastradoErro: (produto) => {
        return `Erro ao cadastrar este(a) ${produto} !`;
    },
    EditadoSucesso: (produto) => {
        return `${produto} editado(a) com sucesso !`;
    },
    EditadoErro: (produto) => {
        return `Erro ao editar este(a) ${produto}!`;
    },
    exclusaoSucesso: () => {
        return `Registro excluído com sucesso !`;
    },
    exclusaoErro: (produto) => {
        return `Erro ao excluir este(a) ${produto}!`;
    },
    excluirRegistro: (valor) => {
        return `Deseja realmente excluir este ${valor} ?`
    },
    quantidadeIncorreta: () => {
        return 'Não foi possivel realizar a venda, pois a quantidade vendida é maior que o estoque';
    },
    estoqueIncorreto: () => {
        return 'Não foi possivel realizar esta operação, pois a quantidade solicitada é maior que o estoque';
    },
    CampoVazio: (valor) =>{
        return `Campo ${valor} não pode estar vazio !`
    },
    CampoObrigatorio: () =>{
        return 'Campo Obrigatório !';
    },
    ValorMinimo: (valor) =>{
        return `Valor mínimo permitido é ${valor}`;
    },
    funcionalidadeIndisponivel: () => {
        return 'Funcionalidade ainda não está disponível, aguarde a proxima versão !';
    }
};