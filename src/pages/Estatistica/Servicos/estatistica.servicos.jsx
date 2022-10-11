import React, { useEffect, useState } from 'react';

import { Row, Col } from 'antd';

import EstatisticaService from '../service/estatisticas.service';

import Loading from '../../../common/components/Loading/Loading';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import EstatisticaCard from '../../../common/components/EstatisticaCard/EstatisticaCard';

import { FcSupport } from "react-icons/fc";

const EstatisticaServicos = () => {

    const [dtoListaServicos, setDtoListaServicos] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        EstatisticaService.getServicos()
            .then((servico) => {
                setDtoListaServicos(servico);
                setLoading(false);
            })
    }, []);

    return (
        <div className="mt-2">
            <HeaderForm
                titulo={'Estatísticas Serviços'}
                listaCaminhos={['Estatísticas', 'Serviços']}
            />

            {
                loading ?
                    <Loading /> :
                    <Row gutter={10} style={{ margin: '10px' }}>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="mb-1">
                            <EstatisticaCard
                                title={'Serviços Realizados'}
                                icon={<FcSupport size={60} />}
                                arrayInformacoes={dtoListaServicos}
                                quantidadeHoje={dtoListaServicos?.ServicosFeitosHojeQuantidade}
                                quantidadeEsteMes={dtoListaServicos?.ServicosFeitosEsteMesQuantidade}
                                quantidadeTotal={dtoListaServicos?.ServicosFeitosTotalQuantidade}
                                valorHoje={dtoListaServicos?.ServicosFeitosHojeValor}
                                valorEsteMes={dtoListaServicos?.ServicosFeitosEsteMesValor}
                                valorTotal={dtoListaServicos?.ServicosFeitosTotalValor}
                            />
                        </Col>
                    </Row>
            }
        </div>
    );
}

export default EstatisticaServicos;