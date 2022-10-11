import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import tabelas from '../../common/Enum/tabelas';

import service from '../../service';
import { FcFaq, FcBusiness, FcKindle, FcSupport } from "react-icons/fc";

import HomeCard from '../../common/components/HomeCard/HomeCard';
import Loading from '../../common/components/Loading/Loading';

import KeyIcon from '../Estatistica/assets/Key-icon.png';
import { FcReuse, FcFilingCabinet } from "react-icons/fc";

const Home = () => {
    const [copiasChavesFeitasHoje, setCopiasChavesFeitasHoje] = useState(0);
    const [descarteChavesFeitosHoje, setDescarteChavesFeitosHoje] = useState(0);
    const [pedidoEstoqueFeitosHoje, setPedidoEstoqueFeitosHoje] = useState(0);
    const [alicatesAmoladoHoje, setAlicatesAmoladoHoje] = useState(0);
    const [servicosRealizadosHoje, setServicosRealizadosHoje] = useState(0);

    const [loading, setLoading] = useState(false);
    const dataAtual = moment().format('DD/MM/yyyy');

    useEffect(() => {
        setLoading(true);

        const getCopiasChaves = async () => {
            await service.app.ref(tabelas.CopiasChave).once('value', (snapshot) => {
                let numerocopiasChavesFeitasHoje = 0;
                snapshot.forEach((x) => {
                    if (x.val().Data === dataAtual)
                        numerocopiasChavesFeitasHoje += x.val().Quantidade;
                })
                setCopiasChavesFeitasHoje(numerocopiasChavesFeitasHoje);
            })
        }

        const getDescarteChaves = async () => {
            await service.app.ref(tabelas.Descarte).once('value', (snapshot) => {
                let numeroDescarteChavesFeitosHoje = 0;
                snapshot.forEach((x) => {
                    if (x.val().Data === dataAtual)
                        numeroDescarteChavesFeitosHoje += x.val().Quantidade;
                })
                setDescarteChavesFeitosHoje(numeroDescarteChavesFeitosHoje);
            })
        }

        const getPedidoEstoque = async () => {
            await service.app.ref(tabelas.PedidoEstoque).once('value', (snapshot) => {
                let numeropedidoEstoqueFeitosHoje = 0;
                snapshot.forEach((x) => {
                    if (x.val().DataPedido === dataAtual)
                        numeropedidoEstoqueFeitosHoje++;
                })
                setPedidoEstoqueFeitosHoje(numeropedidoEstoqueFeitosHoje);
            })
        }

        const getProdutosAmolados = async () => {
            await service.app.ref(tabelas.ProdutosAmolados).once('value', (snapshot) => {
                let numeroAlicatesAmoladosHoje = 0;
                snapshot.forEach((x) => {
                    if (x.val().DataEntrega === dataAtual)
                        numeroAlicatesAmoladosHoje += x.val().Quantidade;
                })
                setAlicatesAmoladoHoje(numeroAlicatesAmoladosHoje);
            })
        }

        const getServicos = async () => {
            await service.app.ref(tabelas.Servicos).once('value', (snapshot) => {
                let numeroServicosRealizadosHoje = 0;
                snapshot.forEach((x) => {
                    if (x.val().Data === dataAtual)
                        numeroServicosRealizadosHoje++;
                })
                setServicosRealizadosHoje(numeroServicosRealizadosHoje);
                setLoading(false);
            })
        }

        getCopiasChaves();
        getDescarteChaves();
        getPedidoEstoque();
        getProdutosAmolados();
        getServicos();
    }, [dataAtual]);

    return (
        <>
            {loading ? <Loading /> :
                <>
                    <Row style={{ display: "flex", justifyContent: 'space-around' }} className="mt-2">

                        <Col xs={22} sm={22} md={22} lg={7} xl={7} xxl={7}>
                            <HomeCard
                                icon={<img src={KeyIcon} alt={'icon'} width={40} height={40} />}
                                title='Cópias de Chaves'
                                value={copiasChavesFeitasHoje}
                                color="#808080"
                                text="Cópias que foram feitas hoje"
                            />
                        </Col>
                        <Col xs={22} sm={22} md={22} lg={7} xl={7} xxl={7}>
                            <HomeCard
                                icon={<FcReuse size={40} />}
                                title='Descarte de Chaves'
                                value={descarteChavesFeitosHoje}
                                color="#808080"
                                text="Chaves que foram descartadas hoje"
                            />
                        </Col>
                        <Col xs={22} sm={22} md={22} lg={7} xl={7} xxl={7}>
                            <HomeCard
                                icon={<FcFilingCabinet size={40} />}
                                title='Pedido de Estoque'
                                value={pedidoEstoqueFeitosHoje}
                                color="#808080"
                                text="Pedidos de estoque que foram descartadas hoje"
                            />
                        </Col>
                    </Row>

                    <Row style={{ display: "flex", justifyContent: 'space-around' }} className="mt-2">
                        <Col xs={22} sm={22} md={22} lg={7} xl={7} xxl={7}>
                            <HomeCard
                                icon={<FcKindle size={40} />}
                                title='Produtos amolados'
                                value={alicatesAmoladoHoje}
                                color="#808080"
                                text="Produtos que foram amolados hoje"
                            />
                        </Col>

                        <Col xs={22} sm={22} md={22} lg={7} xl={7} xxl={7}>
                            <HomeCard
                                icon={<FcSupport size={40} />}
                                title='Serviços Realizados'
                                value={servicosRealizadosHoje}
                                color="#808080"
                                text="Serviços que foram realizados hoje"
                            />
                        </Col>
                    </Row>
                </>
            }
        </>
    );
}

export default Home;