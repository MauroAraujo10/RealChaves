import service from '../../service/';
import tabelas from '../../common/Messages/tabelas';

const methods = {
    post(dto){
        return service.app.ref(tabelas.Configuracoes).set({
            DarkTheme: dto.DarkTheme,
            Paginacao: dto.Paginacao
        })
    }
}

export default methods;