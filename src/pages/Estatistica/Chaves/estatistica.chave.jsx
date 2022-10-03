import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

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

    useEffect(() => {
        setLoading(true);
        function getEstatisticasCopias() {
            estatisticaService.getEstatisticaCopias().then((dtoListCopia) => { setDtoListaCopia(dtoListCopia);  })
            setLoading(false);
        }

        function getEstatisticasDescartes() {
            estatisticaService.getEstatisticaDescartes().then((dtoListaDescartes) => { setDtoListaDescarte(dtoListaDescartes); })
        }

        function getEstatisticasPedidoEstoque() {
            estatisticaService.getEstatisticasPedidoEstoque().then((dtoPedidoEstoque) => {setDtoListaPedidoEstoque(dtoPedidoEstoque);})
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
                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Cópias de chaves feitas'}
                                icon={<img src={keyIcon} alt={'icon'} width={60} height={60} />}
                                arrayInformacoes={dtoListaCopia}
                                quantidadeHoje={dtoListaCopia?.CopiasFeitasHoje}
                                quantidadeEsteMes={dtoListaCopia?.CopiasFeitasEsteMes}
                                quantidadeTotal={dtoListaCopia?.CopiasFeitasTotal}
                                valorHoje={dtoListaCopia?.ValorCopiasFeitasHoje}
                                valorEsteMes={dtoListaCopia?.ValorCopiasFeitasEsteMes}
                                valorTotal={dtoListaCopia?.ValorCopiasFeitasTotal}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Chaves descartadas'}
                                icon={<FcDeployment size={60} />}
                                arrayInformacoes={dtoListaDescarte}
                                quantidadeHoje={dtoListaDescarte?.ChavesDescartadasHoje}
                                quantidadeEsteMes={dtoListaDescarte?.ChavesDescartadasEsteMes}
                                quantidadeTotal={dtoListaDescarte?.ChavesDescartadasTotal}
                                valorHoje={null}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Pedidos de estoque feitos'}
                                icon={<FcFilingCabinet size={60} />}
                                arrayInformacoes={{dtoListaPedidoEstoque}}
                                hoje={dtoListaPedidoEstoque?.PedidosEstoqueBaixadosHoje}
                                esteMes={dtoListaPedidoEstoque?.PedidosEstoqueBaixadosEsteMes}
                                total={dtoListaPedidoEstoque?.PedidosEstoqueBaixadosTotal}
                            />
                        </Col>
                    </Row>
            }
        </div >
    );
}

export default EstatisticaChave;