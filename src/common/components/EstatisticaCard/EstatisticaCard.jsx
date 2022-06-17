import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { FcSearch, FcList, FcLike } from "react-icons/fc";

import EstatisticasDetalhesModal from '../../../pages/Estatistica/components/estatisticas.detalhes.modal';

const EstatisticaCard = ({ title, icon, arrayInformacoes, hoje, esteMes, total }) => {
    const [detalhesModalVisible, setDetalhesModalVisible] = useState(false);

    const handleFuncaoModal = (funcionalidade) => {
        switch (funcionalidade) {
            case 'busca':
                setDetalhesModalVisible(true);
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
                        <Tooltip title={'Lista de valores'}>
                            <FcList
                                key="2"
                                size={20}/>
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
                        <>
                            Hoje: <b>{hoje}</b> <br />
                            Este mês: <b>{esteMes}</b> <br />
                            Total: <b>{total}</b>
                        </>
                    }
                />
            </Card>
            <EstatisticasDetalhesModal
                visible={detalhesModalVisible}
                onClose={() => setDetalhesModalVisible(false)}
                arrayInformacoes={arrayInformacoes}
            />
        </>
    );
}

export default EstatisticaCard