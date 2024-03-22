import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { FcSearch, FcBarChart } from "react-icons/fc";

import EstatisticaDetalhesTipoPagamentoModal from '../../../pages/Estatistica/components/estatistica.detalhes.tipoPagamento.modal';
import EstatisticaDetalhesMotivoDescarteModal from '../../../pages/Estatistica/components/estatistica.detalhes.motivos.modal';
import EstatisticaDetalhesPedidoEstoqueModal from '../../../pages/Estatistica/components/estatistica.detalhes.pedidoestoque.modal';
import EstatisticasGraficoValoresModal from '../../../pages/Estatistica/components/estatisticas.graficoValor.modal';

const EstatisticaCard = ({
    title, icon, dominio, arrayInformacoes,
    quantidadeHoje, quantidadeEsteMes, quantidadeTotal,
    valorHoje, valorEsteMes, valorTotal,
}) => {

    const [estatisticaDetalhesTipoPagamentomodalVisible, setEstatisticaDetalhesTipoPagamentomodalVisible] = useState(false);
    const [estatisticaDetalhesMotivoDescarteVisible, setEstatisticaDetalhesMotivoDescarteVisible] = useState(false);
    const [estatisticaDetalhesPedidoEstoqueVisible, setEstatisticaDetalhesPedidoEstoqueVisible] = useState(false);
    
    const [graficoValoresModalVisible, setGraficoValoresModalVisible] = useState(false);

    const handleFuncaoModal = (funcionalidade) => {
        switch (funcionalidade) {
            case 'busca':

                if (dominio === 'copia' || dominio === 'alicate' || dominio === 'tesoura' || dominio === 'faca') {
                    setEstatisticaDetalhesTipoPagamentomodalVisible(true);
                    return;
                }

                if (dominio === 'descarte') {
                    setEstatisticaDetalhesMotivoDescarteVisible(true);
                    return;
                }

                if (dominio === 'pedidoestoque') {
                    setEstatisticaDetalhesPedidoEstoqueVisible(true);
                    return;
                }

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
                                onClick={() => alert('função indisponivel no momento, contactar o desenvolvedor')}
                            />
                        </Tooltip>
                    ]
                }
                style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }}
            >
                <Card.Meta
                    avatar={icon}
                    title={title}
                    description={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h6>
                                <small>Quantidade</small> <br />
                                Hoje: <b>{quantidadeHoje}</b> <br />
                                Este mês: <b>{quantidadeEsteMes}</b> <br />
                                Total geral: <b>{quantidadeTotal}</b>
                            </h6>
                            {
                                valorHoje !== null ?
                                    <h6>
                                        <small>Valores</small> <br />
                                        Hoje: <b>{valorHoje?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </b> <br />
                                        Este mês: <b>{valorEsteMes?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </b> <br />
                                        Total: <b>{valorTotal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </b> <br />
                                    </h6>
                                    :
                                    <></>
                            }

                        </div>
                    }
                />
            </Card>


            <EstatisticaDetalhesTipoPagamentoModal
                visible={estatisticaDetalhesTipoPagamentomodalVisible}
                onClose={() => setEstatisticaDetalhesTipoPagamentomodalVisible(false)}
                arrayInformacoes={arrayInformacoes}
                dominio={dominio}
            />

            <EstatisticaDetalhesMotivoDescarteModal
                visible={estatisticaDetalhesMotivoDescarteVisible}
                onClose={() => setEstatisticaDetalhesMotivoDescarteVisible(false)}
                arrayInformacoes={arrayInformacoes}
                dominio={dominio}
            />

            <EstatisticaDetalhesPedidoEstoqueModal
                visible={estatisticaDetalhesPedidoEstoqueVisible}
                onClose={() => setEstatisticaDetalhesPedidoEstoqueVisible(false)}
                arrayInformacoes={arrayInformacoes}
                dominio={dominio}
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