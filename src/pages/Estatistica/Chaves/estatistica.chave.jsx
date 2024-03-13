import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import EstatisticaService from '../../../services/estatisticas.service';

import Loading from '../../../common/components/Loading/Loading';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import EstatisticaCard from '../../../common/components/EstatisticaCard/EstatisticaCard';

import { FcReuse, FcFilingCabinet } from "react-icons/fc";
import keyIcon from '../assets/Key-icon.png';

const EstatisticaChave = () => {
    const [dtoListaCopia, setDtoListaCopia] = useState({});
    const [dtoListaDescarte, setDtoListaDescarte] = useState([]);
    const [dtoListaPedidoEstoque, setDtoListaPedidoEstoque] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const GetEstatisticasCopias = async () => {
            await EstatisticaService.getEstatisticaCopias()
                .then((dtoListCopia) => { setDtoListaCopia(dtoListCopia); })
        }

        const GetEstatisticasDescartes = async () => {
            await EstatisticaService.getEstatisticaDescartes()
                .then((dtoListaDescartes) => { setDtoListaDescarte(dtoListaDescartes); })
        }

        const GetEstatisticasPedidoEstoque = async () => {
            await EstatisticaService.getEstatisticasPedidoEstoque()
                .then((dtoPedidoEstoque) => { setDtoListaPedidoEstoque(dtoPedidoEstoque); })
        }

        const GetEstatisicasChaves = async () => {
            await GetEstatisticasCopias();
            await GetEstatisticasDescartes();
            await GetEstatisticasPedidoEstoque();
        }

        GetEstatisicasChaves()
            .then(() => { setLoading(false); });
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
                                dominio={'copia'}
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
                                icon={<FcReuse size={60} />}
                                dominio={'descarte'}
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
                                dominio={'pedidoestoque'}
                                arrayInformacoes={dtoListaPedidoEstoque}
                                quantidadeHoje={dtoListaPedidoEstoque?.PedidosEstoqueFeitosHoje}
                                quantidadeEsteMes={dtoListaPedidoEstoque?.PedidosEstoqueFeitosEsteMes}
                                quantidadeTotal={dtoListaPedidoEstoque?.PedidosEstoqueFeitosTotal}
                                valorHoje={null}
                            />
                        </Col>

                    </Row>
            }
        </div >
    );
}

export default EstatisticaChave;