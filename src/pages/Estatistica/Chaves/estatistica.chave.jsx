import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { ResponsiveContainer, BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

import estatisticaService from '../service/estatisticas.service';

import Loading from '../../../common/components/Loading/Loading';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import EstatisticaCard from '../../../common/components/EstatisticaCard/EstatisticaCard';

import { FcDeployment, FcFilingCabinet } from "react-icons/fc";
import keyIcon from '../assets/Key-icon.png';

const EstatisticaChave = () => {
    const [dtoListaCopia, setDtoListaCopia] = useState({});
    const [dtoListaDescarte, setDtoListaDescarte] = useState([]);
    const [dtoListaPedidoEstoque, setDtoListaPedidoEstoque] = useState([]);

    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState([
        { name: 'Janeiro', valor: 53 },
        { name: 'Fevereiro', valor: 100 },
        { name: 'Março', valor: 30 },
        { name: 'Abril', valor: 53 },
        { name: 'Maio', valor: 73 },
        { name: 'Junho', valor: 23 },
        { name: 'Julho', valor: 66 },
        { name: 'Agosto', valor: 66 },
        { name: 'Setembro', valor: 70 },
        { name: 'Outubro', valor: 52 },
        { name: 'Novembro', valor: 93 },
        { name: 'Dezembro', valor: 233 },
    ]);

    useEffect(() => {
        setLoading(true);
        function getEstatisticasCopias() {
            estatisticaService.getEstatisticaCopias().then((dtoListCopia) => { setDtoListaCopia(dtoListCopia); })
        }

        function getEstatisticasDescartes() {
            estatisticaService.getEstatisticaDescartes().then((dtoListaDescartes) => { setDtoListaDescarte(dtoListaDescartes); })
        }

        function getEstatisticasPedidoEstoque() {
            estatisticaService.getEstatisticasPedidoEstoque()
                .then((dtoPedidoEstoque) => {
                    setDtoListaPedidoEstoque(dtoPedidoEstoque);
                    setLoading(false);
                })
        }

        getEstatisticasCopias();
        getEstatisticasDescartes();
        getEstatisticasPedidoEstoque();
    }, []);

    const testeFuncao = (x) => {
        alert(x.name);
    }

    return (
        <div className="mt-2">
            <HeaderForm
                titulo={'Estatísticas Chaves'}
                listaCaminhos={['Estatísticas', 'Chaves']}
            />
            {
                loading ?
                    <Loading /> :
                    <Row gutter={10} style={{ margin: '10px' }}>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Cópias de chaves feitas'}
                                icon={<img src={keyIcon} alt={'aa'} width={60} height={60} />}
                                arrayInformacoes={dtoListaCopia}
                                hoje={dtoListaCopia?.CopiasFeitasHoje}
                                esteMes={dtoListaCopia?.CopiasFeitasEsteMes}
                                total={dtoListaCopia?.CopiasFeitasTotal}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Chaves descartadas'}
                                icon={<FcDeployment size={60} />}
                                arrayInformacoes={dtoListaDescarte}
                                hoje={dtoListaDescarte?.ChavesDescartadasHoje}
                                esteMes={dtoListaDescarte?.ChavesDescartadasEsteMes}
                                total={dtoListaDescarte?.ChavesDescartadasTotal}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Pedidos de estoque feitos'}
                                icon={<FcFilingCabinet size={60} />}
                                arrayInformacoes={{dtoListaPedidoEstoque}}
                                hoje={7}
                                esteMes={73}
                                total={80}
                            />
                        </Col>
                    </Row>
            }

            <div className="container">
                <Form layout={'horizontal'}>
                    <Row style={{ background: '' }}>
                        <Col md={4}>
                            <Form.Item
                                label="Ano"
                                name="ano"
                            >
                                <Input
                                    type="number"
                                    placeholder="Quantidade"
                                    min={1}
                                    max={999}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <ResponsiveContainer height={500} style={{ margin: '20px' }}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="valor"
                            fill="#004878"
                            label={{ position: 'top' }}
                            onClick={testeFuncao}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div >
    );
}

export default EstatisticaChave;