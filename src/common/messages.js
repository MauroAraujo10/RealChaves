export const messages = {
    cadastradoSucesso: (produto) => {
        return `${produto} cadastrado(a) com sucesso !`;
    },
    EditadoSucesso: (produto) => {
        return `${produto} editado(a) com sucesso !`;
    },
    exclusaoSucesso: () => {
        return `Registro excluído com sucesso !`;
    },
    excluirRegistro: (valor) => {
        return `Deseja realmente excluir este ${valor} ?`
    },
    valoInferior: (valor) => {
        return `O campo ${valor} deve ser maior do que 0`;
    },
    quantidadeIncorreta: ()=> {
        return 'Não foi possivel realizar a venda, pois a quantidade vendida é maior que o estoque';
    },
    CampoVazio: (valor) =>{
        return `Campo ${valor} não pode estar vazio !`
    },
    CampoObrigatorio: () =>{
        return 'Campo Obrigatório !';
    }
};