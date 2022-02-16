import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { Row, Col } from 'antd'
import { withRouter } from 'react-router-dom';

const EstatisticaServicos = () => {
    const [dataInicio, setDataInicio] = useState();
    const [dataFim, setDataFim] = useState();

    return (
        <>
            <Row gutter={4}>

                <Col span={3}>
                    <DatePicker
                        format="DD/MM/YYYY"
                        onChange={(date, dateString) => setDataInicio(dateString)}
                        value={dataInicio}
                    />
                </Col>

                <Col span={3}>
                    <DatePicker
                        format="DD/MM/YYYY"
                        onChange={(date, dateString) => setDataFim(dateString)}
                        value={dataFim}
                    />
                </Col>
            </Row>
        </>
    );
}

export default withRouter(EstatisticaServicos);