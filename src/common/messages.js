export const messages = {
    cadastradoSucesso: (produto) => {
        return `${produto} cadastrado(a) com sucesso !`;
    },
    exclusaoSucesso: () => {
        return `Registro excluído com sucesso !`;
    },
    valoInferior: (valor) => {
        return `O campo ${valor} deve ser maior do que 0`;
    },
    quantidadeIncorreta: ()=> {
        return 'Não foi possivel realizar a venda, pois a quantidade vendida é maior que o estoque';
    },
    CampoVazio: (quantidade) =>{
        return `Campo ${quantidade} não pode estar vazio !`
    }
};