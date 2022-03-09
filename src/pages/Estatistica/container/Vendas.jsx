import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import tabelas from '../../../common/Messages/tabelas';
import service from '../../../service'
import serviceVendas from '../service/estatisticas.service';

class Vendas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Vendas: []
        };
    }

    componentDidMount = async () => {
        console.log(service);
        await service.app.ref(tabelas.Vendas).once('value', (snapshot) => {

            let vendas = [];
            snapshot.forEach((x) => {
                vendas.push({
                    Id: x.key,
                    Produto: x.val().Produto,
                    Data: x.val().Data,
                    IdProduto: x.val().IdProduto,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor
                })
            })
            this.setState({ Vendas: vendas });
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Vendas</h1>
                <br />
                <Link to="/Estatisticas">
                    Voltar
                </Link>

                <table className="tabela-chaves">
                    <th>Produto</th>
                    <th>Data da Venda</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Ações</th>
                    {this.state.Vendas.map((x)=>{
                        return(
                            <tr key={x.key}>
                                <td>{x.Produto}</td>
                                <td>{x.Data}</td>
                                <td>{x.Quantidade}</td>
                                <td>{x.Valor}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}

export default Vendas;