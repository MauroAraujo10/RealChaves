import React, { Component, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Rotas } from '../../../../Routes/rotas';

import Grid from '../../../../common/components/Grid/Grid';

import service from '../../../../service';
import TotalRegistros from '../../../../common/components/TotalRegistros/TotalRegistros';

// import ChavesEstoqueVisualizarModal from '../../../components/chaves.estoque.visualizar.modal';
import tabelas from '../../../../common/Messages/tabelas';

import { Table, Breadcrumb, Input, Space, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome, AiOutlineEye } from "react-icons/ai";

const ChavesHistoricoPedidoEstoque = () => {
    const [estoqueChaves, setEstoqueChaves] = useState([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState([]);
    const [visualizarModal, setVisualizarModal] = useState(false);

    const columns = [
        { title: 'Data', dataIndex: 'Data', key: 'Data', width: '20%' },
        { title: 'Quantidade Pedida', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
        { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', width: '10%' },
        {
            title: 'Ações', width: '5%', render: (status, x) => (
                <>
                    <Tooltip title="Visualizar">
                        <AiOutlineEye
                            size={20}
                            onClick={() => handleVisualizar(x.Id)}
                        />
                    </Tooltip>
                </>
            )
        }
    ];

    useEffect(() => {
        service.app.ref(tabelas.PedidoEstoque).on('value', (snapshot) => {
            let estoqueHistorico = [];
            snapshot.forEach((x) => {
                estoqueHistorico.push({
                    Id: x.key,
                    Data: x.val().Data,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                    Chaves: x.val().Chaves
                })
            })
            setEstoqueChaves(estoqueHistorico);
        });
    }, []);

    const handleVisualizar = (id) => {
        const estoque = estoqueChaves.find(x => x.Id === id);

        if (estoque) {
            setVisualizarModal(true);
            setPedidoSelecionado(estoque);
        }
    }

    return (
        <>
            <div className="t-center mt-2">
                <h1>Histórico de Pedidos de estoque</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Histórico de Estoque</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Grid
                dataSource={estoqueChaves}
                columns={columns}
            />
        </>
    );

    // const handleVisualizar = (id) =>  {
    //     let chavesEstoque = [];
    //     service.app.ref(tabelas.Estoque).child(id).child('Chaves').on('value', (snapshot) => {
    //         snapshot.forEach((x) => {
    //             chavesEstoque.push({
    //                 Id: x.key,
    //                 Marca: x.val().Marca,
    //                 NumeroSerie: x.val().NumeroSerie,
    //                 Quantidade: x.val().Quantidade,
    //                 QuantidadeSolicitada: x.val().QuantidadeSolicitada,
    //                 Tipo: x.val().Tipo,
    //             })
    //         })
    //     })
    //     this.setState({
    //         visualizarModal: true,
    //         idEstoque: id,
    //         chavesEstoque
    //     });
    // }

}

export default ChavesHistoricoPedidoEstoque;
//     render() {
//         const { Item } = Breadcrumb;


//         <div className="container">

//             <TotalRegistros
//                 numeroRegistros={this.state.estoqueHistorico.length}
//             />

//             <Table
//                 className="Grid"
//                 bordered
//                 dataSource={this.state.estoqueHistorico}
//                 columns={columns}>
//             </Table>
//         </div>

//             <ChavesEstoqueVisualizarModal
//                 title={'Detalhes do pedido'}
//                 idEstoque={this.state.idEstoque}
//                 chavesEstoque={this.state.chavesEstoque}
//                 visible={this.state.visualizarModal}
//                 onClose={() => this.setState({ visualizarModal: false })}
//             />
//             </>
//         );
//     }
// }

// export default withRouter(EstoqueHistorico);