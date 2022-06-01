import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Breadcrumb } from 'antd';

import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Rotas } from '../../../Routes/rotas';
import EstatisticaCard from '../../../common/components/EstatisticaCard/EstatisticaCard';

import estatisticaService from '../service/estatisticas.service';
import { AiOutlineHome, AiOutlineSnippets, AiOutlineDownSquare, AiOutlineFileDone } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const EstatisticaChave = () => {
    const [dtoListaCopia, setDtoListaCopia] = useState({});
    const [dtoListaDescarte, setDtoListaDescarte] = useState([]);
    const [dtoListaPedidoEstoque, setDtoListaPedidoEstoque] = useState([]);
    //const [chartData, setChartData] = useState([]);

    useEffect(() => {
        function getEstatisticasCopias() {
            estatisticaService.getEstatisticaCopias().then((dtoListCopia) => { setDtoListaCopia(dtoListCopia); })
        }

        function getEstatisticasDescartes() {
            estatisticaService.getEstatisticaDescartes().then((dtoListaDescartes) => { setDtoListaDescarte(dtoListaDescartes); })
        }

        function getEstatisticasPedidoEstoque() {
            estatisticaService.getEstatisticasPedidoEstoque().then((dtoPedidoEstoque) => { setDtoListaPedidoEstoque(dtoPedidoEstoque); })
        }

        getEstatisticasCopias();
        getEstatisticasDescartes();
        getEstatisticasPedidoEstoque();
    }, []);

    return (
        <>
            <div className="t-center mt-2 mb-2">
                <h1>Estatísticas Chaves</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >Estatísticas</Breadcrumb.Item>
                    <Breadcrumb.Item >Chaves</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="container2">
                <Row gutter={10} style={{ margin: '10px' }}>
                    <Col md={6} xs={24}>
                        <EstatisticaCard
                            className="mb-2"
                            title={'Cópias - Quantidade'}
                            icon={<AiOutlineSnippets className="iconVendaChave" />}
                            hoje={dtoListaCopia.CopiasFeitasHoje}
                            esteMes={dtoListaCopia.CopiasFeitasEsteMes}
                            total={dtoListaCopia.CopiasFeitasTotal}
                        />
                    </Col>

                    <Col md={6} xs={24}>
                        <EstatisticaCard
                            title={'Cópias - Valores'}
                            icon={<FaRegMoneyBillAlt className="iconVendaChave" />}
                            hoje={`R$: ${dtoListaCopia.ValorCopiasFeitasHoje}`}
                            esteMes={`R$: ${dtoListaCopia.ValorCopiasFeitasEsteMes}`}
                            total={`R$: ${dtoListaCopia.ValorCopiasFeitasTotal}`}
                        />
                    </Col>

                    <Col md={6} xs={24}>
                        <EstatisticaCard
                            title={'Descarte - Quantidade'}
                            icon={<AiOutlineDownSquare className="iconDescarte" />}
                            hoje={dtoListaDescarte?.ChavesDescartadasHoje}
                            esteMes={dtoListaDescarte?.ChavesDescartadasEsteMes}
                            total={dtoListaDescarte?.ChavesDescartadasTotal}
                        />
                    </Col>

                    <Col md={6} xs={24}>
                        <EstatisticaCard
                            title={'Baixa de Estoque - Quantidade'}
                            icon={<AiOutlineFileDone className="iconPedidoEstoque" />}
                            hoje={dtoListaPedidoEstoque.PedidosBaixadosHoje}
                            esteMes={dtoListaPedidoEstoque.PedidosBaixadosEsteMes}
                            total={dtoListaPedidoEstoque.PedidosBaixadosTotal}
                        />
                    </Col>
                </Row>
                <Row gutter={10} style={{ margin: '10px' }}>
                    <Col md={6} xs={24}>
                        <EstatisticaCard
                            title={'Baixa de Estoque - Valores'}
                            icon={<AiOutlineFileDone className="iconPedidoEstoque" />}
                            hoje={dtoListaPedidoEstoque.valorBaixadosHoje}
                            esteMes={dtoListaPedidoEstoque.valorBaixadosEsteMes}
                            total={dtoListaPedidoEstoque.valorBaixadosTotal}
                        />
                    </Col>
                    <Col md={6} xs={24}>
                        <EstatisticaCard
                            title={'Pedidos de Estoque - Valores'}
                            icon={<FaRegMoneyBillAlt className="iconVendaChave" />}
                            hoje={dtoListaPedidoEstoque?.refatora}
                            esteMes={dtoListaPedidoEstoque?.refatora}
                            total={dtoListaPedidoEstoque?.refatora}
                        />
                    </Col>
                    <Col md={6} xs={24}>
                        <EstatisticaCard
                            title={'Pedidos de Estoque - Valores'}
                            icon={<FaRegMoneyBillAlt className="iconVendaChave" />}
                            hoje={dtoListaPedidoEstoque?.refatora}
                            esteMes={dtoListaPedidoEstoque?.refatora}
                            total={dtoListaPedidoEstoque?.refatora}
                        />
                    </Col>
                    <Col md={6} xs={24}>
                        <EstatisticaCard
                            title={'Pedidos de Estoque - Valores'}
                            icon={<FaRegMoneyBillAlt className="iconVendaChave" />}
                            hoje={dtoListaPedidoEstoque?.refatora}
                            esteMes={dtoListaPedidoEstoque?.refatora}
                            total={dtoListaPedidoEstoque?.refatora}
                        />
                    </Col>
                </Row>
            </div>
            <div className="container">
                <Row style={{background: ''}}>
                    Teste
                </Row>
                <ResponsiveContainer height={500} style={{ margin: '20px' }}>
                    <BarChart data={dtoListaCopia}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="valor" fill="#004878" />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </>
    );
}

export default EstatisticaChave;