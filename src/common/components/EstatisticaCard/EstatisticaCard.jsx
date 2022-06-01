import React from 'react';
import { Card, Avatar } from 'antd';
import { AiOutlineEye } from "react-icons/ai";

const EstatisticaCard = ({ title, icon, hoje, esteMes, total }) => {
    return (
        <Card className="EstatisticaCard" title={title} extra={<AiOutlineEye size={24} />}>
            <Card.Meta
                avatar={
                    <Avatar
                        icon={icon}
                        style={{ background: '#FFF' }}
                        size={60}
                    />
                }
                title={(
                    <>
                        <span>Hoje: <b>{hoje && hoje}</b></span><br />
                        <span>Este mês: <b>{esteMes}</b></span> <br />
                        <span>Total: <b>{total}</b></span><br />
                    </>
                )}
            />
        </Card>
    );
}

export default EstatisticaCard