import React, { useEffect, useState } from 'react';
import { Row, Col, Tooltip } from 'antd';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import EstatisticaCard from '../../../common/components/EstatisticaCard/EstatisticaCard';
import Loading from '../../../common/components/Loading/Loading';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import estatisticaService from '../service/estatisticas.service';
import { FcDeployment, FcFilingCabinet } from "react-icons/fc";
import keyIcon from '../assets/Key-icon.png';

const EstatisticaChave = () => {
    const [dtoListaCopia, setDtoListaCopia] = useState({});
    const [dtoListaDescarte, setDtoListaDescarte] = useState([]);
    const [dtoListaPedidoEstoque, setDtoListaPedidoEstoque] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [chartData, setChartData] = useState([]);

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
                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                            <EstatisticaCard
                                title={'Cópias de chaves feitas'}
                                icon={<img src={keyIcon} alt={'aa'} width={60} height={60} />}
                                funcao1={() => alert('funcao 1')}
                                funcao2={() => alert('funcao 2')}
                                funcao3={() => alert('funcao 3')}
                                hoje={dtoListaCopia?.CopiasFeitasHoje}
                                esteMes={dtoListaCopia?.CopiasFeitasEsteMes}
                                total={dtoListaCopia?.CopiasFeitasTotal}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                            <EstatisticaCard
                                title={'Chaves descartadas'}
                                icon={<FcDeployment size={60} />}
                                hoje={dtoListaDescarte?.ChavesDescartadasHoje}
                                esteMes={dtoListaDescarte?.ChavesDescartadasEsteMes}
                                total={dtoListaDescarte?.ChavesDescartadasTotal}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                            <EstatisticaCard
                                title={'Pedidos de estoque feitos'}
                                icon={<FcFilingCabinet size={60} />}
                                hoje={7}
                                esteMes={73}
                                total={80}
                            />
                        </Col>
                    </Row>
            }

            <div className="container">
                <Row style={{ background: '' }}>
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
        </div >
    );
}

export default EstatisticaChave;