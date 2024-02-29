import React, { useState } from 'react';
import { Row, Col } from 'antd';

import EstatisticaService from '../service/estatisticas.service';

import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import EstatisticaCard from '../../../common/components/EstatisticaCard/EstatisticaCard';
import Loading from '../../../common/components/Loading/Loading';

import Pliericon from '../assets/Plier-icon.png';
import Scizoricon from '../assets/Scizor-icon.png';
import Knifeicon from '../assets/Knife-icon.png';

const EstatisticaAmolacoes = () => {

    const [dtoListaProdutosAmolados, setDtoListaProdutosAmolados] = useState({});
    const [dtoListaAlicates, setDtoListaAlicates] = useState({});
    const [dtoListaTesouras, setDtoListaTesouras] = useState({});
    const [dtoListaFacas, setDtoListaFacas] = useState({});

    const [loading, setLoading] = useState(false);

    useState(() => {
        setLoading(true);

        function GetProdutosAmolados() {
            EstatisticaService.getProdutosAmolados()
                .then((produtosAmolados) => {

                    setDtoListaAlicates({ Vetor: produtosAmolados.VetorAlicates });
                    setDtoListaTesouras({ Vetor: produtosAmolados.VetorTesouras });
                    setDtoListaFacas({ Vetor: produtosAmolados.VetorFacas });

                    setDtoListaProdutosAmolados(produtosAmolados);
                    setLoading(false);
                });
        }

        GetProdutosAmolados();
    }, []);

    return (
        <div className="mt-2">
            <HeaderForm
                titulo={'Estatísticas Amolações'}
                listaCaminhos={['Estatísticas', 'Amolações']}
            />

            {
                loading ?
                    <Loading /> :
                    <Row gutter={10} style={{ margin: '10px' }}>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Alicates'}
                                icon={<img src={Pliericon} alt={'icon'} width={60} height={60} />}
                                arrayInformacoes={dtoListaAlicates}
                                quantidadeHoje={dtoListaProdutosAmolados?.AlicatesAmoladosHojeQuantidade}
                                quantidadeEsteMes={dtoListaProdutosAmolados?.AlicatesAmoladosEsteMesQuantidade}
                                quantidadeTotal={dtoListaProdutosAmolados?.AlicatesAmoladosTotalQuantidade}
                                valorHoje={dtoListaProdutosAmolados?.AlicatesAmoladosHojeValor}
                                valorEsteMes={dtoListaProdutosAmolados?.AlicatesAmoladosEsteMesValor}
                                valorTotal={dtoListaProdutosAmolados?.AlicatesAmoladosTotalValor}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Tesouras'}
                                icon={<img src={Scizoricon} alt={'icon'} width={60} height={60} />}
                                arrayInformacoes={dtoListaTesouras}
                                quantidadeHoje={dtoListaProdutosAmolados?.TesourasAmoladosHojeQuantidade}
                                quantidadeEsteMes={dtoListaProdutosAmolados?.TesourasAmoladosEsteMesQuantidade}
                                quantidadeTotal={dtoListaProdutosAmolados?.TesourasAmoladosTotalQuantidade}
                                valorHoje={dtoListaProdutosAmolados?.TesourasAmoladosHojeValor}
                                valorEsteMes={dtoListaProdutosAmolados?.TesourasAmoladosEsteMesValor}
                                valorTotal={dtoListaProdutosAmolados?.TesourasAmoladosTotalValor}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Facas'}
                                icon={<img src={Knifeicon} alt={'icon'} width={60} height={60} />}
                                arrayInformacoes={dtoListaFacas}
                                quantidadeHoje={dtoListaProdutosAmolados?.FacasAmoladosHojeQuantidade}
                                quantidadeEsteMes={dtoListaProdutosAmolados?.FacasAmoladosEsteMesQuantidade}
                                quantidadeTotal={dtoListaProdutosAmolados?.FacasAmoladosTotalQuantidade}
                                valorHoje={dtoListaProdutosAmolados?.FacasAmoladosHojeValor}
                                valorEsteMes={dtoListaProdutosAmolados?.FacasAmoladosEsteMesValor}
                                valorTotal={dtoListaProdutosAmolados?.FacasAmoladosTotalValor}
                            />
                        </Col>
                    </Row>
            }
        </div>
    );
}

export default EstatisticaAmolacoes;