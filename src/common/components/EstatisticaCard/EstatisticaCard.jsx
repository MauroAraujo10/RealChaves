import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { FcSearch, FcBarChart, FcLike } from "react-icons/fc";

import EstatisticasDetalhesModal from '../../../pages/Estatistica/components/estatisticas.detalhes.modal';
import EstatisticasGraficoValoresModal from '../../../pages/Estatistica/components/estatisticas.graficoValor.modal';

const EstatisticaCard = ({ 
    title, icon, arrayInformacoes, 
    quantidadeHoje, quantidadeEsteMes, quantidadeTotal,
    valorHoje, valorEsteMes, valorTotal, 
 }) => {

    const [detalhesModalVisible, setDetalhesModalVisible] = useState(false);
    const [graficoValoresModalVisible, setGraficoValoresModalVisible] = useState(false);

    const handleFuncaoModal = (funcionalidade) => {
        switch (funcionalidade) {
            case 'busca':
                setDetalhesModalVisible(true);
                break;
            case 'graficoValores':
                setGraficoValoresModalVisible(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Card
                actions={
                    [
                        <Tooltip title={'Busca detalhada'}>
                            <FcSearch
                                key="1"
                                size={20}
                                onClick={() => handleFuncaoModal('busca')}
                            />
                        </Tooltip>,
                        <Tooltip title={'Gráfico de Valores'}>
                            <FcBarChart
                                key="2"
                                size={20}
                                onClick={() => handleFuncaoModal('graficoValores')}
                            />
                        </Tooltip>,
                        <Tooltip>
                            <FcLike
                                key="3"
                                size={20} />
                        </Tooltip>
                    ]
                }
                style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }}
            >
                <Card.Meta
                    avatar={icon}
                    title={title}
                    description={
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <h6>
                                    <small>Quantidade</small> <br/>
                                    Hoje: <b>{quantidadeHoje}</b> <br />
                                    Este mês: <b>{quantidadeEsteMes}</b> <br />
                                    Total geral: <b>{quantidadeTotal}</b>
                                </h6>
                                {
                                    valorHoje !== null ?
                                     <h6>
                                         <small>Valores</small> <br/>
                                         Hoje: <b>{valorHoje?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </b> <br/>
                                         Este mês: <b>{valorEsteMes?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </b> <br/>
                                         Total: <b>{valorTotal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </b> <br/>
                                     </h6>
                                     :
                                     <></>
                                }

                            </div>
                    }
                />
            </Card>
            <EstatisticasDetalhesModal
                visible={detalhesModalVisible}
                onClose={() => setDetalhesModalVisible(false)}
                arrayInformacoes={arrayInformacoes}
            />

            <EstatisticasGraficoValoresModal
                visible={graficoValoresModalVisible}
                onClose={() => setGraficoValoresModalVisible(false)}
                arrayInformacoes={arrayInformacoes}
                hasValue={valorHoje ? true : false}
            />
        </>
    );
}

export default EstatisticaCard