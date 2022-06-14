import React from 'react';
import { Card } from 'antd';
import { AiOutlineEye } from "react-icons/ai";

const EstatisticaCard = ({ title, icon, funcao1, funcao2, funcao3, hoje, esteMes, total }) => {
    return (
        <Card
            actions={
                [
                    <AiOutlineEye key="1" size={20} onClick={funcao1} />,
                    <AiOutlineEye key="2" size={20} onClick={funcao2} />,
                    <AiOutlineEye key="2" size={20} onClick={funcao3} />
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
    );
}

export default EstatisticaCard